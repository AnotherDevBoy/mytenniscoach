import { NextApiRequest } from 'next';

export const getURL = () => {
  let url = 'https://mytenniscoach.io';
  // Make sure to include `https://` when not localhost.
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
