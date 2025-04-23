import admin from 'firebase-admin';

process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';

if (!admin.apps.length) {
    if (process.env.NODE_ENV === 'development') {
        // Initialize without credentials for the emulator
        admin.initializeApp({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        });
    } else {
        // Initialize with credentials for production
        admin.initializeApp({
            credential: admin.credential.applicationDefault(),
        });
    }
}

const db = admin.firestore();

// In development, connect to the emulator
if (process.env.NODE_ENV === 'development') {
    db.settings({
        host: 'localhost:8080',
        ssl: false,
    });
}

export { admin, db };
