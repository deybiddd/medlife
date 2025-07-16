import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY


let supabase: any = null

try {
  if (!supabaseUrl || !supabaseAnonKey) {
    
    // Create a mock client for development
    supabase = {
      from: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => Promise.resolve({ data: null, error: null }),
        delete: () => Promise.resolve({ data: null, error: null }),
      }),
      storage: {
        from: () => ({
          upload: () => Promise.resolve({ data: null, error: null }),
          download: () => Promise.resolve({ data: null, error: null }),
          listBuckets: () => Promise.resolve({ data: [], error: null }),
        }),
      },
    }
  } else {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  }
} catch (error) {
  console.error('Error creating Supabase client:', error)
  // Fallback to mock client
  supabase = {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => Promise.resolve({ data: null, error: null }),
      delete: () => Promise.resolve({ data: null, error: null }),
    }),
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: null }),
        download: () => Promise.resolve({ data: null, error: null }),
      }),
    },
  }
}

export { supabase }

// Database types
export interface Database {
  public: {
    Tables: {
      applications: {
        Row: {
          id: string
          submitted_at: string
          status: 'pending' | 'under_review' | 'approved' | 'rejected'
          reviewed_by: string | null
          review_notes: string | null
          last_updated: string
          first_name: string
          last_name: string
          email: string
          phone: string
          license_number: string
          specialization: string
          clinic_name: string
          years_licensed: number
          years_experience: number
          current_practice_type: string
          patients_per_month: number
          additional_certifications: string[]
          preferred_collaboration_type: string
          availability_hours: string
          geographic_preference: string
          special_interests: string[]
        }
        Insert: {
          id?: string
          submitted_at?: string
          status?: 'pending' | 'under_review' | 'approved' | 'rejected'
          reviewed_by?: string | null
          review_notes?: string | null
          last_updated?: string
          first_name: string
          last_name: string
          email: string
          phone: string
          license_number: string
          specialization: string
          clinic_name: string
          years_licensed: number
          years_experience: number
          current_practice_type: string
          patients_per_month: number
          additional_certifications?: string[]
          preferred_collaboration_type: string
          availability_hours: string
          geographic_preference: string
          special_interests?: string[]
        }
        Update: {
          id?: string
          submitted_at?: string
          status?: 'pending' | 'under_review' | 'approved' | 'rejected'
          reviewed_by?: string | null
          review_notes?: string | null
          last_updated?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          license_number?: string
          specialization?: string
          clinic_name?: string
          years_licensed?: number
          years_experience?: number
          current_practice_type?: string
          patients_per_month?: number
          additional_certifications?: string[]
          preferred_collaboration_type?: string
          availability_hours?: string
          geographic_preference?: string
          special_interests?: string[]
        }
      }
      documents: {
        Row: {
          id: string
          application_id: string
          document_type: 'medical_license' | 'resume' | 'certification'
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          uploaded_at: string
        }
        Insert: {
          id?: string
          application_id: string
          document_type: 'medical_license' | 'resume' | 'certification'
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          uploaded_at?: string
        }
        Update: {
          id?: string
          application_id?: string
          document_type?: 'medical_license' | 'resume' | 'certification'
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          uploaded_at?: string
        }
      }
    }
  }
}