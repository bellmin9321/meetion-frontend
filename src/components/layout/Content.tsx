import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import useAddPageMutation from '@/hooks/useAddPageMutation';
import useDebounce from '@/hooks/useDebounce';

import { queryClient } from '@/api/queryClient';
import { pageState } from '@/recoil';

import Header from './Header';

const Content = () => {
  const [page, setPage] = useRecoilState(pageState);
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const debouncedTitle = useDebounce({ value: title, delay: 500 });
  const debouncedDesc = useDebounce({ value: desc, delay: 500 });

  useEffect(() => {
    setPage({
      ...page,
      creator: 'd@gmail.com',
      title: debouncedTitle,
      desc: debouncedDesc,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTitle, debouncedDesc]);

  const { mutate: addPageMutate } = useAddPageMutation();

  const handleAddPage = () => {
    if (!title) {
      alert('제목을 입력해주세요');
      return;
    }

    addPageMutate(page, {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries('pages');
      },
      onError: (error, variable, context) => {
        console.log(error);
      },
    });
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center p-4 sm:ml-64">
        <textarea
          id="message"
          className="textarea border:none mb-5 text-4xl  font-bold placeholder:text-4xl placeholder:text-gray-300"
          placeholder="제목 없음"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          id="message"
          className="textarea placeholder:text-m placeholder:text-gray-400"
          placeholder="'/'를 입력해 명령어를 사용하세요"
          onChange={(e) => setDesc(e.target.value)}
        />
        <button
          className="rounded bg-blue-500 px-3 py-2 text-white"
          onClick={handleAddPage}
        >
          생성
        </button>
      </div>
    </>
  );
};

export default Content;
