-- Migration: Add monthly newsletter statistics view
-- This file should be run after the monthly applications migration

-- View for monthly newsletter signup statistics
CREATE VIEW monthly_newsletter_signups AS
SELECT 
  strftime('%Y-%m', createdAt) as month,
  COUNT(*) as count
FROM newsletter
GROUP BY strftime('%Y-%m', createdAt)
ORDER BY month DESC;
