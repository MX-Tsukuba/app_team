export type Json =
    | boolean
    | null
    | { [key: string]: Json | undefined}
    | Json[]

export interface Database {
    public: {
        Tables: {
            "profiles": {
                Row: {
                    id: number
                    updated_at: string
                    username: string
                    full_name: string
                    avater_url: string
                    website: string
                    created_at: string
                }
                Insert: {
                    id?: number
                    updated_at?: string
                    username: string
                    full_name: string
                    avater_url: string
                    website: string
                    created_at?: string
                }
                Relationships:[]
            }
        }
        Views: {
            [_ in never]: never
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