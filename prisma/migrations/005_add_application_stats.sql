-- Migration: Add statistics views
-- This file should be run after the program/resource views migration

-- View for application statistics
CREATE VIEW application_stats AS
SELECT 
  status,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM applications), 2) as percentage
FROM applications
GROUP BY status;
