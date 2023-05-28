import type { NextApiRequest, NextApiResponse } from 'next';
import {
  EventDAL,
  EventTypeDAL,
  MyTennisCoachRepository,
  OpponentDAL
} from '@/pages/api/lib/repository';
import { getUser, authHandler } from '@/pages/api/lib/auth';
import { MatchEventData, MatchStats, OpponentStatsDTO } from '@/lib/types';
import { compareDesc } from 'date-fns';

const repository = new MyTennisCoachRepository();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log('Starting execution of /opponents/stats');
  await authHandler(req, res);
  const user = getUser(req.cookies);

  switch (req.method) {
    case 'GET':
      const opponentsDAL = await repository.getOpponents(user);

      console.log('Oppoonents', opponentsDAL);

      const matchesDAL = await repository.getCompletedMatches(user);

      console.log('matchesDAL', opponentsDAL);

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
        const endA = new Date(a.end);
        const endB = new Date(b.end);

        return compareDesc(endA, endB);
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
            date: e.end,
            performance: metadata.opponentPeformance
          } as MatchStats;
        })
      };

      opponentsStats.push(stats);
    } catch (e) {
      console.log('An error ocurred', e);
      const stats: OpponentStatsDTO = {
        opponentId: o.id,
        opponentName: o.name
      };

      opponentsStats.push(stats);
    }
  });

  return opponentsStats;
}
