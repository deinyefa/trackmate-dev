import { auth } from './firebase';

// Sign up with email and password
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// sign in with email and password
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// sign out
export const doSignOut = () => auth.signOut();

// reset password (if user forgot their password)
export const doPasswordReset = email => auth.sendPasswordResetEmail(email);

// change password
export const doPasswordChange = password =>
  auth.currentUser.updatePassword(password);
