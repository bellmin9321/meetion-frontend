import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { queryClient } from '@/lib/api/queryClient';
import useEmailMutation from '@/lib/hooks/useEmailMutation';
import {
  invitedEmails,
  selectPage,
  sharedPagesState,
  userState,
} from '@/lib/recoil';

import { queryKeys } from '@/types/commonType';

function ShareModal() {
  const user = useRecoilValue(userState);
  const [email, setEmail] = useState<string>('');
  sharedPagesState;
  const selectedPage = useRecoilValue(selectPage);
  const { _id, title, sharedUsers } = selectedPage;
  const [invitedUsers, setInvitedUsers] = useRecoilState(invitedEmails);
  const { sendEmail, removeEmail } = useEmailMutation();

  const { mutate: sendEmailMutate } = sendEmail;
  const { mutate: removeEmailMutate } = removeEmail;

  useEffect(() => {
    setInvitedUsers(sharedUsers);
  }, [sharedUsers]);

  const inviteEmail = async () => {
    if (user.email === email) {
      alert('본인 계정은 초대할 수 없습니다');
      return;
    }

    if (sharedUsers && sharedUsers.length > 3) {
      alert('최대 4명까지 초대 가능합니다.');
      return;
    }

    sendEmailMutate(
      { email, _id },
      {
        onSuccess: (data) => {
          if (!data) return;

          queryClient.invalidateQueries(queryKeys.pages);
          setInvitedUsers([...(invitedUsers ?? []), email]);
          setEmail('');
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const deleteEmail = async (email: string, index: number) => {
    if (!_id) return;

    removeEmailMutate(
      { _id, email },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(queryKeys.pages);
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );

    const newInvitedUsers = invitedUsers && [...invitedUsers];
    newInvitedUsers?.splice(index, 1);

    setInvitedUsers(newInvitedUsers);
  };

  return (
    <div className="absolute right-0 top-10 z-10 w-[400px] rounded border-[1px] bg-white shadow-md shadow-gray-500/50">
      <div className="mx-3 my-2">
        <span className="mr-3">공유</span>
        <span className="font-bold">{title}</span>
      </div>
      <div className="flex items-center justify-center ">
        <input
          className="mr-2 w-[80%] rounded border-[1px] border-gray-300 bg-gray-100 py-1 pl-2 placeholder-slate-400"
          placeholder="이메일 추가"
          value={email}
          onChange={handleChange}
        />
        <button
          className="rounded bg-blue-500 py-1 px-2 text-white"
          onClick={inviteEmail}
        >
          초대
        </button>
      </div>
      <div className="mx-3 my-3">
        {invitedUsers && invitedUsers.length > 0 && (
          <div className="mb-2 text-sm text-black/60">초대된 이메일</div>
        )}
        {invitedUsers &&
          invitedUsers.map((guest, i) => {
            return (
              <div key={i} className="mb-3 flex items-center justify-between">
                <div className="flex flex-row">
                  <img
                    src={user.image}
                    width={30}
                    height={30}
                    style={{ borderRadius: 20, marginRight: 10 }}
                    alt="profile"
                  />
                  <span className="flex items-center text-gray-500">
                    {guest}
                  </span>
                </div>
                <button
                  className="mr-3 p-1 text-sm text-black/50 hover:opacity-50"
                  onClick={() => deleteEmail(guest, i)}
                >
                  삭제
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ShareModal;
