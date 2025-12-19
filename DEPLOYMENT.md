# Deployment Guide

## Overview
This app consists of two parts:
1. **Frontend** - React/Vite app (deployed on Vercel)
2. **Backend** - Express.js server with Socket.io (needs separate deployment)

## Backend Deployment Options

### Option 1: Railway (Recommended)
1. Go to [Railway.app](https://railway.app)
2. Create a new project
3. Connect your GitHub repository
4. Add a new service and select the `backend` folder
5. Set environment variables (see below)
6. Deploy

### Option 2: Render
1. Go to [Render.com](https://render.com)
2. Create a new Web Service
3. Connect your repository
4. Set root directory to `backend`
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Set environment variables (see below)

### Option 3: Vercel (Serverless Functions)
Note: Socket.io requires persistent connections, so Vercel serverless functions may not work well. Consider Railway or Render instead.

## Environment Variables

### Backend Environment Variables
Set these in your backend deployment platform:

```
PORT=5001
NODE_ENV=production
FRONTEND_URL=https://your-frontend-app.vercel.app
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend Environment Variables
Set these in Vercel project settings:

```
VITE_BACKEND_URL=https://your-backend-url.railway.app
```

**Important**: Replace `your-backend-url.railway.app` with your actual backend URL.

## Vercel Frontend Configuration

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add `VITE_BACKEND_URL` with your backend URL
4. Redeploy your frontend

## Testing Locally

1. Make sure backend is running on `http://localhost:5001`
2. Frontend will automatically use `http://localhost:5001` in development mode
3. No environment variables needed for local development

## Troubleshooting

### Dark Screen on Vercel
- Check browser console for errors
- Verify `VITE_BACKEND_URL` is set correctly in Vercel
- Ensure backend CORS allows your Vercel domain
- Check backend logs for connection errors

### CORS Errors
- Backend CORS is configured to allow all Vercel domains (`*.vercel.app`, `*.vercel.com`)
- If you're using a custom domain, add it to `FRONTEND_URL` environment variable

### Socket.io Connection Issues
- Socket.io requires WebSocket support
- Ensure your backend hosting supports WebSockets (Railway and Render do)
- Check that `VITE_BACKEND_URL` is set correctly

## File Structure
```
ChatApp/
├── backend/          # Express.js backend
├── frontend/         # React frontend
└── vercel.json       # Vercel configuration (frontend only)
```

