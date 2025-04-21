// Executar com: node setCustomClaim.js

const admin = require("firebase-admin");
const serviceAccount = require("./firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount) // ou use um arquivo .json da service account
});

const uid = "58DYTGCn4oMWOcZMPNRKqiYrKkT2"; // substitua pelo UID do usuário
const role = "colaborador"; // ou 'admin'

admin.auth().setCustomUserClaims(uid, { role })
  .then(() => {
    console.log(`✅ Role "${role}" definido para UID ${uid}`);
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Erro ao definir claim:", err);
    process.exit(1);
  });
