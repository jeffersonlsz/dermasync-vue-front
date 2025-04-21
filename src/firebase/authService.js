import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './config';

export function verificarUsuarioLogado(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

export async function logout() {
  await signOut(auth);
  window.location.href = '/';
}