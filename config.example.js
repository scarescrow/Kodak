import firebase from 'firebase';

var config = {
	apiKey: "<API_KEY>",
    authDomain: "<AUTH_DOMAIN>",
    databaseURL: "<DATABASE_URL>",
    projectId: "<PROJECT_ID>",
    storageBucket: "<STORAGE_BUCKET>",
    messagingSenderId: "<MESSAGING_SENDER_ID>"
}

var app = firebase.initializeApp(config);

export default app;