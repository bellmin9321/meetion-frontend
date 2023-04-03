import { useRouter } from 'next/router';
import React from 'react';
import { BiPlus } from 'react-icons/bi';
import { useRecoilValue } from 'recoil';

import { queryClient } from '@/lib/api/queryClient';
import usePageMutation from '@/lib/hooks/usePageMutation';
import { userState } from '@/lib/recoil';

import { queryKeys } from '@/types/commonType';

function NewPageButton() {
  const { email } = useRecoilValue(userState);
  const { addPage } = usePageMutation();
  const { mutate: addPageMutate } = addPage;
  const router = useRouter();

  const page = {
    creator: email,
    title: '',
    desc: '',
    sharedUsers: [],
  };

  const createNewPage = () => {
    addPageMutate(page, {
      onSuccess: (data) => {
        if (data) {
          queryClient.invalidateQueries(queryKeys.pages);
          router.push(`/page/${data._id}`);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div
      className="fixed bottom-0 flex w-full cursor-pointer border-t-[1px] py-4 hover:bg-gray-200"
      onClick={createNewPage}
    >
      <span className="ml-4">
        <BiPlus className="mr-3 h-6 w-6 text-gray-500" />
      </span>
      <span className="text-gray-500">새 페이지</span>
    </div>
  );
}

export default NewPageButton;
