import { ReactNode } from 'react';

export interface PageType {
  _id?: string;
  creator: string;
  title: string;
  desc?: string;
  sharedUsers?: string[];
}

export interface UserType {
  email: string;
  image: string;
  name: string;
}

export interface CategoryType {
  name: string;
  icon: ReactNode;
}

export interface LoginProp {
  google: {
    callbackUrl: string;
    id: string;
    name: string;
    signinUrl: string;
    type: string;
  };
  github: {
    callbackUrl: string;
    id: string;
    name: string;
    signinUrl: string;
    type: string;
  };
  kakao: {
    callbackUrl: string;
    id: string;
    name: string;
    signinUrl: string;
    type: string;
  };
  naver: {
    callbackUrl: string;
    id: string;
    name: string;
    signinUrl: string;
    type: string;
  };
}
