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
            foreignKeyName: "t_holes_movie_id_fkey1"
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
          status: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          date?: string | null
          id?: number
          movie_name?: string | null
          result?: Json | null
          status?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          date?: string | null
          id?: number
          movie_name?: string | null
          result?: Json | null
          status?: number
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
