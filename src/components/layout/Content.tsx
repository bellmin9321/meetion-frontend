import React, { useState } from 'react';

import Header from './Header';

const Content = () => {
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');

  return (
    <>
      <Header />
      <div className="p-4 sm:ml-64">
        <textarea
          id="message"
          className="textarea text-3lg mb-5"
          placeholder="제목 없음"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          id="message"
          className="textarea text-sm"
          placeholder="'/'를 입력해 명령어를 사용하세요"
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
    </>
  );
};

export default Content;
