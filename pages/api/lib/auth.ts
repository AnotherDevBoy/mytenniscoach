import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { logger } from '../lib/logger';

export const getUser = (
  cookies: Partial<{
    [key: string]: string;
  }>
): string | null => {
  const token = getToken(cookies);

  if (!token) {
    return null;
  }

  const parsedToken = JSON.parse(token);
  var decodedToken = jwt.decode(parsedToken[0]);
  return decodedToken!.sub as string;
};

export const authHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const user = getUser(req.cookies);

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

function getToken(
  cookies: Partial<{
    [key: string]: string;
  }>
) {
  if (cookies['sb-access-token']) {
    return cookies['sb-access-token'];
  }

  if (cookies['sb-dmvvvaxstbfcdrxwfraw-auth-token']) {
    return cookies['sb-dmvvvaxstbfcdrxwfraw-auth-token'];
  }

  if (cookies['supabase-auth-token']) {
    return cookies['supabase-auth-token'];
  }

  return null;
}
