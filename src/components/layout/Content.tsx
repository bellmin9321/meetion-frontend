import React from 'react';

import Header from './Header';

const Content = () => {
  return (
    <>
      <Header />
      <div className="p-4 sm:ml-64">
        <textarea
          id="message"
          className="text-3lg mb-5 block w-4/5 border-none bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="제목 없음"
        />

        <textarea
          id="message"
          className="block w-4/5 border-none bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="'/'를 입력해 명령어를 사용하세요"
        />
      </div>
    </>
  );
};

export default Content;
