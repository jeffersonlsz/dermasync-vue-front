const admin = require("firebase-admin");
const serviceAccount = require("../firebase/firebase-service-account.json"); // ajuste o caminho

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const uid = "FLELaQg3GwNcQU0R1W1ReFWUm9H3"; // UID do admin

admin.auth().getUser(uid)
  .then((userRecord) => {
    console.log("🔍 Custom claims encontrados:", userRecord.customClaims);
  })
  .catch((error) => {
    console.error("❌ Erro ao buscar usuário:", error);
  });