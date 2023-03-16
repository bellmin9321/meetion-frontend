import axios from 'axios';

import { UserType } from '@/types';

export const createUser = async (body: UserType) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    const { data } = await axios.post<UserType>(
      process.env.LOCAL_BASE_URL + 'user',
      body,
      { headers },
    );

    return data;
  } catch (err) {
    console.log(err);
  }
};
