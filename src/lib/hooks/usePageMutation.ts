import { useMutation } from 'react-query';

import { createNewPage, deletePage } from '@/lib/api/page';

export default function usePageMutation() {
  const addPage = useMutation(createNewPage);
  const removePage = useMutation(deletePage);

  return {
    addPage,
    removePage,
  };
}