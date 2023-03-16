import { atom, RecoilEnv } from 'recoil';
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';

import { PageType, UserType } from '@/types';

export const LoginProperties = [
  { icon: FcGoogle, style: '' },
  { icon: AiFillGithub, style: 'bg-gray-800 text-white' },
  { icon: RiKakaoTalkFill, style: 'bg-yellow-300' },
  { icon: SiNaver, style: 'bg-green-500 text-white' },
];

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

export const userState = atom<UserType>({
  key: 'user',
  default: {
    email: '',
    image: '',
    name: '',
  },
});
