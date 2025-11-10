// Configuração Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC4pN4ZGWg7flyYBwom1V8U9vDpmCDnuf0",
  authDomain: "indus-flow-projeto.firebaseapp.com",
  databaseURL: "https://indus-flow-projeto-default-rtdb.firebaseio.com",
  projectId: "indus-flow-projeto",
  storageBucket: "indus-flow-projeto.firebasestorage.app",
  messagingSenderId: "1056978123169",
  appId: "1:1056978123169:web:db7ed773cdaf530c5773e0",
  measurementId: "G-K4JXGH05VW"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
