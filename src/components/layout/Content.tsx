import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { queryClient } from '@/lib/api/queryClient';
import useDebounce from '@/lib/hooks/useDebounce';
import usePageMutation from '@/lib/hooks/usePageMutation';
import { pageState } from '@/lib/recoil';

import ContentHeader from './ContentHeader';

import { PageType } from '@/types';

interface ContentProp {
  page: PageType | undefined;
}

function Content({ page }: ContentProp) {
  const [newPage, setNewPage] = useRecoilState(pageState);
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const debouncedTitle = useDebounce({ value: title, delay: 500 });
  const debouncedDesc = useDebounce({ value: desc, delay: 500 });
  const { addPage } = usePageMutation();
  const router = useRouter();

  useEffect(() => {
    setNewPage({
      ...newPage,
      creator: 'd@gmail.com',
      title: debouncedTitle,
      desc: debouncedDesc,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedTitle, debouncedDesc]);

  const { mutate: addPageMutate } = addPage;

  const handleAddPage = () => {
    if (!title) {
      alert('제목을 입력해주세요');
      return;
    }

    addPageMutate(newPage, {
      onSuccess: (_id) => {
        queryClient.invalidateQueries('pages');
        router.push(`page/${_id}`, undefined, { shallow: true });
      },
      onError: (error, variable, context) => {
        console.log(error);
      },
    });
  };

  return (
    <>
      <ContentHeader />
      <div className="flex flex-col items-center p-4 sm:ml-64">
        <textarea
          id="message"
          className="textarea border:none mb-5 text-4xl  font-bold placeholder:text-4xl placeholder:text-gray-300"
          placeholder="제목 없음"
          onChange={(e) => setTitle(e.target.value)}
          value={page?.title}
        />

        <textarea
          id="message"
          className="textarea placeholder:text-m placeholder:text-gray-400"
          placeholder="'/'를 입력해 명령어를 사용하세요"
          onChange={(e) => setDesc(e.target.value)}
          value={page?.desc}
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
}

export default Content;
