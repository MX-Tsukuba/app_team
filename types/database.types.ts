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
      m_golfPlaces: {
        Row: {
          created_at: string
          golfPlaceName: string | null
          id: number
          par_10H: number | null
          par_11H: number | null
          par_12H: number | null
          par_13H: number | null
          par_14H: number | null
          par_15H: number | null
          par_16H: number | null
          par_17H: number | null
          par_18H: number | null
          par_1H: number | null
          par_2H: number | null
          par_3H: number | null
          par_4H: number | null
          par_5H: number | null
          par_6H: number | null
          par_7H: number | null
          par_8H: number | null
          par_9H: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          golfPlaceName?: string | null
          id?: number
          par_10H?: number | null
          par_11H?: number | null
          par_12H?: number | null
          par_13H?: number | null
          par_14H?: number | null
          par_15H?: number | null
          par_16H?: number | null
          par_17H?: number | null
          par_18H?: number | null
          par_1H?: number | null
          par_2H?: number | null
          par_3H?: number | null
          par_4H?: number | null
          par_5H?: number | null
          par_6H?: number | null
          par_7H?: number | null
          par_8H?: number | null
          par_9H?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          golfPlaceName?: string | null
          id?: number
          par_10H?: number | null
          par_11H?: number | null
          par_12H?: number | null
          par_13H?: number | null
          par_14H?: number | null
          par_15H?: number | null
          par_16H?: number | null
          par_17H?: number | null
          par_18H?: number | null
          par_1H?: number | null
          par_2H?: number | null
          par_3H?: number | null
          par_4H?: number | null
          par_5H?: number | null
          par_6H?: number | null
          par_7H?: number | null
          par_8H?: number | null
          par_9H?: number | null
          updated_at?: string | null
        }
        Relationships: []
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
      t_body_flexibility: {
        Row: {
          created_at: string
          flexibility: number
          flexibility_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          flexibility: number
          flexibility_id?: never
          updated_at?: string
        }
        Update: {
          created_at?: string
          flexibility?: number
          flexibility_id?: never
          updated_at?: string
        }
        Relationships: []
      }
      t_body_height: {
        Row: {
          created_at: string
          height: number
          height_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          height: number
          height_id?: never
          updated_at?: string
        }
        Update: {
          created_at?: string
          height?: number
          height_id?: never
          updated_at?: string
        }
        Relationships: []
      }
      t_body_weight: {
        Row: {
          created_at: string
          updated_at: string
          weight: number
          weight_id: number
        }
        Insert: {
          created_at?: string
          updated_at?: string
          weight: number
          weight_id?: never
        }
        Update: {
          created_at?: string
          updated_at?: string
          weight?: number
          weight_id?: never
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
          holeNumber: number | null
          id: number
          puttsNumber: number | null
          round_id: number | null
          scoreNumber: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          holeNumber?: number | null
          id?: number
          puttsNumber?: number | null
          round_id?: number | null
          scoreNumber?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          holeNumber?: number | null
          id?: number
          puttsNumber?: number | null
          round_id?: number | null
          scoreNumber?: number | null
          updated_at?: string | null
        }
        Relationships: [
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
          date: string | null
          golfPlace_id: number | null
          id: number
          roundNumber: number | null
          updated_at: string | null
          user_id: number | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          golfPlace_id?: number | null
          id?: number
          roundNumber?: number | null
          updated_at?: string | null
          user_id?: number | null
        }
        Update: {
          created_at?: string
          date?: string | null
          golfPlace_id?: number | null
          id?: number
          roundNumber?: number | null
          updated_at?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "t_rounds_golfPlace_id_fkey"
            columns: ["golfPlace_id"]
            isOneToOne: false
            referencedRelation: "m_golfPlaces"
            referencedColumns: ["id"]
          },
        ]
      }
      t_sample_kazuki: {
        Row: {
          course: string | null
          created_at: string
          hole: number | null
          id: number
          putts: number | null
          score: number | null
        }
        Insert: {
          course?: string | null
          created_at?: string
          hole?: number | null
          id?: number
          putts?: number | null
          score?: number | null
        }
        Update: {
          course?: string | null
          created_at?: string
          hole?: number | null
          id?: number
          putts?: number | null
          score?: number | null
        }
        Relationships: []
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
