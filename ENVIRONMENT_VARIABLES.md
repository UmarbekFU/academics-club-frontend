# Environment Variables

This document describes all the environment variables used in The Academics Club application.

## Required Variables

### Database
- `DATABASE_URL`: SQLite database file path (e.g., `file:./dev.db`)

### Authentication
- `NEXTAUTH_SECRET`: Secret key for JWT token generation (generate with `openssl rand -base64 32`)
- `NEXTAUTH_URL`: Base URL of your application (e.g., `http://localhost:3000`)

### Email Configuration
- `SMTP_HOST`: SMTP server hostname (e.g., `smtp.gmail.com`)
- `SMTP_PORT`: SMTP server port (e.g., `587`)
- `SMTP_SECURE`: Whether to use SSL/TLS (`true` or `false`)
- `SMTP_USER`: SMTP username/email
- `SMTP_PASS`: SMTP password or app password
- `SMTP_FROM`: From email address (defaults to SMTP_USER if not set)
- `ADMIN_EMAIL`: Admin notification email address

### Redis (Optional)
- `REDIS_URL`: Redis connection URL for caching and rate limiting

## Development Variables

### Testing
- `TEST_DATABASE_URL`: Test database file path (e.g., `file:./test.db`)

### Development
- `NODE_ENV`: Environment mode (`development`, `production`, `test`)

## Production Variables

### Security
- `ADMIN_USERNAME`: Default admin username
- `ADMIN_PASSWORD`: Default admin password (should be changed after first login)
- `ADMIN_EMAIL`: Default admin email

### Analytics
- `GOOGLE_ANALYTICS_ID`: Google Analytics tracking ID

### File Uploads
- `UPLOAD_MAX_SIZE`: Maximum file upload size in bytes (default: 10MB)
- `UPLOAD_ALLOWED_TYPES`: Comma-separated list of allowed file types

### Rate Limiting
- `RATE_LIMIT_MAX`: Maximum number of requests per window (default: 100)
- `RATE_LIMIT_WINDOW`: Time window in milliseconds (default: 900000 = 15 minutes)

### CSRF Protection
- `CSRF_SECRET`: Secret key for CSRF token generation (should be different from NEXTAUTH_SECRET)

### Newsletter
- `NEWSLETTER_API_KEY`: API key for newsletter service (if using external service)

## Example .env.local

```bash
# Database
DATABASE_URL="file:./dev.db"

# Authentication
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Email (Gmail example)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="your-email@gmail.com"
ADMIN_EMAIL="admin@yourdomain.com"

# Redis (optional)
REDIS_URL="redis://localhost:6379"

# Development
NODE_ENV="development"

# Testing
TEST_DATABASE_URL="file:./test.db"
```

## Example .env.production

```bash
# Database
DATABASE_URL="file:./production.db"

# Authentication
NEXTAUTH_SECRET="your-production-secret-key"
NEXTAUTH_URL="https://yourdomain.com"

# Email
SMTP_HOST="smtp.yourdomain.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="noreply@yourdomain.com"
SMTP_PASS="your-production-password"
SMTP_FROM="noreply@yourdomain.com"
ADMIN_EMAIL="admin@yourdomain.com"

# Redis
REDIS_URL="redis://your-redis-server:6379"

# Production
NODE_ENV="production"

# Analytics
GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"

# Security
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="secure-password"
ADMIN_EMAIL="admin@yourdomain.com"
```

## Security Notes

1. **Never commit `.env` files to version control**
2. **Use strong, unique secrets for production**
3. **Rotate secrets regularly**
4. **Use environment-specific values**
5. **Consider using a secrets management service for production**

## Setup Instructions

1. Copy `.env.example` to `.env.local`
2. Fill in the required variables
3. For email functionality, set up SMTP credentials
4. For production, use a proper database and Redis instance
5. Generate a strong secret for `NEXTAUTH_SECRET`
6. Test all functionality before deploying
