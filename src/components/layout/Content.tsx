import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { queryClient } from '@/lib/api/queryClient';
import useDebounce from '@/lib/hooks/useDebounce';
import usePageMutation from '@/lib/hooks/usePageMutation';
import { pageState } from '@/lib/recoil';
import { changeParam } from '@/lib/service';

import ContentHeader from './ContentHeader';

import { PageType } from '@/types';

interface ContentProp {
  page?: PageType;
}

function Content({ page }: ContentProp) {
  const [newPage, setNewPage] = useRecoilState(pageState);
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const debouncedTitle = useDebounce({ value: title, delay: 500 });
  const debouncedDesc = useDebounce({ value: desc, delay: 500 });
  const { addPage, editPage } = usePageMutation();
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
  const { mutate: editPageMutate } = editPage;

  const handleAddPage = () => {
    if (!title) {
      alert('제목을 입력해주세요');
      return;
    }

    addPageMutate(newPage, {
      onSuccess: () => {
        queryClient.invalidateQueries('pages');
        router.push(`/`);
        setTitle('');
        setDesc('');
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const handleEditPage = () => {
    if (!title && !page?.title) {
      alert('제목을 입력해주세요');
      return;
    }

    if (page?.title === title && page?.desc === desc) {
      alert('수정된 글자가 없습니다.');
    }

    const updatedPage = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ...page!,
      title: debouncedTitle,
      desc: debouncedDesc,
    };

    editPageMutate(updatedPage, {
      onSuccess: () => {
        router.push(
          `/page/${changeParam(updatedPage.title)}${updatedPage._id}`,
        );
        queryClient.invalidateQueries('pages');
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
        <textarea
          id="message"
          className="textarea border:none mb-5 text-4xl  font-bold placeholder:text-4xl placeholder:text-gray-300"
          placeholder="제목 없음"
          onChange={(e) => setTitle(e.target.value)}
          defaultValue={page?.title}
          // value={title}
        />
        <textarea
          id="message"
          className="textarea placeholder:text-m placeholder:text-gray-400"
          placeholder="'/'를 입력해 명령어를 사용하세요"
          onChange={(e) => setDesc(e.target.value)}
          defaultValue={page?.desc}
          // value={desc}
        />
        <div className="mt-10 w-2/3">
          {page ? (
            <button
              className="rounded bg-green-500 px-3 py-2 text-white"
              onClick={handleEditPage}
            >
              수정
            </button>
          ) : (
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
