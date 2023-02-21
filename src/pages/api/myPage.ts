// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  id: number;
  title: string;
};

const list = [
  { id: 1, title: '알고리즘 풀기' },
  { id: 2, title: '면접 준비' },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>,
) {
  res.status(200).json(list);
}
