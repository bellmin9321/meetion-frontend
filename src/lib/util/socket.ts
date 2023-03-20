import io from 'socket.io-client';

const socket = io(process.env.LOCAL_BASE_URL as string);

export default socket;
