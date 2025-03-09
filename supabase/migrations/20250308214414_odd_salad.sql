/*
  # Create pets table and sample data

  1. New Tables
    - `pets`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text)
      - `age` (text)
      - `location` (text)
      - `description` (text)
      - `image_url` (text)
      - `status` (text)
      - `fee` (integer)
      - `contact_info` (text)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users, nullable)

  2. Security
    - Enable RLS on `pets` table
    - Add policies for public read access
    - Add policies for authenticated users to manage their pets
*/

-- Create the pets table with nullable user_id
CREATE TABLE IF NOT EXISTS pets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  age text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  status text NOT NULL,
  fee integer NOT NULL DEFAULT 0,
  contact_info text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NULL
);

-- Enable Row Level Security
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access"
  ON pets
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to create pets"
  ON pets
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to update their own pets"
  ON pets
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to delete their own pets"
  ON pets
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert sample data without user_id
INSERT INTO pets (name, type, age, location, description, image_url, status, fee, contact_info)
VALUES
  ('Luna', 'cat', '2 years', 'New York, NY', 'Friendly calico cat, very affectionate', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'adoption', 0, 'john@example.com'),
  ('Max', 'dog', '1 year', 'Los Angeles, CA', 'Energetic golden retriever puppy', 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'adoption', 150, 'sarah@example.com'),
  ('Nemo', 'fish', '6 months', 'Miami, FL', 'Beautiful Betta fish with vibrant colors', 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'adoption', 20, 'mike@example.com'),
  ('Bella', 'dog', '4 years', 'Chicago, IL', 'Loving Labrador looking for a forever home', 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'adoption', 0, 'emma@example.com'),
  ('Charlie', 'dog', '3 years', 'Seattle, WA', 'Playful Beagle with lots of energy', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'adoption', 100, 'david@example.com'),
  ('Milo', 'cat', '1 year', 'Boston, MA', 'Gentle orange tabby cat', 'https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'adoption', 50, 'lisa@example.com'),
  ('Rocky', 'dog', '5 years', 'Denver, CO', 'Strong and friendly German Shepherd', 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'adoption', 200, 'mark@example.com'),
  ('Coco', 'cat', '6 months', 'Austin, TX', 'Playful black kitten', 'https://images.unsplash.com/photo-1548366086-7f1b76106622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'adoption', 75, 'amy@example.com'),
  ('Buddy', 'dog', '2 years', 'Portland, OR', 'Friendly Pug looking for love', 'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'adoption', 150, 'chris@example.com'),
  ('Lucy', 'cat', '3 years', 'San Diego, CA', 'Elegant Siamese cat', 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'adoption', 100, 'jessica@example.com'),
  ('Zeus', 'dog', '4 years', 'Phoenix, AZ', 'Majestic Husky with blue eyes', 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'adoption', 180, 'ryan@example.com'),
  ('Simba', 'cat', '1 year', 'Las Vegas, NV', 'Majestic Maine Coon mix', 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'adoption', 120, 'nicole@example.com'),
  ('Oscar', 'fish', '1 year', 'Atlanta, GA', 'Colorful Goldfish pair', 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'adoption', 30, 'peter@example.com'),
  ('Daisy', 'dog', '6 months', 'Nashville, TN', 'Sweet Corgi puppy', 'https://images.unsplash.com/photo-1612536057832-2ff7ead58194?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', 'adoption', 250, 'rachel@example.com');