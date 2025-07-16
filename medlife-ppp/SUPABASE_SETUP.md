# Supabase Setup Instructions

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login to your account
3. Create a new project
4. Choose your organization and project name
5. Set a strong database password
6. Select a region closest to your users

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to Settings > API
2. Copy the following values:
   - Project URL (starts with `https://your-project-id.supabase.co`)
   - Public anon key (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## 3. Set Up Environment Variables

1. Copy `.env.example` to `.env.local`
2. Replace the placeholder values with your actual Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

## 4. Set Up the Database Schema

1. In your Supabase dashboard, go to the SQL Editor
2. Copy and paste the contents of `database/schema.sql`
3. Run the SQL script to create the tables and set up Row Level Security

## 5. Configure Storage

The storage bucket for documents will be automatically created when you run the schema.sql script. The bucket is configured with the following settings:

- **Bucket name**: `documents`
- **Public access**: Disabled (files require authentication to access)
- **File types**: PDF, DOC, DOCX files
- **Max file size**: 10MB per file

## 6. Test the Setup

1. Start your development server: `npm run dev`
2. The application should now connect to your Supabase database
3. Try submitting a test application to verify the database integration
4. Check the Supabase dashboard to see the data being stored

## 7. Admin Authentication (Optional)

For production use, you may want to set up proper admin authentication:

1. In Supabase dashboard, go to Authentication > Settings
2. Configure your authentication providers
3. Set up admin roles and permissions
4. Update the AdminContext to use real authentication

## Troubleshooting

- **Environment variables not loading**: Make sure your `.env.local` file is in the project root
- **Database connection issues**: Verify your Supabase URL and API key are correct
- **File upload errors**: Check that the storage bucket exists and has the correct policies
- **Permission denied errors**: Ensure Row Level Security policies are properly configured

## Development vs Production

- **Development**: Use the anon key for testing
- **Production**: Consider using service role key for admin operations and implement proper authentication