-- Migration: Add active programs view
-- This file should be run after the blog views migration
-- SQLite syntax

-- View for active programs
CREATE VIEW active_programs AS
SELECT * FROM programs WHERE active = 1 ORDER BY createdAt ASC;
