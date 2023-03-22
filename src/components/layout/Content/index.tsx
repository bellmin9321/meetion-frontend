/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { queryClient } from '@/lib/api/queryClient';
import useDebounce from '@/lib/hooks/useDebounce';
import usePageMutation from '@/lib/hooks/usePageMutation';
import { newPageState, pageListState, userState } from '@/lib/recoil';
import socket from '@/lib/util/socket';

import ContentHeader from './ContentHeader';

import { PageType } from '@/types';
import { queryKeys } from '@/types/commonType';

interface ContentProp {
  page?: PageType;
  sharedPage?: PageType;
}

function Content({ page, sharedPage }: ContentProp) {
  const [newPage, setNewPage] = useRecoilState(newPageState);

  const setPages = useSetRecoilState(pageListState);
  const { email } = useRecoilValue(userState);
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string | undefined>('');
  const debouncedTitle = useDebounce({ value: title, delay: 500 });
  const debouncedDesc = useDebounce({ value: desc, delay: 500 });
  const { addPage } = usePageMutation();
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const updatedPage = {
    ...page,
    title,
    desc,
  };

  // Sidebar Page 선택 시 default title, desc 설정
  useEffect(() => {
    if (page) {
      setTitle(page.title);
      setDesc(page.desc);

      if (page.title === '' && inputRef.current) {
        inputRef.current.focus();
      }
    } else if (sharedPage) {
      setTitle(sharedPage.title);
      setDesc(sharedPage.desc);
    }
  }, [page]);

  useEffect(() => {
    setNewPage({
      ...newPage,
      creator: email,
      title: debouncedTitle,
      desc: debouncedDesc,
    });
  }, [debouncedTitle, debouncedDesc]);

  useEffect(() => {
    if (socket === null) return;

    socket.emit('get-page', updatedPage);
    socket.on('edit-page', ({ pages }) => {
      pages.length && setPages(pages);
    });
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
          router.push(`/page/${data._id}`);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <>
      <ContentHeader title={title} />
      <div className="flex h-screen flex-col items-center sm:ml-64">
        <div className="flex h-1/3 w-full items-end justify-center ">
          <input
            id="message"
            className="contentInput border:none text-4xl font-bold placeholder:text-4xl placeholder:text-gray-300"
            placeholder="제목 없음"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            ref={inputRef}
          />
        </div>
        <div className="flex h-2/3 w-full flex-col items-center">
          <input
            id="message"
            className="contentInput placeholder:text-m justify-center placeholder:text-gray-400"
            placeholder="'/'를 입력해 명령어를 사용하세요"
            onChange={(e) => setDesc(e.target.value)}
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
    </>
  );
}

export default Content;
