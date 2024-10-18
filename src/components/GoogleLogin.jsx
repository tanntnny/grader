import React, { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyC_zHn5KINNttTBpnJt5xGoSULfGVMdHbo",
  authDomain: "grader-5d9d5.firebaseapp.com",
  projectId: "grader-5d9d5",
  storageBucket: "grader-5d9d5.appspot.com",
  messagingSenderId: "12983985644",
  appId: "1:12983985644:web:80d68971306799f9658cc9",
  measurementId: "G-2HQEFQ3N5D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

function GoogleLogin() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User Info: ', user);
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  return (
    <div>
      {user ? 
      <div className='flex'>
        <p className="text-xl">Welcome, {user.displayName}</p>
      </div> :
        <div className="font-bold text-lg text-blue-600 border-2 p-1.5 px-6 rounded-lg border-blue-400 hover:bg-blue-100">
          <button onClick={handleLogin}>Login</button>
        </div>
      }
    </div>
  );
}

export default GoogleLogin;