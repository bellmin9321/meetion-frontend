import axios from 'axios';

import { PageType } from '@/types';

export const getPageList = async () => {
  try {
    const { data } = await axios.get(process.env.LOCAL_BASE_URL + 'myPage');

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
