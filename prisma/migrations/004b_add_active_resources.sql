-- Migration: Add active resources view
-- This file should be run after the active programs migration
-- SQLite syntax

-- View for active resources
CREATE VIEW active_resources AS
SELECT * FROM resources WHERE active = 1 ORDER BY downloads DESC;
