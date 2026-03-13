export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      appointment_attendees: {
        Row: {
          appointment_id: string
          created_at: string
          email: string
          id: string
          name: string | null
          profile_id: string | null
          response_status: string | null
        }
        Insert: {
          appointment_id: string
          created_at?: string
          email: string
          id?: string
          name?: string | null
          profile_id?: string | null
          response_status?: string | null
        }
        Update: {
          appointment_id?: string
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          profile_id?: string | null
          response_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointment_attendees_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointment_attendees_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          created_at: string
          description: string | null
          end_time: string
          google_event_id: string | null
          id: string
          location: string | null
          meeting_link: string | null
          organizer_id: string | null
          phase_id: string | null
          project_id: string | null
          start_time: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_time: string
          google_event_id?: string | null
          id?: string
          location?: string | null
          meeting_link?: string | null
          organizer_id?: string | null
          phase_id?: string | null
          project_id?: string | null
          start_time: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_time?: string
          google_event_id?: string | null
          id?: string
          location?: string | null
          meeting_link?: string | null
          organizer_id?: string | null
          phase_id?: string | null
          project_id?: string | null
          start_time?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "project_phases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      calendar_events: {
        Row: {
          company_id: string
          created_at: string
          created_by: string | null
          description: string | null
          end_time: string | null
          event_date: string
          event_type: string
          google_event_id: string | null
          id: string
          start_time: string | null
          title: string
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_time?: string | null
          event_date: string
          event_type?: string
          google_event_id?: string | null
          id?: string
          start_time?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_time?: string | null
          event_date?: string
          event_type?: string
          google_event_id?: string | null
          id?: string
          start_time?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendar_events_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calendar_events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      client_ideas: {
        Row: {
          benchmark_links: Json | null
          created_at: string
          description: string | null
          id: string
          status: string
          summary: Json | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          benchmark_links?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          status?: string
          summary?: Json | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          benchmark_links?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          status?: string
          summary?: Json | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          created_at: string
          description: string | null
          id: string
          logo_url: string | null
          name: string
          updated_at: string
          website: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      company_audit_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          role: string
          session_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          role: string
          session_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          role?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_audit_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "company_audit_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      company_audit_sessions: {
        Row: {
          audit_summary: Json | null
          company_id: string
          created_at: string | null
          email: string | null
          first_name: string | null
          first_response: string | null
          id: string
          last_name: string | null
          phone: string | null
          phone_verified: boolean | null
          status: string | null
          updated_at: string | null
          verification_code: string | null
        }
        Insert: {
          audit_summary?: Json | null
          company_id: string
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          first_response?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          phone_verified?: boolean | null
          status?: string | null
          updated_at?: string | null
          verification_code?: string | null
        }
        Update: {
          audit_summary?: Json | null
          company_id?: string
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          first_response?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          phone_verified?: boolean | null
          status?: string | null
          updated_at?: string | null
          verification_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_audit_sessions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_branding: {
        Row: {
          accent_color: string | null
          assets: Json | null
          company_id: string
          created_at: string
          favicon_url: string | null
          fonts: Json | null
          guidelines: string | null
          id: string
          logo_dark_url: string | null
          logo_url: string | null
          primary_color: string | null
          secondary_color: string | null
          updated_at: string
        }
        Insert: {
          accent_color?: string | null
          assets?: Json | null
          company_id: string
          created_at?: string
          favicon_url?: string | null
          fonts?: Json | null
          guidelines?: string | null
          id?: string
          logo_dark_url?: string | null
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string
        }
        Update: {
          accent_color?: string | null
          assets?: Json | null
          company_id?: string
          created_at?: string
          favicon_url?: string | null
          fonts?: Json | null
          guidelines?: string | null
          id?: string
          logo_dark_url?: string | null
          logo_url?: string | null
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_branding_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_members: {
        Row: {
          company_id: string
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          role?: string
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_members_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      idea_attachments: {
        Row: {
          created_at: string
          description: string | null
          file_name: string
          file_path: string
          file_size: number | null
          file_type: string | null
          id: string
          idea_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_name: string
          file_path: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          idea_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          idea_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "idea_attachments_idea_id_fkey"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "client_ideas"
            referencedColumns: ["id"]
          },
        ]
      }
      idea_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          idea_id: string
          role: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          idea_id: string
          role: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          idea_id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "idea_messages_idea_id_fkey"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "client_ideas"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_ideas: {
        Row: {
          benchmark_suggestions: Json | null
          budget_indication: string | null
          company: string | null
          complexity: string | null
          contact_preference: string | null
          conversation_history: Json | null
          created_at: string
          deadline: string | null
          description: string | null
          email: string | null
          features: Json | null
          full_name: string | null
          id: string
          labels: string[] | null
          notes: string | null
          phone: string | null
          problem_solved: string | null
          project_title: string
          source: string | null
          status: string
          target_audience: string | null
          timeline: Json | null
          updated_at: string
        }
        Insert: {
          benchmark_suggestions?: Json | null
          budget_indication?: string | null
          company?: string | null
          complexity?: string | null
          contact_preference?: string | null
          conversation_history?: Json | null
          created_at?: string
          deadline?: string | null
          description?: string | null
          email?: string | null
          features?: Json | null
          full_name?: string | null
          id?: string
          labels?: string[] | null
          notes?: string | null
          phone?: string | null
          problem_solved?: string | null
          project_title: string
          source?: string | null
          status?: string
          target_audience?: string | null
          timeline?: Json | null
          updated_at?: string
        }
        Update: {
          benchmark_suggestions?: Json | null
          budget_indication?: string | null
          company?: string | null
          complexity?: string | null
          contact_preference?: string | null
          conversation_history?: Json | null
          created_at?: string
          deadline?: string | null
          description?: string | null
          email?: string | null
          features?: Json | null
          full_name?: string | null
          id?: string
          labels?: string[] | null
          notes?: string | null
          phone?: string | null
          problem_solved?: string | null
          project_title?: string
          source?: string | null
          status?: string
          target_audience?: string | null
          timeline?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          admin_notes: string | null
          assigned_to: string | null
          company_name: string | null
          contacted_at: string | null
          converted_at: string | null
          created_at: string
          description: string | null
          email: string
          full_name: string | null
          id: string
          phone: string | null
          source: string | null
          status: string
          summary: Json | null
          title: string
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          admin_notes?: string | null
          assigned_to?: string | null
          company_name?: string | null
          contacted_at?: string | null
          converted_at?: string | null
          created_at?: string
          description?: string | null
          email: string
          full_name?: string | null
          id?: string
          phone?: string | null
          source?: string | null
          status?: string
          summary?: Json | null
          title: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          admin_notes?: string | null
          assigned_to?: string | null
          company_name?: string | null
          contacted_at?: string | null
          converted_at?: string | null
          created_at?: string
          description?: string | null
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          source?: string | null
          status?: string
          summary?: Json | null
          title?: string
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          link: string | null
          message: string | null
          reference_id: string | null
          reference_type: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message?: string | null
          reference_id?: string | null
          reference_type?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message?: string | null
          reference_id?: string | null
          reference_type?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      phase_activities: {
        Row: {
          activity_type: string
          author_id: string
          content: string
          created_at: string
          id: string
          is_completed: boolean
          phase_id: string
          title: string | null
          updated_at: string
          visibility: Database["public"]["Enums"]["activity_visibility"]
        }
        Insert: {
          activity_type?: string
          author_id: string
          content: string
          created_at?: string
          id?: string
          is_completed?: boolean
          phase_id: string
          title?: string | null
          updated_at?: string
          visibility?: Database["public"]["Enums"]["activity_visibility"]
        }
        Update: {
          activity_type?: string
          author_id?: string
          content?: string
          created_at?: string
          id?: string
          is_completed?: boolean
          phase_id?: string
          title?: string | null
          updated_at?: string
          visibility?: Database["public"]["Enums"]["activity_visibility"]
        }
        Relationships: [
          {
            foreignKeyName: "phase_activities_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "project_phases"
            referencedColumns: ["id"]
          },
        ]
      }
      phase_activity_attachments: {
        Row: {
          activity_id: string
          created_at: string
          description: string | null
          file_name: string
          file_path: string
          file_size: number | null
          file_type: string | null
          id: string
        }
        Insert: {
          activity_id: string
          created_at?: string
          description?: string | null
          file_name: string
          file_path: string
          file_size?: number | null
          file_type?: string | null
          id?: string
        }
        Update: {
          activity_id?: string
          created_at?: string
          description?: string | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          file_type?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "phase_activity_attachments_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "phase_activities"
            referencedColumns: ["id"]
          },
        ]
      }
      phase_templates: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_default: boolean | null
          name: string
          phases: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_default?: boolean | null
          name: string
          phases?: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_default?: boolean | null
          name?: string
          phases?: Json
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_projects: {
        Row: {
          category: string
          client_name: string | null
          content_sections: Json | null
          created_at: string
          description: string | null
          devices: string[] | null
          display_order: number | null
          duration: string | null
          gallery_images: string[] | null
          id: string
          image_url: string | null
          is_published: boolean | null
          long_description: string | null
          project_url: string | null
          tags: string[] | null
          technologies: string[] | null
          testimonial_author: string | null
          testimonial_text: string | null
          title: string
          updated_at: string
          year: string | null
        }
        Insert: {
          category: string
          client_name?: string | null
          content_sections?: Json | null
          created_at?: string
          description?: string | null
          devices?: string[] | null
          display_order?: number | null
          duration?: string | null
          gallery_images?: string[] | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          long_description?: string | null
          project_url?: string | null
          tags?: string[] | null
          technologies?: string[] | null
          testimonial_author?: string | null
          testimonial_text?: string | null
          title: string
          updated_at?: string
          year?: string | null
        }
        Update: {
          category?: string
          client_name?: string | null
          content_sections?: Json | null
          created_at?: string
          description?: string | null
          devices?: string[] | null
          display_order?: number | null
          duration?: string | null
          gallery_images?: string[] | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          long_description?: string | null
          project_url?: string | null
          tags?: string[] | null
          technologies?: string[] | null
          testimonial_author?: string | null
          testimonial_text?: string | null
          title?: string
          updated_at?: string
          year?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      project_branding: {
        Row: {
          accent_color: string | null
          assets: Json | null
          created_at: string
          favicon_url: string | null
          fonts: Json | null
          guidelines: string | null
          id: string
          logo_dark_url: string | null
          logo_url: string | null
          primary_color: string | null
          project_id: string
          secondary_color: string | null
          updated_at: string
        }
        Insert: {
          accent_color?: string | null
          assets?: Json | null
          created_at?: string
          favicon_url?: string | null
          fonts?: Json | null
          guidelines?: string | null
          id?: string
          logo_dark_url?: string | null
          logo_url?: string | null
          primary_color?: string | null
          project_id: string
          secondary_color?: string | null
          updated_at?: string
        }
        Update: {
          accent_color?: string | null
          assets?: Json | null
          created_at?: string
          favicon_url?: string | null
          fonts?: Json | null
          guidelines?: string | null
          id?: string
          logo_dark_url?: string | null
          logo_url?: string | null
          primary_color?: string | null
          project_id?: string
          secondary_color?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_branding_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_documents: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          file_path: string
          file_size: number | null
          file_type: string | null
          id: string
          name: string
          project_id: string
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          file_path: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          name: string
          project_id: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          file_path?: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          name?: string
          project_id?: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_documents_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      project_modules: {
        Row: {
          created_at: string
          enabled_at: string | null
          id: string
          is_enabled: boolean
          module_type: Database["public"]["Enums"]["module_type"]
          phase_id: string
          project_id: string
        }
        Insert: {
          created_at?: string
          enabled_at?: string | null
          id?: string
          is_enabled?: boolean
          module_type: Database["public"]["Enums"]["module_type"]
          phase_id: string
          project_id: string
        }
        Update: {
          created_at?: string
          enabled_at?: string | null
          id?: string
          is_enabled?: boolean
          module_type?: Database["public"]["Enums"]["module_type"]
          phase_id?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_modules_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "project_phases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_modules_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_phases: {
        Row: {
          completed_at: string | null
          created_at: string
          description: string | null
          display_order: number
          id: string
          name: string
          progress: number
          project_id: string
          started_at: string | null
          status: Database["public"]["Enums"]["phase_status"]
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          name: string
          progress?: number
          project_id: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["phase_status"]
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          description?: string | null
          display_order?: number
          id?: string
          name?: string
          progress?: number
          project_id?: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["phase_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_phases_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_submissions: {
        Row: {
          additional_info: string | null
          budget: string | null
          contact_preference: string | null
          created_at: string
          currently_selling: string | null
          digital_tools_details: string | null
          email: string
          full_name: string
          has_branding: string | null
          has_website: string | null
          id: string
          ideal_client: string | null
          need_ads: boolean | null
          need_automation: boolean | null
          need_branding: boolean | null
          need_coaching: boolean | null
          need_google_reviews: boolean | null
          need_sales_funnel: boolean | null
          need_strategy: boolean | null
          need_website: boolean | null
          objective: string | null
          objective_other: string | null
          phone: string | null
          project_name: string
          project_stage: string | null
          start_time: string | null
          target_audience: string | null
          uses_digital_tools: boolean | null
        }
        Insert: {
          additional_info?: string | null
          budget?: string | null
          contact_preference?: string | null
          created_at?: string
          currently_selling?: string | null
          digital_tools_details?: string | null
          email: string
          full_name: string
          has_branding?: string | null
          has_website?: string | null
          id?: string
          ideal_client?: string | null
          need_ads?: boolean | null
          need_automation?: boolean | null
          need_branding?: boolean | null
          need_coaching?: boolean | null
          need_google_reviews?: boolean | null
          need_sales_funnel?: boolean | null
          need_strategy?: boolean | null
          need_website?: boolean | null
          objective?: string | null
          objective_other?: string | null
          phone?: string | null
          project_name: string
          project_stage?: string | null
          start_time?: string | null
          target_audience?: string | null
          uses_digital_tools?: boolean | null
        }
        Update: {
          additional_info?: string | null
          budget?: string | null
          contact_preference?: string | null
          created_at?: string
          currently_selling?: string | null
          digital_tools_details?: string | null
          email?: string
          full_name?: string
          has_branding?: string | null
          has_website?: string | null
          id?: string
          ideal_client?: string | null
          need_ads?: boolean | null
          need_automation?: boolean | null
          need_branding?: boolean | null
          need_coaching?: boolean | null
          need_google_reviews?: boolean | null
          need_sales_funnel?: boolean | null
          need_strategy?: boolean | null
          need_website?: boolean | null
          objective?: string | null
          objective_other?: string | null
          phone?: string | null
          project_name?: string
          project_stage?: string | null
          start_time?: string | null
          target_audience?: string | null
          uses_digital_tools?: boolean | null
        }
        Relationships: []
      }
      project_tickets: {
        Row: {
          actual_hours: number | null
          created_at: string | null
          created_by: string | null
          description: string | null
          display_order: number | null
          due_date: string | null
          estimated_hours: number | null
          id: string
          phase_id: string | null
          pool_id: string
          priority: string | null
          project_id: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          actual_hours?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number | null
          due_date?: string | null
          estimated_hours?: number | null
          id?: string
          phase_id?: string | null
          pool_id: string
          priority?: string | null
          project_id: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          actual_hours?: number | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number | null
          due_date?: string | null
          estimated_hours?: number | null
          id?: string
          phase_id?: string | null
          pool_id?: string
          priority?: string | null
          project_id?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_tickets_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_tickets_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "project_phases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_tickets_pool_id_fkey"
            columns: ["pool_id"]
            isOneToOne: false
            referencedRelation: "skill_pools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_tickets_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_workflows: {
        Row: {
          created_at: string
          edges: Json
          id: string
          is_active: boolean
          name: string
          nodes: Json
          project_id: string
          template_id: string | null
          updated_at: string
          workflow_type: Database["public"]["Enums"]["workflow_type"]
        }
        Insert: {
          created_at?: string
          edges?: Json
          id?: string
          is_active?: boolean
          name: string
          nodes?: Json
          project_id: string
          template_id?: string | null
          updated_at?: string
          workflow_type?: Database["public"]["Enums"]["workflow_type"]
        }
        Update: {
          created_at?: string
          edges?: Json
          id?: string
          is_active?: boolean
          name?: string
          nodes?: Json
          project_id?: string
          template_id?: string | null
          updated_at?: string
          workflow_type?: Database["public"]["Enums"]["workflow_type"]
        }
        Relationships: [
          {
            foreignKeyName: "project_workflows_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_workflows_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "workflow_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          assigned_admin_id: string | null
          client_id: string
          company_id: string | null
          created_at: string
          current_phase_id: string | null
          description: string | null
          estimated_end_date: string | null
          id: string
          name: string
          proposal_url: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["project_status"]
          updated_at: string
        }
        Insert: {
          assigned_admin_id?: string | null
          client_id: string
          company_id?: string | null
          created_at?: string
          current_phase_id?: string | null
          description?: string | null
          estimated_end_date?: string | null
          id?: string
          name: string
          proposal_url?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"]
          updated_at?: string
        }
        Update: {
          assigned_admin_id?: string | null
          client_id?: string
          company_id?: string | null
          created_at?: string
          current_phase_id?: string | null
          description?: string | null
          estimated_end_date?: string | null
          id?: string
          name?: string
          proposal_url?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_assigned_admin_id_fkey"
            columns: ["assigned_admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_current_phase_fkey"
            columns: ["current_phase_id"]
            isOneToOne: false
            referencedRelation: "project_phases"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          client_address: string | null
          client_email: string | null
          client_name: string | null
          created_at: string
          id: string
          items: Json
          notes: string | null
          project_id: string
          project_title: string | null
          public_token: string | null
          quote_number: string
          status: string
          subtotal: number
          tax_amount: number
          tax_rate: number
          terms: string | null
          total: number
          updated_at: string
          valid_until: string | null
        }
        Insert: {
          client_address?: string | null
          client_email?: string | null
          client_name?: string | null
          created_at?: string
          id?: string
          items?: Json
          notes?: string | null
          project_id: string
          project_title?: string | null
          public_token?: string | null
          quote_number: string
          status?: string
          subtotal?: number
          tax_amount?: number
          tax_rate?: number
          terms?: string | null
          total?: number
          updated_at?: string
          valid_until?: string | null
        }
        Update: {
          client_address?: string | null
          client_email?: string | null
          client_name?: string | null
          created_at?: string
          id?: string
          items?: Json
          notes?: string | null
          project_id?: string
          project_title?: string | null
          public_token?: string | null
          quote_number?: string
          status?: string
          subtotal?: number
          tax_amount?: number
          tax_rate?: number
          terms?: string | null
          total?: number
          updated_at?: string
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      service_items: {
        Row: {
          category: string
          created_at: string
          default_price: number
          description: string | null
          display_order: number
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          default_price?: number
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          default_price?: number
          description?: string | null
          display_order?: number
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      skill_pools: {
        Row: {
          color: string | null
          created_at: string | null
          display_order: number | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      ticket_assignees: {
        Row: {
          assigned_at: string | null
          id: string
          ticket_id: string
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          id?: string
          ticket_id: string
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          id?: string
          ticket_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_assignees_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "project_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_assignees_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_comments: {
        Row: {
          author_id: string
          content: string
          created_at: string | null
          id: string
          ticket_id: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string | null
          id?: string
          ticket_id: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string | null
          id?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_comments_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "project_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_label_assignments: {
        Row: {
          label_id: string
          ticket_id: string
        }
        Insert: {
          label_id: string
          ticket_id: string
        }
        Update: {
          label_id?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_label_assignments_label_id_fkey"
            columns: ["label_id"]
            isOneToOne: false
            referencedRelation: "ticket_labels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_label_assignments_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "project_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_labels: {
        Row: {
          color: string
          created_at: string | null
          id: string
          name: string
          project_id: string | null
        }
        Insert: {
          color?: string
          created_at?: string | null
          id?: string
          name: string
          project_id?: string | null
        }
        Update: {
          color?: string
          created_at?: string | null
          id?: string
          name?: string
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_labels_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_time_logs: {
        Row: {
          created_at: string | null
          description: string | null
          hours: number
          id: string
          logged_at: string | null
          ticket_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          hours: number
          id?: string
          logged_at?: string | null
          ticket_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          hours?: number
          id?: string
          logged_at?: string | null
          ticket_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_time_logs_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "project_tickets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_time_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      workflow_logs: {
        Row: {
          error: string | null
          executed_at: string
          id: string
          input: Json | null
          node_id: string
          node_type: string
          output: Json | null
          status: string
          workflow_id: string
        }
        Insert: {
          error?: string | null
          executed_at?: string
          id?: string
          input?: Json | null
          node_id: string
          node_type: string
          output?: Json | null
          status: string
          workflow_id: string
        }
        Update: {
          error?: string | null
          executed_at?: string
          id?: string
          input?: Json | null
          node_id?: string
          node_type?: string
          output?: Json | null
          status?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_logs_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "project_workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_templates: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          edges: Json
          id: string
          is_active: boolean | null
          name: string
          nodes: Json
          updated_at: string
          workflow_type: Database["public"]["Enums"]["workflow_type"]
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          edges?: Json
          id?: string
          is_active?: boolean | null
          name: string
          nodes?: Json
          updated_at?: string
          workflow_type?: Database["public"]["Enums"]["workflow_type"]
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          edges?: Json
          id?: string
          is_active?: boolean | null
          name?: string
          nodes?: Json
          updated_at?: string
          workflow_type?: Database["public"]["Enums"]["workflow_type"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      activity_visibility: "internal" | "client"
      app_role: "admin" | "moderator" | "client"
      module_type: "documents" | "branding" | "messaging" | "feedback"
      phase_status: "pending" | "in_progress" | "completed"
      project_status: "draft" | "active" | "paused" | "completed" | "archived"
      workflow_type: "project_phases" | "email_automation" | "custom_process"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      activity_visibility: ["internal", "client"],
      app_role: ["admin", "moderator", "client"],
      module_type: ["documents", "branding", "messaging", "feedback"],
      phase_status: ["pending", "in_progress", "completed"],
      project_status: ["draft", "active", "paused", "completed", "archived"],
      workflow_type: ["project_phases", "email_automation", "custom_process"],
    },
  },
} as const
