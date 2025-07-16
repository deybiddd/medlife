-- Create applications table
CREATE TABLE applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected')),
  reviewed_by TEXT,
  review_notes TEXT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Basic Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Professional Details
  license_number TEXT NOT NULL,
  specialization TEXT NOT NULL,
  clinic_name TEXT NOT NULL,
  years_licensed INTEGER NOT NULL,
  
  -- Experience Background
  years_experience INTEGER NOT NULL,
  current_practice_type TEXT NOT NULL,
  patients_per_month INTEGER NOT NULL,
  additional_certifications TEXT[] DEFAULT '{}',
  
  -- Partnership Preferences
  preferred_collaboration_type TEXT NOT NULL,
  availability_hours TEXT NOT NULL,
  geographic_preference TEXT NOT NULL,
  special_interests TEXT[] DEFAULT '{}'
);

-- Create documents table
CREATE TABLE documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('medical_license', 'resume', 'certification')),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_type TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_submitted_at ON applications(submitted_at);
CREATE INDEX idx_applications_email ON applications(email);
CREATE INDEX idx_documents_application_id ON documents(application_id);
CREATE INDEX idx_documents_document_type ON documents(document_type);

-- Enable Row Level Security (RLS)
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- RLS policies for applications table
-- Allow all users to insert (for application submissions)
CREATE POLICY "Allow public to insert applications" ON applications
  FOR INSERT TO anon WITH CHECK (true);

-- Allow all users to select their own applications
CREATE POLICY "Allow users to view their own applications" ON applications
  FOR SELECT TO anon USING (true);

-- Allow authenticated users (admins) to update applications
CREATE POLICY "Allow authenticated users to update applications" ON applications
  FOR UPDATE TO authenticated USING (true);

-- Allow authenticated users (admins) to view all applications
CREATE POLICY "Allow authenticated users to view all applications" ON applications
  FOR SELECT TO authenticated USING (true);

-- RLS policies for documents table
-- Allow all users to insert documents (for application submissions)
CREATE POLICY "Allow public to insert documents" ON documents
  FOR INSERT TO anon WITH CHECK (true);

-- Allow all users to select documents for their applications
CREATE POLICY "Allow users to view their own documents" ON documents
  FOR SELECT TO anon USING (true);

-- Allow authenticated users (admins) to view all documents
CREATE POLICY "Allow authenticated users to view all documents" ON documents
  FOR SELECT TO authenticated USING (true);

-- Allow authenticated users (admins) to delete documents
CREATE POLICY "Allow authenticated users to delete documents" ON documents
  FOR DELETE TO authenticated USING (true);

-- Create storage bucket for document uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);

-- Storage policies for documents bucket
-- Allow all users to upload documents
CREATE POLICY "Allow public to upload documents" ON storage.objects
  FOR INSERT TO anon WITH CHECK (bucket_id = 'documents');

-- Allow all users to view documents (for download)
CREATE POLICY "Allow public to view documents" ON storage.objects
  FOR SELECT TO anon USING (bucket_id = 'documents');

-- Allow authenticated users (admins) to view all documents
CREATE POLICY "Allow authenticated users to view all documents" ON storage.objects
  FOR SELECT TO authenticated USING (bucket_id = 'documents');

-- Allow authenticated users (admins) to delete documents
CREATE POLICY "Allow authenticated users to delete documents" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'documents');