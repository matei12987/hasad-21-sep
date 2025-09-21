/*
  # Add ticket_raised column to contacts table

  1. Changes
    - Add `ticket_raised` boolean column to contacts table
    - Set default value to false
    - Add index for performance

  2. Security
    - No changes to RLS policies needed as this uses existing contact access patterns
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contacts' AND column_name = 'ticket_raised'
  ) THEN
    ALTER TABLE contacts ADD COLUMN ticket_raised BOOLEAN DEFAULT false;
  END IF;
END $$;

-- Add index for performance when querying tickets
CREATE INDEX IF NOT EXISTS contacts_ticket_raised_idx ON contacts (ticket_raised) WHERE ticket_raised = true;