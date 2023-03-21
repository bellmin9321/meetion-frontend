/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
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
}

function Content({ page }: ContentProp) {
  const [newPage, setNewPage] = useRecoilState(newPageState);

  const setPages = useSetRecoilState(pageListState);
  const { email } = useRecoilValue(userState);
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string | undefined>('');
  const debouncedTitle = useDebounce({ value: title, delay: 500 });
  const debouncedDesc = useDebounce({ value: desc, delay: 500 });
  const { addPage } = usePageMutation();
  const router = useRouter();

  const updatedPage = {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ...page!,
    title,
    desc,
  };

  useEffect(() => {
    if (page) {
      setTitle(page.title);
      setDesc(page.desc);
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
    socket.on('save-page', ({ pages }) => {
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
      <ContentHeader />
      <div className="flex flex-col items-center p-4 sm:ml-64">
        <input
          id="message"
          className="textarea border:none mb-5 text-4xl  font-bold placeholder:text-4xl placeholder:text-gray-300"
          placeholder="제목 없음"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          id="message"
          className="textarea placeholder:text-m placeholder:text-gray-400"
          placeholder="'/'를 입력해 명령어를 사용하세요"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
        <div className="mt-10 w-2/3">
          {!page && (
            <button
              className="mr-5 rounded bg-blue-500 px-3 py-2 text-white"
              onClick={handleAddPage}
            >
              생성
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Content;
