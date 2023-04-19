import { useMutation } from 'react-query';

import { deleteInvitedEmail, sendSharedEmail } from '../api/email';

export default function useEmailMutation() {
  const sendEmail = useMutation(sendSharedEmail);
  const removeEmail = useMutation(deleteInvitedEmail);

  return {
    sendEmail,
    removeEmail,
  };
}
