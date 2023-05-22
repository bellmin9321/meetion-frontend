import { NextPageContext } from 'next';
import Head from 'next/head';
import { getProviders, getSession, signIn } from 'next-auth/react';
import { FormEventHandler, useState } from 'react';

import { LoginProperties } from '@/lib/recoil';

import { LoginProp } from '@/types';

function SignIn({ providers }: { providers: LoginProp }) {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      redirect: true,
    });
    console.log(res);
  };

  return (
    <>
      <Head>
        <title>Meetion</title>
      </Head>
      <div
        data-test-id="authenticated"
        className="flex h-screen flex-col justify-center bg-stone-50"
      >
        <header className="fix top-0 mx-5 h-[5%] text-xl font-bold">
          Meetion
        </header>
        <div className="flex h-[95%] flex-col self-center">
          <div className="flex h-[20%] items-center justify-center  align-middle text-4xl font-bold">
            로그인
          </div>
          <div className="flex w-[350px] flex-col justify-center ">
            {Object.values(providers).map((provider, i) => {
              if (provider.id === 'credentials') {
                return (
                  <form
                    key={provider.id}
                    className="flex flex-col"
                    onSubmit={handleSubmit}
                  >
                    <hr className="my-5" />
                    <input
                      value={userInfo.email}
                      onChange={({ target }) =>
                        setUserInfo({ ...userInfo, email: target.value })
                      }
                      type="email"
                      placeholder="Email"
                    />
                    <input
                      value={userInfo.password}
                      onChange={({ target }) =>
                        setUserInfo({ ...userInfo, password: target.value })
                      }
                      type="password"
                      placeholder="Password"
                    />
                    <input
                      className="bold h-9 bg-blue-600 text-lg text-white"
                      type="submit"
                      value="로그인"
                    />
                  </form>
                );
              } else {
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
              }
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
