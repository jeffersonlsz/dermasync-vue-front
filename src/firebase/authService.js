import { onAuthStateChanged,getAuth, signInAnonymously, signOut } from 'firebase/auth';
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

export async function autenticarAnonimamente() {
  const auth = getAuth();

  if (!auth.currentUser) {
    try {
      const cred = await signInAnonymously(auth);
      console.log("🔐 Usuário anônimo autenticado:", cred.user.uid);
    } catch (e) {
      console.error("❌ Falha na autenticação anônima:", e);
      throw e;
    }
  } else {
    console.log("🔐 Usuário já autenticado:", auth.currentUser.uid);
  }
}