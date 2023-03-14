import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import { pageList } from '@/lib/recoil';

import Content from '@/components/layout/Content';
import Layout from '@/components/layout/Layout';

const Page = () => {
  const router = useRouter();

  const { pid } = router.query;
  const pages = useRecoilValue(pageList);

  let originalId: string;

  if (pid) {
    const arr = (pid as string)?.split('-');
    originalId = arr[arr.length - 1];
  }

  const target = pages.find((page) => page._id === originalId);

  return (
    <Layout>
      <Content page={target} />
    </Layout>
  );
};

export default Page;
