import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import Content from '@/components/layout/Content';
import Layout from '@/components/layout/Layout';

import { pageList } from '@/recoil';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const pages = useRecoilValue(pageList);

  const target = pages.find((page) => page._id === id);

  return (
    <Layout>
      <Content page={target} />
    </Layout>
  );
};

export default Page;
