-- Migration: Add monthly statistics views
-- This file should be run after the program stats migration

-- View for monthly application statistics
CREATE VIEW monthly_applications AS
SELECT 
  strftime('%Y-%m', createdAt) as month,
  COUNT(*) as count
FROM applications
GROUP BY strftime('%Y-%m', createdAt)
ORDER BY month DESC;
