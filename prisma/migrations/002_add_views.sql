-- Migration: Add database views for common queries
-- This file should be run after the indexes migration
-- SQLite syntax

-- View for active team members
CREATE VIEW active_team_members AS
SELECT * FROM team_members WHERE active = 1 ORDER BY "order" ASC;
