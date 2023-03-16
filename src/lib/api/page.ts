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
