/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { io, Socket } from 'socket.io-client';

import { queryClient } from '@/lib/api/queryClient';
import useDebounce from '@/lib/hooks/useDebounce';
import usePageMutation from '@/lib/hooks/usePageMutation';
import {
  newPageState,
  pageListState,
  sharedPagesState,
  shareModalState,
  userState,
} from '@/lib/recoil';

import Modal from '@/components/Modal';
import ShareModal from '@/components/Modal/ShareModal';
import Video from '@/components/Video';

import ContentHeader from './ContentHeader';

import { PageType } from '@/types';
import { queryKeys } from '@/types/commonType';

interface ContentProp {
  page?: PageType;
  sharedPage?: PageType;
}

// interface GuestType {
//   image?: string;
//   email?: string;
//   posY: string;
// }

function Content({ page, sharedPage }: ContentProp) {
  const [newPage, setNewPage] = useRecoilState(newPageState);
  const [pages, setPages] = useRecoilState(pageListState);
  const [sharedPages, setSharedPages] = useRecoilState(sharedPagesState);
  const { email, image } = useRecoilValue(userState);
  const isModal = useRecoilValue(shareModalState);

  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string | undefined>('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [profile, setProfile] = useState<string>('');
  const [profileEmail, setProfileEmail] = useState<string>('');
  const [y, setY] = useState<string>('');

  const debouncedTitle = useDebounce({ value: title, delay: 500 });
  const debouncedDesc = useDebounce({ value: desc, delay: 500 });
  const { addPage } = usePageMutation();
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const updatedPage = {
    ...page,
    creator: email,
    title,
    desc,
  };

  const updatedSharedPage = {
    ...sharedPage,
    title,
    desc,
  };

  // client 단에서 즉시 title, desc 변경을 위함
  useEffect(() => {
    if (sharedPage) {
      const targetIndex = sharedPages.findIndex(
        (v) => v._id === sharedPage?._id,
      );
      const newPages = [...sharedPages];
      newPages.splice(targetIndex, 1, updatedSharedPage);
      setSharedPages(newPages);
    } else if (page && page.creator && email) {
      const targetIndex = pages.findIndex((v) => v._id === page?._id);
      const newPages = [...pages];
      newPages.splice(targetIndex, 1, updatedPage);
      setPages(newPages);
    }
  }, [title, desc]);

  // Sidebar Page 선택 시 default title, desc 설정
  useEffect(() => {
    if (sharedPage) {
      setTitle(sharedPage.title);
      setDesc(sharedPage.desc);
    } else if (page && page.creator && email) {
      setTitle(page.title);
      setDesc(page.desc);

      if (page.title === '' && inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [page, sharedPage]);

  useEffect(() => {
    setNewPage({
      ...newPage,
      creator: email,
      title: debouncedTitle,
      desc: debouncedDesc,
    });
  }, [debouncedTitle, debouncedDesc]);

  useEffect(() => {
    setSocket(io(process.env.LOCAL_BASE_URL as string, { secure: true }));

    return () => {
      socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket === null) return;

    socket.emit('get-page', updatedPage);
    socket.on('edit-page', ({ pages }) => {
      const notSharedPages = pages.filter(
        (page: PageType) => page.sharedUsers && !page.sharedUsers.length,
      );
      setPages(notSharedPages);
    });

    // 공유된 페이지만 텍스트를 공유하도록 조건 추가
    if (sharedPage) {
      socket.emit('shared-page', updatedSharedPage);
      socket.on('receive-changes', ({ _id, title, desc }) => {
        if (sharedPage?._id === _id) {
          title && setTitle(title);
          desc && setDesc(desc);
        }
      });
    }

    return () => {
      socket.off('edit-page');
      socket.off('receive-changes');
    };
  }, [debouncedTitle, debouncedDesc]);

  const { mutate: addPageMutate } = addPage;

  const handleAddPage = () => {
    if (!title) {
      alert('제목을 입력해주세요');
      return;
    }

    addPageMutate(newPage, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(queryKeys.pages);
        if (data) {
          router.push(`/page/${data._id}`, undefined, { shallow: true });
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, input: string) => {
    if (input === 'title') setTitle(e.target.value);
    else setDesc(e.target.value);
  };

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLInputElement;
    const { top, height } = document
      .getElementById(target?.id)
      ?.getBoundingClientRect() as DOMRect;

    if (socket === null || !sharedPage) return;

    const guestInfo = {
      id: sharedPage._id,
      image,
      email,
      posY: `${top - height / 2 + 50}px`,
    };

    socket.emit('get-position', guestInfo);
    socket.on('pos-changes', (guest) => {
      if (sharedPage._id !== guest.id) return;

      setY(guest.posY);
      setProfile(guest.image);
      setProfileEmail(guest.email);
      console.log(`my: ${email}, your: ${guest.email}`);
    });

    return () => {
      socket.off('pos-changes');
    };
  };

  return (
    <>
      <ContentHeader title={title} />
      <div className="flex h-screen flex-col items-center sm:ml-64">
        <div className="mt-20 mb-10">
          {sharedPage && <Video roomName={router.query.pid} />}
        </div>
        {/* 본인 계정은 프로필이 보이면 안됨 */}
        {sharedPage && profile && email !== profileEmail && (
          <img
            src={profile}
            alt="profile"
            width={20}
            height={20}
            style={{
              position: 'absolute',
              borderRadius: 10,
              top: y,
              left: 300,
              transition: 'all ease 300ms',
            }}
          />
        )}
        <div className="flex w-full items-end justify-center ">
          <input
            id="title"
            className="contentInput border:none text-4xl font-bold placeholder:text-4xl placeholder:text-gray-300"
            placeholder="제목 없음"
            onChange={(e) => handleChange(e, 'title')}
            onClick={handleClick}
            value={title}
            ref={inputRef}
          />
        </div>
        <div className="flex h-2/3 w-full flex-col items-center">
          <input
            id="desc"
            className="contentInput placeholder:text-m justify-center placeholder:text-gray-400"
            placeholder="'/'를 입력해 명령어를 사용하세요"
            onChange={(e) => handleChange(e, 'desc')}
            onClick={handleClick}
            value={desc}
          />
          <div className="mt-10 w-2/3">
            {!page && !sharedPage && (
              <button
                className="mr-5 rounded bg-blue-500 px-3 py-2 text-white"
                onClick={handleAddPage}
              >
                생성
              </button>
            )}
          </div>
        </div>
      </div>
      {isModal && <Modal component={<ShareModal />} />}
    </>
  );
}

export default Content;
