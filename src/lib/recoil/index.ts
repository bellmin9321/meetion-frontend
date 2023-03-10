import { atom } from 'recoil';

import { PageType } from '@/types';

export const pageState = atom<PageType>({
  key: 'page',
  default: {
    _id: '',
    creator: '',
    title: '',
    desc: '',
  },
});

export const pageList = atom<PageType[]>({
  key: 'pageList',
  default: [],
});
