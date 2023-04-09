export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Schedules: {
        Row: {
          created_at: string;
          deleted_at: string | null;
          end: string;
          id: string;
          start: string;
          title: string;
          type: number;
          userId: string;
        };
        Insert: {
          created_at?: string;
          deleted_at?: string | null;
          end: string;
          id: string;
          start: string;
          title: string;
          type: number;
          userId: string;
        };
        Update: {
          created_at?: string;
          deleted_at?: string | null;
          end?: string;
          id?: string;
          start?: string;
          title?: string;
          type?: number;
          userId?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
