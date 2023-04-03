import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { sendSharedEmail } from '@/lib/api/page';
import { selectPage, shareModalState, userState } from '@/lib/recoil';

function ShareModal() {
  const setModal = useSetRecoilState(shareModalState);
  const user = useRecoilValue(userState);
  const [email, setEmail] = useState<string>('');
  const { _id, title, sharedUsers } = useRecoilValue(selectPage);

  const inviteEmail = async () => {
    if (user.email === email) {
      alert('본인 계정은 초대할 수 없습니다');
      return;
    }

    const result = await sendSharedEmail({ email, _id });

    result ? setModal(false) : null;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const deleteInvitedEmail = (email: string) => {
    console.log('delete email!!!', email);
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
        {sharedUsers && sharedUsers.length > 0 && (
          <div className="mb-2 text-sm text-black/60">초대된 이메일</div>
        )}
        {sharedUsers &&
          sharedUsers.map((guest, i) => {
            return (
              <div key={i} className="mb-3 flex items-center justify-between">
                <div className="flex flex-row">
                  <Image
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
                  onClick={() => deleteInvitedEmail(guest)}
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
