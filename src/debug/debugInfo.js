import { auth } from '../firebase/config';

export function mostrarPainelDebug() {
  const user = auth.currentUser;

  const dados = {
    'UID': user?.uid || '❌ Não autenticado',
    'Email': user?.email || '---',
    'Auth Provider': user?.providerId || '---',
    'Token Expirado': user?.stsTokenManager?.expirationTime
      ? new Date(user.stsTokenManager.expirationTime).toLocaleString()
      : '---',
    'Projeto Firebase': import.meta.env.VITE_FIREBASE_PROJECT_ID || '❌ Não definido',
    'Chave API': import.meta.env.VITE_FIREBASE_API_KEY?.slice(0, 10) + '...' || '❌'
  };

  console.table(dados);
}
