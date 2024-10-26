export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      body_inputs: {
        Row: {
          created_at: string | null
          date: string
          flexibility: number | null
          height: number | null
          id: number
          updated_at: string | null
          weight: number
        }
        Insert: {
          created_at?: string | null
          date: string
          flexibility?: number | null
          height?: number | null
          id?: never
          updated_at?: string | null
          weight: number
        }
        Update: {
          created_at?: string | null
          date?: string
          flexibility?: number | null
          height?: number | null
          id?: never
          updated_at?: string | null
          weight?: number
        }
        Relationships: []
      }
      m_golfplaces: {
        Row: {
          created_at: string
          golf_place_name: string
          id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          golf_place_name: string
          id?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          golf_place_name?: string
          id?: number
          updated_at?: string
        }
        Relationships: []
      }
      m_holes: {
        Row: {
          created_at: string
          golfplaces_id: number
          hole_number: number
          par_number: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          golfplaces_id: number
          hole_number: number
          par_number: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          golfplaces_id?: number
          hole_number?: number
          par_number?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "m_holes_golfplaces_id_fkey"
            columns: ["golfplaces_id"]
            isOneToOne: false
            referencedRelation: "m_golfplaces"
            referencedColumns: ["id"]
          },
        ]
      }
      m_kind_options: {
        Row: {
          kind: string
          kind_options_id: number
        }
        Insert: {
          kind: string
          kind_options_id?: never
        }
        Update: {
          kind?: string
          kind_options_id?: never
        }
        Relationships: []
      }
      t_days: {
        Row: {
          created_at: string
          date: string
          days_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          days_id?: never
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          days_id?: never
          updated_at?: string
        }
        Relationships: []
      }
      t_eat: {
        Row: {
          created_at: string
          days_id: number
          eat_id: number
          kind_options_id: number
          meals_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          days_id: number
          eat_id?: never
          kind_options_id: number
          meals_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          days_id?: number
          eat_id?: never
          kind_options_id?: number
          meals_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "t_eat_days_id_fkey"
            columns: ["days_id"]
            isOneToOne: false
            referencedRelation: "t_days"
            referencedColumns: ["days_id"]
          },
          {
            foreignKeyName: "t_eat_kind_options_id_fkey"
            columns: ["kind_options_id"]
            isOneToOne: false
            referencedRelation: "m_kind_options"
            referencedColumns: ["kind_options_id"]
          },
          {
            foreignKeyName: "t_eat_meals_id_fkey"
            columns: ["meals_id"]
            isOneToOne: false
            referencedRelation: "t_meals"
            referencedColumns: ["meals_id"]
          },
        ]
      }
      t_holes: {
        Row: {
          created_at: string
          hole_number: number
          id: number
          movie_id: number | null
          putts_number: number
          round_id: number
          score_number: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          hole_number: number
          id?: number
          movie_id?: number | null
          putts_number: number
          round_id: number
          score_number: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          hole_number?: number
          id?: number
          movie_id?: number | null
          putts_number?: number
          round_id?: number
          score_number?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "t_holes_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "t_movies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "t_holes_round_id_fkey"
            columns: ["round_id"]
            isOneToOne: false
            referencedRelation: "t_rounds"
            referencedColumns: ["id"]
          },
        ]
      }
      t_meals: {
        Row: {
          calorie: number
          created_at: string
          meals_id: number
          title: string
          updated_at: string
        }
        Insert: {
          calorie: number
          created_at?: string
          meals_id?: never
          title: string
          updated_at?: string
        }
        Update: {
          calorie?: number
          created_at?: string
          meals_id?: never
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      t_movies: {
        Row: {
          created_at: string
          date: string | null
          id: number
          movie_name: string | null
          result: Json | null
          status: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          id?: number
          movie_name?: string | null
          result?: Json | null
          status?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          date?: string | null
          id?: number
          movie_name?: string | null
          result?: Json | null
          status?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      t_profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      t_rounds: {
        Row: {
          created_at: string
          date: string
          golf_place_id: number
          id: number
          round_number: number
          updated_at: string
          user_id: number
        }
        Insert: {
          created_at?: string
          date: string
          golf_place_id: number
          id?: number
          round_number: number
          updated_at?: string
          user_id: number
        }
        Update: {
          created_at?: string
          date?: string
          golf_place_id?: number
          id?: number
          round_number?: number
          updated_at?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "t_rounds_golfPlace_id_fkey"
            columns: ["golf_place_id"]
            isOneToOne: false
            referencedRelation: "m_golfplaces"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      view_tables: {
        Row: {
          calorie: number | null
          date: string | null
          eat_id: number | null
          kind: string | null
          title: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
