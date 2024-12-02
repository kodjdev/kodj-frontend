import { admin, db } from "../lib/firebaseAdmin";
import { RegistrationFormData } from "../types";

function cleanData(obj: any) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => (value === null || value === '' ? undefined : value))
  );
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    };

    // we verify the token here
    const token = authHeader.split('Bearer ')[1];

    const decodedToken = await admin.auth().verifyIdToken(token);

    // we get the user id from the token
    const uid = await decodedToken.uid;

    const data: RegistrationFormData = await request.json();

    // we prepare the data to be saved to Firestore
    const registrationData = {
      ...data,
      uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Clean the data
    const registrationDataCleaned = cleanData(registrationData);
    console.log('Data to be saved to Firestore:', registrationDataCleaned);

    // Save the data to Firestore
    const docRef = await db.collection('registrations').add(registrationDataCleaned);
    console.log('Document saved with ID:', docRef.id);

    return Response.json({ message: 'Registration is successful', id: docRef.id }, { status: 201 });

  } catch (error: any) {
    console.error('Error registering user:', error.stack || error);
    const errorMessage = error?.message || 'Internal server error';
    return Response.json({ message: errorMessage }, { status: 500 });
  }
}