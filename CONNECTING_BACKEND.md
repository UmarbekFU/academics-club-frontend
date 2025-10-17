# Connecting Frontend to Backend

This guide explains how to connect the Academics Club frontend to the backend API.

## 🔗 Repository Structure

- **Frontend**: `academics-club-frontend` (This repository)
- **Backend**: `academics-club-backend` (Separate repository)

## 🚀 Quick Setup

### 1. Start the Backend Server

First, clone and start the backend:

```bash
# Clone the backend repository
git clone https://github.com/UmarbekFU/academics-club-backend.git
cd academics-club-backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:3001`

### 2. Configure the Frontend

In your frontend `.env.local` file, add:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Start the Frontend

```bash
# In the frontend directory
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🔧 API Configuration

The frontend uses a centralized API configuration file located at `src/lib/api-config.ts`.

### Usage Example

```typescript
import { API_ENDPOINTS, apiFetch } from '@/lib/api-config';

// Subscribe to newsletter
const subscribeToNewsletter = async (email: string) => {
  const response = await apiFetch(API_ENDPOINTS.newsletter.subscribe, {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
  return response;
};

// Get blog posts
const getBlogPosts = async () => {
  const response = await apiFetch(API_ENDPOINTS.blog.list);
  return response;
};
```

## 🌐 Production Deployment

### Backend Deployment

Deploy the backend to your preferred hosting service (Heroku, Railway, Render, etc.):

```env
# Backend .env (Production)
DATABASE_URL="your-production-database-url"
FRONTEND_URL="https://your-frontend-domain.com"
JWT_SECRET="your-production-jwt-secret"
NODE_ENV="production"
```

### Frontend Deployment

Update your frontend environment variables:

```env
# Frontend .env.production
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

## 🔒 CORS Configuration

The backend is already configured to accept requests from:
- `http://localhost:3000` (development)
- Your production frontend URL (configured via `FRONTEND_URL` env variable)

Make sure to update the `FRONTEND_URL` in your backend `.env` file to match your deployed frontend URL.

## 📝 Available API Endpoints

### Admin
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout  
- `GET /api/admin/applications` - Get all applications

### Applications
- `POST /api/applications` - Submit application
- `GET /api/applications/:id` - Get application by ID

### Blog
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:slug` - Get blog post by slug

### Newsletter
- `POST /api/newsletter` - Subscribe to newsletter
- `DELETE /api/newsletter?email=xxx` - Unsubscribe from newsletter

### Programs
- `GET /api/programs` - Get all programs

### Team
- `GET /api/team` - Get team members

### Health Check
- `GET /health` - Server health status

## 🐛 Troubleshooting

### CORS Errors

If you encounter CORS errors:
1. Make sure the backend is running
2. Check that `FRONTEND_URL` in backend `.env` matches your frontend URL
3. Verify the backend CORS configuration in `src/app.ts`

### Connection Refused

If you get "connection refused" errors:
1. Ensure the backend server is running on port 3001
2. Check that `NEXT_PUBLIC_API_URL` in frontend `.env.local` is correct
3. Verify no firewall is blocking the connection

### 401 Unauthorized

If you get authentication errors:
1. Check that JWT_SECRET is set in backend `.env`
2. Verify cookies are being sent (credentials: 'include')
3. Check admin credentials in backend `.env`

## 📚 Further Reading

- Backend Repository: https://github.com/UmarbekFU/academics-club-backend
- Frontend Repository: https://github.com/UmarbekFU/academics-club-frontend
