import { NextApiRequest } from 'next';

export const getURL = () => {
  const env = process.env.NODE_ENV;
  let url =
    env === 'development'
      ? 'http://localhost:3000'
      : 'https://mytenniscoach.io';
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};

export const extractEventId = (req: NextApiRequest) => {
  const url = req.url!!;
  const tokens = url.split('/');
  return tokens[3];
};
