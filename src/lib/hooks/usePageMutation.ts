import { useMutation } from 'react-query';

import { createNewPage, deletePage, patchPage } from '@/lib/api/page';

export default function usePageMutation() {
  const addPage = useMutation(createNewPage);
  const removePage = useMutation(deletePage);
  const editPage = useMutation(patchPage);

  return {
    addPage,
    removePage,
    editPage,
  };
}
