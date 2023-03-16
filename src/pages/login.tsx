/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextPageContext } from 'next';
import Head from 'next/head';
import { getProviders, getSession, signIn } from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';

import { LoginProp } from '@/types';

function Login({ providers }: { providers: LoginProp }) {
  return (
    <>
      <Head>
        <title>Meetion</title>
      </Head>
      <div className="flex h-screen flex-col justify-center bg-stone-50">
        <header className="fix top-0 mx-5 h-[5%] text-xl font-bold">
          Meetion
        </header>
        <div className="flex h-[95%] flex-col self-center">
          <div className="flex h-[20%] items-center justify-center  align-middle text-4xl font-bold">
            로그인
          </div>
          <div className="flex w-[350px] flex-col justify-center ">
            <button
              className="loginBtn"
              onClick={() => signIn(providers!.google.id)}
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              Goolgle로 계속하기
            </button>
            <button
              className="loginBtn bg-gray-800 text-white"
              onClick={() => signIn(providers!.github.id)}
            >
              <AiFillGithub className="mr-2 h-5 w-5" />
              Github으로 계속하기
            </button>
            <button
              className="loginBtn bg-yellow-300"
              onClick={() => signIn(providers!.kakao.id)}
            >
              <RiKakaoTalkFill className="mr-2 h-5 w-5" />
              Kakao로 계속하기
            </button>
            <button
              className="loginBtn bg-green-500 text-white"
              onClick={() => signIn(providers!.naver.id)}
            >
              <SiNaver className="mr-2 h-5 w-5" />
              Naver로 계속하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  try {
    const { req, res } = context;
    const session = await getSession({ req });

    if (session && res && session.user) {
      res.writeHead(302, {
        Location: '/',
      });
      res.end();
      return { props: {} };
    }

    return {
      props: {
        providers: await getProviders(),
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        statusCode: 302,
      },
    };
  }
}

export default Login;
