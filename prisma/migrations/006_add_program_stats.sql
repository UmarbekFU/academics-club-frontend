-- Migration: Add program statistics view
-- This file should be run after the application stats migration

-- View for program statistics
CREATE VIEW program_stats AS
SELECT 
  program,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM applications), 2) as percentage
FROM applications
GROUP BY program;
