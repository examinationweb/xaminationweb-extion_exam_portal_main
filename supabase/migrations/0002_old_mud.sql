/*
  # Add profile features

  1. New Tables
    - `profile_details`
      - `id` (uuid, primary key, references profiles)
      - `address` (text)
      - `landmark` (text)
      - `alt_phone` (text)
      - `alt_email` (text)
      - `college` (text)
      - `profile_image_url` (text)
      
    - `instructor_profiles`
      - `id` (text, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `branch` (text)
      - `profile_image_url` (text)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS profile_details (
  id uuid PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  address text,
  landmark text,
  alt_phone text,
  alt_email text,
  college text,
  profile_image_url text,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS instructor_profiles (
  id text PRIMARY KEY,
  name text,
  email text,
  phone text,
  branch text,
  profile_image_url text,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profile_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructor_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile details"
  ON profile_details
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile details"
  ON profile_details
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile details"
  ON profile_details
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Anyone can read instructor profiles"
  ON instructor_profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Instructors can update own profile"
  ON instructor_profiles
  FOR ALL
  TO authenticated
  USING (id = current_setting('app.instructor_id')::text)
  WITH CHECK (id = current_setting('app.instructor_id')::text);