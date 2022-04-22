import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
//import { getAnalytics } from "firebase/analytics";
import { async } from '@firebase/util';

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
//const analytics = firebase.analytics();

function App() {


  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>ChatItUp</h1>
        <SignOut />
      </header>

      <section >
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}

function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p class="guideline-text">Do not Violate community guidlines or you will be banned for life!</p>
    </>
  )

}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit();

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth'});
  }

  return (
    <>
      <main>

        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

        <span class='dummy-span' ref={dummy}></span>

      </main>

      <form onSubmit={sendMessage}>

        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Say something nice" />

        <button type="submit" disabled={!formValue}>SEND</button>
      </form>
    </>)
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img alt="avatar" src={photoURL || 'public/white_basic_avatar.png'} />
      <p>{text}</p>
    </div>
  </>)
}

export default App;
