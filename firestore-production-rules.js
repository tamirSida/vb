// PRODUCTION-READY Firestore Security Rules for VBV CMS
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to site content
    match /siteContent/{document} {
      allow read: if true;
      
      // Only allow writes from authenticated users 
      // (since you're manually adding only admins in Firebase Auth)
      allow write: if request.auth != null;
    }
    
    // Block all other collections
    match /{document=**} {
      allow read, write: if false;
    }
  }
}

/* 
DEPLOYMENT STEPS:

1. Go to Firebase Console → Firestore → Rules
2. Replace existing rules with the above
3. Click "Publish"

SECURITY FEATURES:
- Public can read site content (needed for website)
- Only authenticated users can edit (you control who gets accounts)
- All other collections blocked
- Simple and secure
- No email validation needed since you manually manage users

ADMIN USER MANAGEMENT:
- Add users manually in Firebase Console → Authentication → Users
- Only create accounts for actual admins
- They'll use the discrete admin access methods on the website
*/