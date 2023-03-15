import { atom, RecoilEnv } from 'recoil';
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

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
