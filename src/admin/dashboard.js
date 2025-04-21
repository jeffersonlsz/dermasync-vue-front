import { auth } from '../firebase/config';

window.logout = async () => {
  await auth.signOut();
  window.location.href = '/';
};