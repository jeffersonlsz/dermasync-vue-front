import { auth, db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export async function testarLeituraFirestore() {
  const user = auth.currentUser;
  if (!user) {
    console.warn('⚠️ Nenhum usuário autenticado.');
    return;
  }

  const uid = user.uid;
  console.log('🔐 UID autenticado:', uid);

  const docRef = doc(db, 'usuarios', uid);
  console.log('📡 Tentando ler doc:', `usuarios/${uid}`);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('✅ Documento encontrado:', docSnap.data());
    } else {
      console.warn('❌ Documento não encontrado no Firestore.');
    }
  } catch (error) {
    console.error('💥 Erro ao acessar Firestore:', error.message);
  }
}
