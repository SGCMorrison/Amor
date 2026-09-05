// Configuración compartida de Firebase. Debe cargarse antes de comentarios y planes.
const firebaseConfig = {
  apiKey: "AIzaSyC2nV5e8r5AS1Pt5Plh5prSeHrpkiztsTE",
  authDomain: "kenia-44e6b.firebaseapp.com",
  databaseURL: "https://kenia-44e6b-default-rtdb.firebaseio.com",
  projectId: "kenia-44e6b",
  storageBucket: "kenia-44e6b.firebasestorage.app",
  messagingSenderId: "748579728416",
  appId: "1:748579728416:web:4052bc5cdbab3a0ecce045"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
