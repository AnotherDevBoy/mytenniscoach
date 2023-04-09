import jwt from 'jsonwebtoken';
import Configuration from '@/pages/api/lib/configuration';

export const getUser = (
  cookies: Partial<{
    [key: string]: string;
  }>
): string => {
  if (!cookies['supabase-auth-token']) {
    return '';
  }

  const encodedAuthToken = cookies['supabase-auth-token'];
  const authToken = JSON.parse(decodeURI(encodedAuthToken));
  var decodedToken = jwt.verify(authToken[0], Configuration.jwtSecret);
  return decodedToken.sub as string;
};
