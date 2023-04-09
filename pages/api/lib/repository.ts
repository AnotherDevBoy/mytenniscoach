import { SupabaseClient, createClient } from '@supabase/supabase-js';
import Configuration from '@/pages/api/lib/configuration';
import { Database } from '@/pages/api/lib/database.types';
import { formatRFC3339 } from 'date-fns';
import {
  PostgrestResponseFailure,
  PostgrestResponseSuccess
} from '@supabase/postgrest-js';

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
      .eq('userId', userId)
      .is('deleted_at', null);

    this.handleError(response);

    return response.data as ScheduleEventDAL[];
  }

  async createSchedule(schedule: ScheduleEventDAL) {
    const response = await this.supabase.from('Schedules').insert(schedule);

    this.handleError(response);
  }

  async upsertScheduleEvent(schedule: ScheduleEventDAL) {
    const response = await this.supabase.from('Schedules').upsert(schedule);
    this.handleError(response);
  }

  async deleteScheduleEvent(scheduleId: string) {
    const response = await this.supabase
      .from('Schedules')
      .update({ deleted_at: formatRFC3339(new Date()) })
      .eq('id', scheduleId);

    this.handleError(response);
  }

  private handleError(
    response: PostgrestResponseFailure | PostgrestResponseSuccess<any>
  ) {
    if (response.status >= 400) {
      console.log(JSON.stringify(response.error));
      throw new Error('An error occurred');
    }

    console.log(response);
  }
}
