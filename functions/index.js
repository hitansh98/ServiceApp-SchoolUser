// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send('Hello from Firebase!');
// });
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
var db = admin.database();
exports.sendSchoolMessageNotif = functions.database
  .ref('/messages/{userPhone}/{grievanceId}/{serviceId}/{mId}')
  .onCreate((snapshot1, context) => {
    // const oldPlayer = change.before.val();
    const userId = context.params.userPhone;
    const griId = context.params.grievanceId;
    const serviceId = context.params.serviceId;
    const newMessage = snapshot1.val();
    let serviceGri = '';
    let serviceNameGri = '';
    if (newMessage.from !== userId) {
      const grievance = db
        .ref(`grievances/` + userId + `/` + griId)
        .once('value')
        .then(snapshot => {
          serviceGri = snapshot.val().service;
          serviceNameGri = snapshot.val().serviceName;
          return snapshot.val();
        });
      // Exit if change is caused by old player moving up in leaderboard
      // if (newPlayer.score <= oldPlayer.score) { return; }
      const payload = {
        notification: {
          title: `ScN: New Message from
  ${newMessage.from}
  about grievance ID ${griId}`,
          body: `${newMessage.message}`,
        },
        data: {
          senderPhone: `${newMessage.from}`,
          schoolNo: `${userId}`,
          grievanceId: `${griId}`,
          isGrievance: 'false',
          service: `${serviceGri}`,
          serviceName: `${serviceNameGri}`,
        },
      };

      const databaseRoot = snapshot1.ref.root;
      const snapshot = databaseRoot
        .child(`users/` + userId)
        .once('value')
        .then(snapshot => {
          const fcmToken = snapshot.val().fcmToken;
          admin.messaging().sendToDevice(fcmToken, payload);
          if (fcmToken) {
            var updates = {};
            updates[
              'grievances/' +
                serviceId +
                '/' +
                griId +
                '/' +
                'isBadgeVisibleService'
            ] = true;
            db.ref().update(updates);
          }
          return;
        });
    }
  });

exports.sendServiceMessageNotif = functions.database
  .ref('/messages/{userPhone}/{grievanceId}/{servicePhone}/{mId}')
  .onCreate((snapshot1, context) => {
    // const oldPlayer = change.before.val();
    const userId = context.params.userPhone;
    const griId = context.params.grievanceId;
    const serviceId = context.params.servicePhone;
    const newMessage = snapshot1.val();
    if (newMessage.from !== userId) {
      const grievance = db
        .ref(`grievances/` + userId + '/' + griId)
        .once('value')
        .then(snapshot => {
          return snapshot.val();
        });
      // Exit if change is caused by old player moving up in leaderboard
      // if (newPlayer.score <= oldPlayer.score) { return; }
      const schoolGri = grievance.school;
      const schoolUserNameGri = grievance.schoolUserName;
      const payload = {
        notification: {
          title: `SeN: New Message from 
${newMessage.from} 
about grievance ID ${griId}`,
          body: `${newMessage.message}`,
        },
        data: {
          senderPhone: `${newMessage.from}`,
          grievanceId: `${griId}`,
          isGrievance: 'false',
          school: `${schoolGri}`,
          schoolUserName: `${schoolUserNameGri}`,
        },
      };

      const databaseRoot = snapshot1.ref.root;
      const snapshot = databaseRoot
        .child(`schoolUser/` + userId)
        .once('value')
        .then(snapshot => {
          const fcmToken = snapshot.val().fcmToken;
          admin.messaging().sendToDevice(fcmToken, payload);
          if (fcmToken) {
            var updates = {};
            updates[
              'grievances/' + userId + '/' + griId + '/' + 'isBadgeVisible'
            ] = true;
            db.ref().update(updates);
          }
          return;
        });
    }
  });

exports.sendGrievanceNotif = functions.database
  .ref('/grievances/{userPhone}/{grievanceId}/')
  .onCreate((snapshot1, context) => {
    // const oldPlayer = change.before.val();
    const userId = context.params.userPhone;
    const griId = context.params.grievanceId;
    const newGrievance = snapshot1.val();
    // Exit if change is caused by old player moving up in leaderboard
    // if (newPlayer.score <= oldPlayer.score) { return; }
    const payload = {
      notification: {
        title: `New Grievance with ID:${griId}`,
        body: `${userId} at ${newGrievance.schoolName} has a problem with 
              ${newGrievance.itemName}! `,
      },
      data: {
        senderPhone: `${userId}`,
        grievanceId: `${griId}`,
        isGrievance: 'true',
      },
    };
    var updates = {};
    const databaseRoot = snapshot1.ref.root;
    const snapshot = databaseRoot
      .child(`users/` + newGrievance.service)
      .once('value')
      .then(snapshot => {
        const fcmToken = snapshot.val().fcmToken;
        admin.messaging().sendToDevice(fcmToken, payload);
        updates[
          'grievances/' + userId + '/' + griId + '/' + 'isBadgeVisibleService'
        ] = true;
        db.ref().update(updates);
        return;
      });
  });

exports.sendNewDialogLearning = functions.database
  .ref('/dialogLearning/{userPhone}/{grievanceId}/')
  .onCreate((snapshot1, context) => {
    // const oldPlayer = change.before.val();
    const userId = context.params.userPhone;
    const griId = context.params.grievanceId;
    // Exit if change is caused by old player moving up in leaderboard
    // if (newPlayer.score <= oldPlayer.score) { return; }
    const payload = {
      notification: {
        title: `New Grievance with ID:${griId}`,
        body: `${userId} has added a new query! `,
      },
      data: {
        senderPhone: `${userId}`,
        grievanceId: `${griId}`,
      },
    };
    const databaseRoot = snapshot1.ref.root;
    const snapshot = databaseRoot
      .child(`admin/9767427053`)
      .once('value')
      .then(snapshot => {
        const fcmToken = snapshot.val().fcmToken;
        admin.messaging().sendToDevice(fcmToken, payload);
        return;
      });
  });

exports.sendGrievanceCloseNotif = functions.database
  .ref('/grievances/{userPhone}/{grievanceId}/status')
  .onUpdate((snapshot1, context) => {
    const userId = context.params.userPhone;
    const griId = context.params.grievanceId;
    let serviceGri = '';
    let serviceNameGri = '';
    const grievance = db
      .ref(`grievances/` + userId + `/` + griId)
      .once('value')
      .then(snapshot => {
        serviceGri = snapshot.val().service;
        serviceNameGri = snapshot.val().serviceName;
        return snapshot.val();
      });
    // const oldPlayer = change.before.val();
    if (
      snapshot1.before.val() !== 'close' &&
      snapshot1.after.val() === 'close'
    ) {
      const userId = context.params.userPhone;
      const griId = context.params.grievanceId;
      // Exit if change is caused by old player moving up in leaderboard
      // if (newPlayer.score <= oldPlayer.score) { return; }
      const payload = {
        notification: {
          title: `Grievance ID ${griId} has been closed`,
          body: `Your service engineer closed the ticket. `,
        },
        data: {
          grievanceId: `${griId}`,
          isGrievance: 'false',
          service: `${serviceGri}`,
          serviceName: `${serviceNameGri}`,
        },
      };
      const databaseRoot = snapshot1.after.ref.root;
      const snapshot = databaseRoot
        .child(`schoolUser/` + userId)
        .once('value')
        .then(snapshot => {
          const fcmToken = snapshot.val().fcmToken;
          return admin.messaging().sendToDevice(fcmToken, payload);
        });
    }
    return;
  });
