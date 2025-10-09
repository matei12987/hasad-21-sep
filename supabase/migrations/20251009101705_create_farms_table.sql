/*
  # Create farms table for rooftop farm registration

  1. New Tables
    - `farms`
      - `farm_id` (uuid, primary key, auto-generated)
      - `user_id` (uuid, foreign key to auth.users, required)
      - `farm_name` (text, required) - Name of the farmer/farm owner
      - `farm_email` (text, required) - Email address
      - `farm_mobile` (text, required) - Saudi mobile number
      - `roof_area` (numeric, required) - Roof area in square meters
      - `location` (text, required) - Location/address of the rooftop
      - `housing_type` (text, required) - Type: 'rental_singles', 'rental_families', 'owned'
      - `ownership_status` (text, required) - Status: 'owned' or 'rental'
      - `roof_photo_url` (text, optional) - URL to uploaded roof photo in Supabase storage
      - `desired_crop_types` (text[], required) - Array of crop types: cucumber, tomatoes, lettuce, strawberries, leafy_greens
      - `available_budget` (numeric, required) - Available budget in SAR
      - `status` (text, default 'pending') - Farm status: pending, active, inactive
      - `created_at` (timestamptz, default now)
      - `updated_at` (timestamptz, default now)

  2. Security
    - Enable RLS on `farms` table
    - Add policies for authenticated farmers to view their own farms
    - Add policies for authenticated farmers to insert their own farms
    - Add policies for authenticated farmers to update their own farms
    - Add policies for authenticated farmers to delete their own farms

  3. Indexes
    - Index on user_id for efficient queries
    - Index on farm_name for search functionality
    - Index on status for filtering

  4. Notes
    - Only authenticated users can access their own farm data
    - Farmers can register multiple farms (e.g., multiple rooftops)
    - Budget and roof area must be positive numbers
    - All contact information is required for farm registration
*/

-- Create farms table
CREATE TABLE IF NOT EXISTS farms (
  farm_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  farm_name TEXT NOT NULL,
  farm_email TEXT NOT NULL,
  farm_mobile TEXT NOT NULL,
  roof_area NUMERIC NOT NULL CHECK (roof_area > 0),
  location TEXT NOT NULL,
  housing_type TEXT NOT NULL CHECK (housing_type IN ('rental_singles', 'rental_families', 'owned')),
  ownership_status TEXT NOT NULL CHECK (ownership_status IN ('owned', 'rental')),
  roof_photo_url TEXT,
  desired_crop_types TEXT[] NOT NULL DEFAULT '{}',
  available_budget NUMERIC NOT NULL CHECK (available_budget >= 0),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS farms_user_id_idx ON farms(user_id);
CREATE INDEX IF NOT EXISTS farms_farm_name_idx ON farms(farm_name);
CREATE INDEX IF NOT EXISTS farms_status_idx ON farms(status);

-- Enable Row Level Security
ALTER TABLE farms ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own farms
CREATE POLICY "Users can view own farms"
  ON farms
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policy: Users can insert their own farms
CREATE POLICY "Users can insert own farms"
  ON farms
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can update their own farms
CREATE POLICY "Users can update own farms"
  ON farms
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can delete their own farms
CREATE POLICY "Users can delete own farms"
  ON farms
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_farms_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on farm changes
DROP TRIGGER IF EXISTS update_farms_updated_at_trigger ON farms;
CREATE TRIGGER update_farms_updated_at_trigger
  BEFORE UPDATE ON farms
  FOR EACH ROW
  EXECUTE FUNCTION update_farms_updated_at();