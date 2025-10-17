-- Migration: Add published blog posts view
-- This file should be run after the views migration

-- View for published blog posts with author information
CREATE VIEW published_blog_posts AS
SELECT bp.*, a.name as author_name, a.avatar as author_avatar
FROM blog_posts bp
JOIN authors a ON bp.authorId = a.id
WHERE bp.published = 1
ORDER BY bp.createdAt DESC;
