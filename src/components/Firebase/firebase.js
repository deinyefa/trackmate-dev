import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const devConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

// const prodConfig = {
// 	apiKey: process.env.REACT_APP_PROD_API_KEY,
// 	authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
// 	databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
// 	projectId: process.env.REACT_APP_PROD_PROJECT_ID,
// 	storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
// 	messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
// };

// const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

class Firebase {
	constructor() {
		app.initializeApp(devConfig);

		this.auth = app.auth();
		this.db = app.firestore();
	}

	// ********** Auth API *********
	// Sign up with email and password
	doCreateUserWithEmailAndPassword = (email, password) =>
		this.auth.createUserWithEmailAndPassword(email, password);

	// sign in with email and password
	doSignInWithEmailAndPassword = (email, password) =>
		this.auth.signInWithEmailAndPassword(email, password);

	// sign out
	doSignOut = () => this.auth.signOut();

	// reset password (if user forgot their password)
	doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

	// change password
	doPasswordUpdate = password =>
		this.auth.currentUser.updatePassword(password);
}

export default Firebase;
