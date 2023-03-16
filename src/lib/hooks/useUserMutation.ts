import { useMutation } from 'react-query';

import { createUser } from '@/lib/api/user';

export default function useUserMutation() {
  const addUser = useMutation(createUser);

  return {
    addUser,
  };
}
