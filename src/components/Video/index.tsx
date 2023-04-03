/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { AiOutlineAudioMuted, AiTwotoneAudio } from 'react-icons/ai';
import { BsCameraVideoFill, BsCameraVideoOffFill } from 'react-icons/bs';
import { io, Socket } from 'socket.io-client';

interface VideoProps {
  roomName?: string[] | string;
}

function Video({ roomName }: VideoProps) {
  const socketRef = useRef<Socket>();
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection>();
  const [isWebcamOpen, setWebcamOpen] = useState<boolean>(true);
  const [isMuted, setMuted] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(stream);

      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }
      if (!(pcRef.current && socketRef.current)) return;

      stream.getTracks().forEach((track) => {
        if (!pcRef.current) return;

        pcRef.current.addTrack(track, stream);
      });

      pcRef.current.onicecandidate = (e) => {
        if (e.candidate) {
          if (!socketRef.current) return;

          console.log('recv candidate');
          socketRef.current.emit('candidate', e.candidate, roomName);
        }
      };

      pcRef.current.ontrack = (e) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = e.streams[0];
        }
      };
    } catch (e) {
      console.error(e);
    }
  };

  const createOffer = async () => {
    console.log('create Offer');
    if (!(pcRef.current && socketRef.current && isWebcamOpen)) return;

    try {
      const sdp = await pcRef.current.createOffer();
      pcRef.current.setLocalDescription(sdp);
      console.log('sent the offer');
      socketRef.current.emit('offer', sdp, roomName);
    } catch (e) {
      console.error(e);
    }
  };

  const createAnswer = async (sdp: RTCSessionDescription) => {
    console.log('createAnswer');
    if (!(pcRef.current && socketRef.current && isWebcamOpen)) {
      return;
    }

    try {
      pcRef.current.setRemoteDescription(sdp);
      const answerSdp = await pcRef.current.createAnswer();
      pcRef.current.setLocalDescription(answerSdp);

      console.log('sent the answer');
      socketRef.current.emit('answer', answerSdp, roomName);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    socketRef.current = io(process.env.LOCAL_BASE_URL as string);

    pcRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    });

    socketRef.current.on('all_users', (allUsers: Array<{ id: string }>) => {
      if (allUsers.length > 0) {
        createOffer();
      }
    });

    socketRef.current.on('getOffer', (sdp: RTCSessionDescription) => {
      if (!pcRef.current) return;
      console.log('recv Offer');
      createAnswer(sdp);
    });

    socketRef.current.on('getAnswer', (sdp: RTCSessionDescription) => {
      console.log('recv Answer');
      if (!pcRef.current) return;

      pcRef.current.setRemoteDescription(sdp);
    });

    socketRef.current.on('getCandidate', async (candidate: RTCIceCandidate) => {
      if (!pcRef.current) return;

      await pcRef.current.addIceCandidate(candidate);
    });

    socketRef.current.emit('join_room', {
      room: roomName,
    });

    getMedia();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (pcRef.current) {
        pcRef.current.close();
      }
    };
  }, [roomName, isWebcamOpen]);

  const handleClick = () => {
    setWebcamOpen(!isWebcamOpen);

    if (!isWebcamOpen || !myVideoRef.current) return;
    myVideoRef.current.pause();
    stream?.getVideoTracks()[0].stop();

    // const tracks = stream?.getTracks();
    // tracks?.forEach((track) => track.stop());
    // setStream(null);
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="mr-10 flex flex-col justify-center">
        {isWebcamOpen ? (
          <video
            id="myVideo"
            className="h-36 w-48 bg-black"
            ref={myVideoRef}
            muted={isMuted}
            autoPlay
          />
        ) : (
          <div className="h-36 w-48 bg-black"></div>
        )}
        <div className="flex flex-row justify-evenly bg-black/10 py-2">
          <button
            className={`flex h-8 w-8 items-center justify-center rounded-3xl ${
              isWebcamOpen ? 'bg-gray-700' : 'bg-red-500'
            } text-white`}
            onClick={handleClick}
          >
            {isWebcamOpen ? <BsCameraVideoFill /> : <BsCameraVideoOffFill />}
          </button>
          <button
            className={`flex h-8 w-8 items-center justify-center rounded-3xl ${
              isMuted ? 'bg-red-500' : 'bg-gray-700'
            } text-white`}
            onClick={() => setMuted(!isMuted)}
          >
            {isMuted ? <AiOutlineAudioMuted /> : <AiTwotoneAudio />}
          </button>
        </div>
      </div>
      <video
        id="remotevideo"
        className="h-36 w-48 bg-black"
        ref={remoteVideoRef}
        autoPlay
      />
    </div>
  );
}

export default Video;
