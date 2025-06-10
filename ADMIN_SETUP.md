# VBV Admin Panel Setup Guide

This guide will help you set up the Firebase-powered admin panel for the Version Bravo Ventures website.

## Features Implemented

### 🎨 **Kizna CMS Styling Integration**
- Glass morphism effects with backdrop blur
- Electric blue/teal gradient system
- Neon glow effects for interactive elements
- Modern dark theme with professional aesthetics

### 🔐 **Firebase Authentication**
- Email/password authentication for admin access
- Role-based access control (admin emails only)
- Secure login/logout functionality
- Admin mode toggle for authorized users

### 📊 **Content Management System**
- Team member management (CRUD operations)
- Portfolio company management
- Site content editing capabilities
- Real-time data synchronization with Firebase

### 🛠 **Admin Interface**
- Responsive admin toggle button
- Secure login modal
- Tabbed admin panel interface
- Real-time editing capabilities

## Firebase Setup Instructions

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name your project (e.g., "vbv-website")
4. Enable Google Analytics (optional)
5. Create the project

### 2. Enable Authentication
1. In your Firebase project, go to "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Add authorized admin email addresses in "Users" tab

### 3. Create Firestore Database
1. Go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location for your database
5. Create the database

### 4. Get Firebase Configuration
1. Go to "Project settings" (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" icon to add a web app
4. Register your app with a name
5. Copy the Firebase configuration object

### 5. Generate Admin SDK Key
1. Go to "Project settings" > "Service accounts"
2. Click "Generate new private key"
3. Download the JSON file
4. Extract the required values for environment variables

### 6. Environment Variables Setup
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Firebase configuration values:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   
   # Firebase Admin SDK
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
   ```

### 7. Install Dependencies
```bash
npm install firebase firebase-admin framer-motion
```

### 8. Test the Setup
1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/admin` to access the admin panel
3. Try logging in with an authorized email address

## Admin Panel Usage

### Accessing Admin Mode
1. Visit `/admin` and log in with authorized credentials
2. Once logged in, you'll see an "Admin Mode" toggle button
3. Click the toggle to enter admin mode
4. Navigate through the site to make real-time edits

### Managing Content
- **Team Members**: Add, edit, or remove team member profiles
- **Portfolio Companies**: Manage portfolio company information
- **Site Content**: Edit hero sections, program details, and other content

### Security Features
- Only emails containing `@versionbravoventures.com` are granted admin access
- All admin operations require authentication
- Real-time data validation and error handling
- Secure server-side operations with Firebase Admin SDK

## Customization

### Adding New Admin Roles
Edit `contexts/AdminContext.tsx` to modify the admin check logic:
```typescript
const isAdmin = user?.email?.includes('@versionbravoventures.com') || 
                user?.email === 'specific-admin@example.com';
```

### Styling Customization
The admin interface uses Kizna CMS styling classes defined in `styles/globals.css`:
- `.glass-effect` - Backdrop blur containers
- `.text-gradient` - Electric blue/teal gradient text
- `.neon-glow` - Glowing effects
- `.admin-btn` - Styled admin buttons
- `.admin-input` - Styled form inputs

### Adding New Content Types
1. Create new interfaces in `data/content.ts`
2. Add new Firestore collections
3. Create management components in the admin panel
4. Update the `useFirestore` hook for new data types

## Troubleshooting

### Common Issues
1. **Authentication Error**: Check environment variables and Firebase config
2. **Firestore Permission Denied**: Ensure database rules allow authenticated access
3. **Build Errors**: Verify all dependencies are installed correctly
4. **Admin Access Denied**: Check if user email matches admin criteria

### Development vs Production
- For development: Use Firebase test mode
- For production: Update Firestore security rules to restrict access
- Consider using Firebase hosting for production deployment

## Next Steps
1. Provide Firebase SDK configuration values
2. Set up authorized admin users
3. Customize admin interface based on your needs
4. Deploy to production with proper security rules