import axios from 'axios';

import { PageType } from '@/types';

export const getPageList = async (email: string) => {
  try {
    const { data } = await axios.get(process.env.LOCAL_BASE_URL + 'myPage', {
      params: { email },
    });

    return data.pages;
  } catch (err) {
    console.log(err);
  }
};

export const getSharedPages = async (email: string) => {
  try {
    const { data } = await axios.get(
      process.env.LOCAL_BASE_URL + 'myPage/shared',
      {
        params: { email },
      },
    );

    return data.sharedPages;
  } catch (err) {
    console.log(err);
  }
};

export const createNewPage = async (body: PageType) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    const { data } = await axios.post<PageType>(
      process.env.LOCAL_BASE_URL + 'myPage',
      body,
      { headers },
    );

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const patchPage = async (body: PageType) => {
  try {
    const { data } = await axios.patch(
      process.env.LOCAL_BASE_URL + 'myPage',
      body,
    );

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deletePage = async (id: string) => {
  try {
    const { data } = await axios.delete<PageType>(
      process.env.LOCAL_BASE_URL + 'myPage',
      {
        data: {
          id,
        },
      },
    );

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const sendSharedEmail = async (body: {
  email: string;
  _id?: string;
}) => {
  try {
    const regex = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
    if (!regex.test(body.email)) {
      alert('이메일 형식에 맞지 않습니다');
      return;
    }

    const result = await axios.patch(
      process.env.LOCAL_BASE_URL + 'myPage',
      body,
    );

    return result;
  } catch (err) {
    alert('이미 초대된 이메일입니다');
  }
};
