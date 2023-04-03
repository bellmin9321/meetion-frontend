import { NextPageContext } from 'next';
import Head from 'next/head';
import { getProviders, getSession, signIn } from 'next-auth/react';

import { LoginProperties } from '@/lib/recoil';

import { LoginProp } from '@/types';

function SignIn({ providers }: { providers: LoginProp }) {
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
            {Object.values(providers).map((provider, i) => {
              const Icon = LoginProperties[i].icon;

              return (
                <button
                  key={provider.id}
                  className={`loginBtn + ${LoginProperties[i].style}`}
                  onClick={() => signIn(provider.id)}
                >
                  <Icon className="mr-2 h-5 w-5" />
                  <span>{provider.name}로 계속하기</span>
                </button>
              );
            })}
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
        destination: '/auth/signin',
        statusCode: 302,
      },
    };
  }
}

export default SignIn;
