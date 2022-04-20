import React from 'react';
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getAnalytics } from "firebase/analytics";

firebase.initializeApp({
  apiKey: "AIzaSyA8rjHsVGGywTLajNICgSuy2pd_rklU6s4",
  authDomain: "chat-app-px.firebaseapp.com",
  projectId: "chat-app-px",
  storageBucket: "chat-app-px.appspot.com",
  messagingSenderId: "131974542331",
  appId: "1:131974542331:web:ead90e3f44c47b413c115e",
  measurementId: "G-2N8DCH8NFS"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>
    </div>
  );
}

export default App;
