import { auth } from '../firebase/config';

export async function getUserRoleViaRest(uid) {
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/usuarios/${uid}`;
  console.log('🔍 [REST] URL:', url);
  try {
    const user = auth.currentUser;
    if (!user) {
      console.warn('⚠️ Nenhum usuário logado.');
      return;
    }
    console.log('🔐 UID autenticado:', user.uid);
    const token = await user.getIdToken(); // importante
    console.log('🔑 Token obtido:', token);
    const res = await fetch(`${url}?key=${apiKey}`);
    console.log('📡 Resposta da API:', res.status, res.statusText);
    const data = await res.json();

    if (data.fields) {
      const role = data.fields.role?.stringValue || 'usuario';
      console.log('🔍 [REST] Role encontrado:', role);
      return role;
    } else {
      console.warn('⚠️ [REST] Documento não encontrado ou sem fields:', data);
      return 'usuario';
    }
  } catch (err) {
    console.error('🔥 Erro via REST API:', err.message);
    return 'usuario';
  }
}
