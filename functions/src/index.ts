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
      haveCards: [],
      wantCards: []
    });
});