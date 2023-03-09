import { useMutation } from 'react-query';

import { createNewPage } from '@/api/page';

export default function useAddPageMutation() {
  return useMutation(createNewPage);
}
