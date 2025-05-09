import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDZDn5u_WRpFAHbxFeHzui6kwHQJ51qyyI",
  authDomain: "askarion-6b9a5.firebaseapp.com",
  projectId: "askarion-6b9a5",
  storageBucket: "askarion-6b9a5.firebasestorage.app",
  messagingSenderId: "400327117540",
  appId: "1:400327117540:web:91d69a318ea4ee3a483af1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);