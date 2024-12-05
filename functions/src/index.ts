/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import cors from 'cors';

admin.initializeApp();
const db = admin.firestore();

if (process.env.NODE_ENV === 'development') {
    db.settings({
        host: 'localhost:8080',
        ssl: false,
    });
}

interface RegistrationFormData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  jobTitle: string;
  experience: string;
  notify: string;
  interestedField: string;
  hopes: string;
  additionalInfo: string;
  eventDetails: {
    title: string;
    date: string;
    eventLocation: string;
  };
}

const corsHandler = cors({ origin: true });

function cleanData(obj: any) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      value === null || value === "" ? undefined : value
    )
  );
}

export const registerEvent = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      res.status(405).json({ message: "Method Not Allowed" });
      return;
    }

    try {
        const authHeader = req.headers.authorization;
        // console.log("Authorization Header:", authHeader);
  
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          // console.log("Unauthorized: Missing or invalid Authorization header.");
          return res.status(401).json({ message: "Unauthorized" });
        }
  
        const token = authHeader.split("Bearer ")[1];
        // console.log("Received ID Token:", token);
  
        const decodedToken = await admin.auth().verifyIdToken(token);
        // console.log("Decoded Token:", decodedToken);
  
        const uid = decodedToken.uid;
        // console.log("User ID (uid):", uid);
  
        const data: RegistrationFormData = req.body;
        // console.log("Registration Data:", data);
  
        const registrationData = {
          ...data,
          uid,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        };
  
        const registrationDataCleaned = cleanData(registrationData);
        console.log("Data to be saved to Firestore:", registrationDataCleaned);
  
        // datani firestorega saqlaymiz
        const docRef = await db.collection("registrations").add(registrationDataCleaned);
        // console.log("Document saved with ID:", docRef.id);
  
        res.status(201).json({ message: "Registration is successful", id: docRef.id });
        return;
      } catch (error: any) {
        console.error("Error registering user:", error.stack || error);
        const errorMessage = error?.message || "Internal server error";
        res.status(500).json({ message: errorMessage });
        return;
      }
    });
  });