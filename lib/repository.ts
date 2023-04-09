import { SupabaseClient, createClient } from '@supabase/supabase-js';
import Configuration from './configuration';
import { Database } from './database.types';

export enum EventTypeDAL {
  Match = 0,
  Training = 1,
  Coaching = 2,
  Gym = 3
}

export type ScheduleEventDAL = {
  id: string;
  userId: string;
  start: string;
  end: string;
  type: EventTypeDAL;
  title: string;
  created_at: string | undefined;
  deleted_at: string | undefined;
};

export class MyTennisCoachRepository {
  private supabase: SupabaseClient<Database>;

  constructor() {
    this.supabase = createClient(
      Configuration.supabaseUrl,
      Configuration.supabaseKey
    );
  }

  async getSchedules(userId: string): Promise<ScheduleEventDAL[]> {
    const response = await this.supabase
      .from('Schedules')
      .select()
      .eq('userId', userId);
    return response.data as ScheduleEventDAL[];
  }

  async createSchedule(schedule: ScheduleEventDAL) {
    const response = await this.supabase.from('Schedules').insert(schedule);
  }
}
