/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import cors from "cors";
import * as functionsV1 from "firebase-functions/v1";

admin.initializeApp();
const db = admin.firestore();

if (process.env.NODE_ENV === "development") {
  db.settings({
    host: "localhost:8080",
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

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const token = authHeader.split("Bearer ")[1];

      const decodedToken = await admin.auth().verifyIdToken(token);
      const uid = decodedToken.uid;
      const data: RegistrationFormData = req.body;

      const registrationData = {
        ...data,
        uid,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      const registrationDataCleaned = cleanData(registrationData);
      console.log("Data to be saved to Firestore:", registrationDataCleaned);

      // datani firestorega saqlaymiz
      const docRef = await db
        .collection("registrations")
        .add(registrationDataCleaned);

      res
        .status(201)
        .json({ message: "Registration is successful", id: docRef.id });
      return;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";
      res.status(500).json({ message: errorMessage });
      return;
    }
  });
});

export const movePassedEvent = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      res.status(405).json({ message: "Method Not Allowed" });
      return;
    }

    try {
      const now = admin.firestore.Timestamp.now();

      // O'tib ketgan past eventsni topamiz
      const snapshot = await db
        .collection("upcomingEvents")
        .where("date", "<", now)
        .get();

      console.log(`Found ${snapshot.size} events to move`);

      if (snapshot.empty) {
        console.log("No old events found to move.");
        return;
      }

      const batch = db.batch();
      let movedCount = 0;

      for (const docSnapshot of snapshot.docs) {
        const docData = docSnapshot.data();
        //past events uchun reference yaratamiz
        const pastDocRef = db.collection("pastEvents").doc(docSnapshot.id);

        // newdataga type bilan yangi property berib eskini override qilamiz
        // pastEvents colelctionga o'tkazinb qo'yamiz
        batch.set(pastDocRef, {
          ...docData,
          type: "past",
          movedAt: admin.firestore.FieldValue.serverTimestamp(),
          originalId: docSnapshot.id,
        });
        batch.delete(docSnapshot.ref);
        movedCount++;
      }
      await batch.commit();

      res.status(200).json({
        message: `Successfully processed ${snapshot.size} events`,
        movedCount,
        timestamp: now.toDate(),
      });
    } catch (error) {
      console.error("Error in testMoveOldEvents:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";
      res.status(500).json({ message: errorMessage });
    }
    return;
  });
});

export const getTotalUserCount = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "GET") {
      res.status(405).json({ message: "Method Not Allowed" });
      return;
    }

    try {
      const userList = await admin.auth().listUsers();
      const totalUsers = userList.users.length;

      await db.collection("stats").doc("users").set({
        totalCount: totalUsers,
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
      });

      res.status(200).json({
        totalUsers,
        timeStamp: new Date().toISOString,
      });
    } catch (error) {
      console.error("Error fetching the user count: ", error);
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";
      res.status(500).json({ message: errorMessage });
    }
  });
});

// yangi account yaratilganda usr countni update qilish uchun method (create)
export const updateUserStats = functionsV1.auth.user().onCreate(() => {
  return db
    .collection("stats")
    .doc("users")
    .set(
      {
        totalCount: admin.firestore.FieldValue.increment(1),
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
});

// (delete)
export const decrementUserStats = functionsV1.auth.user().onDelete(() => {
  return db
    .collection("stats")
    .doc("users")
    .set(
      {
        totalCount: admin.firestore.FieldValue.increment(-1),
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
});


// we add this trigger in order to maintain user data synchronization
export const onUserCreated = functionsV1.auth.user().onCreate(async (user) => {
  const batch = db.batch();

  try {
    // we add the user document
    const userRef = db.collection("users").doc(user.uid);
    batch.set(userRef, {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      lastSignIn: admin.firestore.FieldValue.serverTimestamp(),
    });

    // then update the stats
    const statsRef = db.collection("stats").doc("users");
    batch.set(
      statsRef,
      {
        totalCount: admin.firestore.FieldValue.increment(1),
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    await batch.commit();
  } catch (error) {
    console.error("Error creating user document:", error);
  }
});


export const onUserDeleted = functionsV1.auth.user().onDelete(async (user) => {
  const batch = db.batch();

  try {
    // we delete the ref
    const userRef = db.collection("users").doc(user.uid);
    batch.delete(userRef);

    // then update the stats
    const statsRef = db.collection("stats").doc("users");
    batch.set(
      statsRef,
      {
        totalCount: admin.firestore.FieldValue.increment(-1),
        lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    await batch.commit();
  } catch (error) {
    console.error("Error deleting user document:", error);
  }
});
