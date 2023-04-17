import type { NextApiRequest, NextApiResponse } from 'next';
import { MyTennisCoachRepository } from '@/pages/api/lib/repository';
import { authHandler, getUser } from '@/pages/api/lib/auth';

const repository = new MyTennisCoachRepository();

function getOpponentId(req: NextApiRequest) {
  const url = req.url!!;
  const tokens = url.split('/');
  return tokens[tokens.length - 1];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await authHandler(req, res);
  const user = getUser(req.cookies);

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const opponentId = getOpponentId(req);

  switch (req.method) {
    case 'DELETE':
      await repository.deleteOpponent(opponentId);
      return res.status(200).end();
    default:
      return res.status(404).json({ message: 'Not found' });
  }
}
