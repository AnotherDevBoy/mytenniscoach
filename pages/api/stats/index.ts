import type { NextApiRequest, NextApiResponse } from 'next';
import { MyTennisCoachRepository } from '@/pages/api/lib/repository';
import { getUser, authHandler } from '@/pages/api/lib/auth';
import { MatchEventData, StatsDTO } from '@/lib/types';
import { createLogger, logger } from '../lib/logger';
import { extractRequestId } from '../lib/headers';

const repository = new MyTennisCoachRepository();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StatsDTO | {}>
) {
  createLogger(extractRequestId(req));
  logger.info('Starting execution of /stats');
  await authHandler(req, res);
  const user = getUser(req.cookies)!;

  switch (req.method) {
    case 'GET':
      try {
        const matchesDAL = await repository.getCompletedMatches(user);

        if (!matchesDAL || matchesDAL.length === 0) {
          return res.status(200).json({
            winRate: 100,
            nemesis: 'N/A'
          });
        }

        const matchResults = matchesDAL.map(
          (e) => e.metadata as MatchEventData
        );

        const victories = matchResults.filter((r) => r.summary.win);

        const lossesPerOpponent = new Map<string, number>();

        matchesDAL
          .filter((m) => {
            const data = m.metadata as MatchEventData;
            return !data.summary.win;
          })
          .forEach((m) => {
            const losses = lossesPerOpponent.get(m.opponent_id!);
            lossesPerOpponent.set(m.opponent_id!, losses ? losses + 1 : 1);
          });

        let opponent = undefined;

        if (lossesPerOpponent.size > 0) {
          const max = [...lossesPerOpponent.entries()].reduce(
            (accumulator, element) => {
              return element[1] > accumulator[1] ? element : accumulator;
            }
          );

          opponent = await repository.getOpponent(user, max[0]);
        }

        return res.status(200).json({
          winRate: ((victories.length / matchesDAL.length) * 100).toFixed(2),
          nemesis: opponent ? opponent.name : 'N/A'
        });
      } catch (e) {
        logger.error('An error ocurred', e);
        return res.status(200).json({
          winRate: 100,
          nemesis: 'N/A'
        });
      }
  }
}
