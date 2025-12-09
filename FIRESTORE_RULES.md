# Firestore Security Rules

To enable the admin initialization and all features to work properly, you need to set up Firestore security rules in your Firebase Console.

## ⚠️ IMPORTANT: Start with Temporary Rules First

**Use the temporary rules below FIRST to allow admin initialization, then switch to secure rules.**

## Temporary Rules for Initial Setup (Use This First!)

Copy and paste these rules FIRST to allow admin initialization:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // TEMPORARY: Allow all reads and writes for authenticated users
    // ⚠️ This allows admin initialization to work
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**Steps:**
1. Go to Firebase Console → Firestore Database → Rules
2. Paste the temporary rules above
3. Click **Publish**
4. Refresh your app - admin initialization should work now
5. After admin is initialized, switch to secure rules below

## Secure Firestore Rules (Use After Admin is Initialized)

After admin initialization works, switch to these secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Helper function to get user role (with error handling)
    function getUserRole() {
      let voterData = get(/databases/$(database)/documents/voters/$(request.auth.uid)).data;
      return voterData.role == 'admin';
    }
    
    // Helper function to check if user is admin
    function isAdmin() {
      return isAuthenticated() && 
             exists(/databases/$(database)/documents/voters/$(request.auth.uid)) &&
             getUserRole();
    }
    
    // System collection (for admin initialization flag)
    match /system/{document} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated(); // Allow writes during initialization
    }
    
    // Institutions collection
    match /institutions/{institutionId} {
      allow read: if isAuthenticated();
      allow create: if isAdmin();
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }
    
    // Candidates collection
    match /candidates/{candidateId} {
      allow read: if isAuthenticated();
      allow create: if isAdmin();
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }
    
    // Elections collection
    match /elections/{electionId} {
      allow read: if isAuthenticated();
      allow create: if isAdmin();
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }
    
    // Voters collection
    match /voters/{voterId} {
      // Users can read their own data, admins can read any
      allow read: if isAuthenticated() && 
                     (request.auth.uid == voterId || 
                      (exists(/databases/$(database)/documents/voters/$(request.auth.uid)) &&
                       get(/databases/$(database)/documents/voters/$(request.auth.uid)).data.role == 'admin'));
      // Users can create their own voter record during registration
      allow create: if isAuthenticated() && request.auth.uid == voterId;
      // Users can update their own data, admins can update any
      allow update: if isAuthenticated() && 
                       (request.auth.uid == voterId || 
                        (exists(/databases/$(database)/documents/voters/$(request.auth.uid)) &&
                         get(/databases/$(database)/documents/voters/$(request.auth.uid)).data.role == 'admin'));
      // Only admins can delete voter records
      allow delete: if isAdmin();
    }
  }
}
```

## Steps to Apply Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `campuselect-9711e`
3. Navigate to **Firestore Database** → **Rules** tab
4. Paste the rules above
5. Click **Publish**

## Verify Rules Are Applied

After applying the rules:
1. Check the browser console for any permission errors
2. Try logging in with the admin credentials
3. Check Firestore console to see if collections are being created

## Troubleshooting

If you see permission errors in the console:
- Make sure you're logged in (check `request.auth != null`)
- Verify the rules are published (not just saved)
- Check that the collection names match exactly (case-sensitive)
- Ensure the user document exists in the `voters` collection before checking role

