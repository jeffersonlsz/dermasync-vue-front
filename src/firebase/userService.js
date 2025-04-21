import { doc, getDoc, getDocFromCache, getDocFromServer, getDocs } from "firebase/firestore";
import { db, auth } from "./config"; // Agora importa o db corretamente


async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function testGetDoc(uid) {
    try {
        const docRef = doc(db, "usuarios", uid);
        const docSnap = await getDocFromServer(docRef);

        if (docSnap.exists()) {
            console.log("Document found:", docSnap.data());
        } else {
            console.log("Document not found");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

function withTimeout(promise, ms = 5000) {
    return Promise.race([
      promise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('⏱️ Timeout de execução excedido')), ms)
      )
    ]);
  }

export async function obterPapelUsuario(uid) {

    try {
        console.log("🔐 auth.currentUser:", auth.currentUser);
        const docRef = doc(db, "usuarios", uid);
        console.log("docRef path:", docRef.path);
        console.log("docRef id:", docRef.id);
        console.log("docRef firestore:", docRef.firestore);
        console.log("docRef firestore app name:", docRef.firestore.app.name);
        console.log("docRef firestore app options:", docRef.firestore.app.options);
        console.log("docRef firestore app options apiKey:", docRef.firestore.app.options.apiKey);
        console.log("docRef firestore app options projectId:", docRef.firestore.app.options.projectId);
        console.log("docRef firestore app options authDomain:", docRef.firestore.app.options.authDomain);
        console.log("docRef firestore app options storageBucket:", docRef.firestore.app.options.storageBucket);
        console.log("docRef firestore app options messagingSenderId:", docRef.firestore.app.options.messagingSenderId);
        console.log("⏳ Executando getDoc...");
        console.log("Current User before getDoc:", auth.currentUser); // ADDED DEBUGGING
        const docSnap = await withTimeout(getDocFromServer(docRef), 10000); // Use getDocFromServer to ensure we get the latest data
        console.log("✅ getDoc resolvido");

        if (docSnap.exists()) {
            console.log("📄 Documento encontrado:", docSnap.data());
            return docSnap.data().role || "usuario";
        } else {
            console.warn("❌ Documento não encontrado");
            return "usuario";
        }
    } catch (err) {
        console.error("🔥 ERRO REAL NO getDoc():", err); // Log the entire error object
        return "usuario";
    }

    console.log("🧪 DEBUG - userService.js REALMENTE FOI IMPORTADO dentro");
    console.log("🔍 Listando todos os documentos da coleção 'usuarios'");

    const usuariosCol = collection(db, "usuarios");
    console.log("🔐 auth.currentUser:", auth.currentUser);
    const snapshot = await getDocs(usuariosCol);

    snapshot.forEach((doc) => {
        console.log("📄 Documento encontrado:", doc.id, doc.data());
    });

    return "usuario";
}


/*export async function obterPapelUsuario(uid) {
    console.log("🧪 DEBUG - userService.js REALMENTE FOI IMPORTADO dentro");
  console.log("🛠️ Função 'obterPapelUsuario' chamada com UID:", uid);
  const docRef = doc(db, "usuarios", uid);
  console.log("⏳ Executando getDoc...");
  const docSnap = await getDoc(docRef);
  console.log("✅ getDoc resolvido!");
  if (docSnap.exists()) {
    console.log("📄 Documento encontrado:", docSnap.data());
    return docSnap.data().role || "usuario";
  } else {
    console.warn("⚠️ Documento de usuário não encontrado. Assumindo 'usuario'");
    return "usuario";
  }
} */


