import { atom } from 'recoil';

import { PageType } from '@/types';

export const pageState = atom<PageType>({
  key: 'content',
  default: {
    _id: '',
    creator: '',
    title: '',
    desc: '',
  },
});
