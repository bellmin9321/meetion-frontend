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
  {
    icon: RiKakaoTalkFill,
    style: 'bg-yellow-300',
  },
  { icon: SiNaver, style: 'bg-green-500 text-white' },
];

export const newPageState = atom<PageType>({
  key: 'newPage',
  default: {
    _id: '',
    creator: '',
    title: '',
    desc: '',
    sharedUsers: [],
  },
});

export const pageListState = atom<PageType[]>({
  key: 'pageList',
  default: [],
});

export const sharedPagesState = atom<PageType[]>({
  key: 'sharedPages',
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

export const selectPage = atom<PageType>({
  key: 'selectedPage',
  default: {
    _id: '',
    creator: '',
    title: '',
    desc: '',
    sharedUsers: [],
  },
});

export const selectedPageID = atom<string | undefined>({
  key: 'pageID',
  default: '',
});

export const shareModalState = atom<boolean>({
  key: 'shareModal',
  default: false,
});

export const invitedEmails = atom<string[] | undefined>({
  key: 'invitedEmails',
  default: [],
});
