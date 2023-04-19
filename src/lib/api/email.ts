import axios from 'axios';

export const sendSharedEmail = async (body: {
  email: string;
  _id?: string;
}) => {
  try {
    const regex = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
    if (!regex.test(body.email)) {
      alert('이메일 형식에 맞지 않습니다');
      return;
    }

    const result = await axios.patch(
      process.env.LOCAL_BASE_URL + 'myPage',
      body,
    );

    return result;
  } catch (err) {
    alert('이미 초대된 이메일입니다');
  }
};

export const deleteInvitedEmail = async (data: {
  _id: string;
  email: string;
}) => {
  try {
    // const data = {_id, email}
    const result = await axios.delete(
      process.env.LOCAL_BASE_URL + 'myPage/sharedEmail',
      {
        data,
      },
    );

    return result;
  } catch (err) {
    alert('초대된 이메일을 삭제하지 못했습니다.');
  }
};
