"use strict";
const functions = require('firebase-functions/v1');
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.createUserDocument = functions.auth.user().onCreate((user: { uid: any; }) => {
  db.collection("users")
    .doc(user.uid)
    .set({
      friendCode: "",
      lastActive: admin.firestore.FieldValue.serverTimestamp(),
      discord: "",
      note: "",
      haveCards: [],
      wantCards: []
    });
});

export const createSendInbox = functions.auth.user().onCreate(async (user: { uid: any; }) => {
  const userRequestsDocRef = db.collection("requests").doc(user.uid);
  await userRequestsDocRef.collection("sent").doc("baka").set({});
  await userRequestsDocRef.collection("inbox").doc("baka").set({});
});