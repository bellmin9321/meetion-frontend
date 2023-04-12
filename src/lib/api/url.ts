export const URL =
  process.env.NODE_ENV === 'production'
    ? process.env.AWS_BASE_URL
    : process.env.LOCAL_BASE_URL;
