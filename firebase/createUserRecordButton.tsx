'use client'

import { app } from './firebaseConfig';
import { getAuth } from 'firebase-admin/auth';

export default function CreateUserRecordButton(user:any) {
  function handleSignIn() {
    getAuth(app)
    .getUser(user.uid)
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
    })
    .catch((error) => {
      console.log('Error fetching user data:', error);
    });
  };

  return <button onClick={handleSignIn}>Create User Record</button>
}