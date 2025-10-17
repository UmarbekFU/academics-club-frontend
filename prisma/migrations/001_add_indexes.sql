-- Migration: Add database indexes for better performance
-- This file should be run after the initial schema setup
-- SQLite syntax

-- Indexes for applications table
CREATE INDEX idx_applications_email ON applications(email);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_program ON applications(program);
CREATE INDEX idx_applications_created_at ON applications(createdAt);

-- Indexes for blog_posts table
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX idx_blog_posts_author_id ON blog_posts(authorId);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(createdAt);
CREATE INDEX idx_blog_posts_tags ON blog_posts(tags);

-- Indexes for authors table
CREATE INDEX idx_authors_email ON authors(email);

-- Indexes for admins table
CREATE INDEX idx_admins_username ON admins(username);
CREATE INDEX idx_admins_email ON admins(email);

-- Indexes for team_members table
CREATE INDEX idx_team_members_active ON team_members(active);
CREATE INDEX idx_team_members_order ON team_members("order");
CREATE INDEX idx_team_members_email ON team_members(email);

-- Indexes for programs table
CREATE INDEX idx_programs_slug ON programs(slug);
CREATE INDEX idx_programs_active ON programs(active);

-- Indexes for newsletter table
CREATE INDEX idx_newsletter_email ON newsletter(email);
CREATE INDEX idx_newsletter_active ON newsletter(active);
CREATE INDEX idx_newsletter_created_at ON newsletter(createdAt);

-- Indexes for resources table
CREATE INDEX idx_resources_title ON resources(title);
CREATE INDEX idx_resources_type ON resources(type);
CREATE INDEX idx_resources_active ON resources(active);
CREATE INDEX idx_resources_downloads ON resources(downloads);
