import type { NextApiRequest, NextApiResponse } from 'next';
import {
  EventDAL,
  MyTennisCoachRepository,
  OpponentDAL
} from '@/pages/api/lib/repository';
import { getUser, authHandler } from '@/pages/api/lib/auth';
import { MatchEventData, MatchStats, OpponentStatsDTO } from '@/lib/types';
import { compareDesc } from 'date-fns';
import { createLogger, logger } from '../lib/logger';
import { extractRequestId } from '../lib/headers';

const repository = new MyTennisCoachRepository();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  createLogger(extractRequestId(req));
  logger.info('Starting execution of /opponents/stats');
  await authHandler(req, res);
  const user = getUser(req.cookies)!;

  switch (req.method) {
    case 'GET':
      const opponentsDAL = await repository.getOpponents(user);

      logger.info('Oppoonents', opponentsDAL);

      const matchesDAL = await repository.getCompletedMatches(user);

      logger.info('matchesDAL', opponentsDAL);

      const stats = getOpponentsStats(opponentsDAL, matchesDAL);

      return res.status(200).json(stats);
    default:
      return res.status(404).json({ message: 'Not found' });
  }
}

function getOpponentsStats(
  opponentsDAL: OpponentDAL[],
  eventsDAL: EventDAL[]
): OpponentStatsDTO[] {
  const opponentsStats: OpponentStatsDTO[] = [];

  opponentsDAL.forEach((o) => {
    try {
      const eventsForOpponent = eventsDAL.filter((e) => e.opponent_id === o.id);

      if (eventsForOpponent.length === 0) {
        const stats: OpponentStatsDTO = {
          opponentId: o.id,
          opponentName: o.name
        };

        opponentsStats.push(stats);
        return;
      }

      const eventsForOpponentSorted = eventsForOpponent.sort((a, b) => {
        const startA = new Date(a.start);
        const startB = new Date(b.start);

        return compareDesc(startA, startB);
      });

      const matchData = eventsForOpponentSorted.map(
        (e) => e.metadata as MatchEventData
      );

      const victories = matchData.filter((m) => m.summary.win);

      const winRate = (
        (victories.length / eventsForOpponent.length) *
        100
      ).toFixed(2);

      const lastMatch = matchData[0];

      const stats: OpponentStatsDTO = {
        opponentId: o.id,
        opponentName: o.name,
        winRate: winRate,
        forehand: lastMatch.opponentPeformance.forehand,
        backhand: lastMatch.opponentPeformance.backhand,
        matches: eventsForOpponentSorted.map((e) => {
          const metadata = e.metadata as MatchEventData;

          return {
            date: e.start,
            performance: metadata.opponentPeformance
          } as MatchStats;
        })
      };

      opponentsStats.push(stats);
    } catch (e) {
      logger.error('An error ocurred', e);
      const stats: OpponentStatsDTO = {
        opponentId: o.id,
        opponentName: o.name
      };

      opponentsStats.push(stats);
    }
  });

  return opponentsStats;
}
