import jwt from 'jsonwebtoken';
import Configuration from '@/pages/api/lib/configuration';
import { NextApiRequest, NextApiResponse } from 'next';

export const getUser = (
  cookies: Partial<{
    [key: string]: string;
  }>
): string => {
  if (
    !cookies['sb-access-token'] ||
    !cookies['sb-dmvvvaxstbfcdrxwfraw-auth-token'] ||
    !cookies['supabase-auth-token']
  ) {
    return '';
  }

  const encodedAuthToken =
    cookies['sb-access-token'] ??
    cookies['sb-dmvvvaxstbfcdrxwfraw-auth-token'] ??
    cookies['supabase-auth-token'];
  const authToken = JSON.parse(decodeURI(encodedAuthToken));
  //var decodedToken = jwt.verify(authToken[0], Configuration.jwtSecret);
  return authToken.sub as string;
};

export const authHandler = (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Auth handler');
  const user = getUser(req.cookies);

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
