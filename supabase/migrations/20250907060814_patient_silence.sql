/*
  # Create contacts table

  1. New Tables
    - `contacts`
      - `contact_id` (serial, primary key)
      - `contact_name` (text, required)
      - `contact_email` (text, unique, required)
      - `contact_mobile` (text, optional)
      - `contact_tel` (text, optional)
      - `contact_address` (text, optional)
      - `contact_postcode` (text, optional)
      - `contact_city` (text, optional)
      - `contact_country` (text, optional)
      - `contact_nationality` (text, optional)
      - `contact_nationality_id` (text, optional, for file URL)
      - `contact_type` (text, enum: consumer/institutional/corporate)
      - `user_id` (text, references auth.users)
      - `created_at` (timestamptz, default now)
      - `updated_at` (timestamptz, default now)

  2. Security
    - Enable RLS on `contacts` table
    - Add policy for authenticated users to manage their own contacts
    - Add policies for all CRUD operations

  3. Indexes
    - Index on user_id for efficient queries
    - Index on contact_email for search functionality
*/

CREATE TABLE IF NOT EXISTS contacts (
  contact_id SERIAL PRIMARY KEY,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_mobile TEXT,
  contact_tel TEXT,
  contact_address TEXT,
  contact_postcode TEXT,
  contact_city TEXT,
  contact_country TEXT,
  contact_nationality TEXT,
  contact_nationality_id TEXT,
  contact_type TEXT NOT NULL CHECK (contact_type IN ('consumer', 'institutional', 'corporate')),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create unique index on email per user (users can't have duplicate emails)
CREATE UNIQUE INDEX IF NOT EXISTS contacts_user_email_unique 
ON contacts(user_id, contact_email);

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS contacts_user_id_idx ON contacts(user_id);
CREATE INDEX IF NOT EXISTS contacts_email_idx ON contacts(contact_email);
CREATE INDEX IF NOT EXISTS contacts_name_idx ON contacts(contact_name);
CREATE INDEX IF NOT EXISTS contacts_type_idx ON contacts(contact_type);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own contacts"
  ON contacts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own contacts"
  ON contacts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own contacts"
  ON contacts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update updated_at on contact changes
DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();