let admin = require('firebase-admin');

let serviceAccount = require('../../../kai-soft-firebase-adminsdk.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://kai-soft.firebaseio.com',
});

module.exports.admin = admin;