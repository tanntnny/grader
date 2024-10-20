import React, { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';

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

const GoogleLogin = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarConfig, setSnackbarConfig] = useState({})
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user))
        setSnackbarConfig({
          message: 'Login successfully!',
          severity: 'success',
        })
        setSnackbarOpen(true)
        navigate('/')
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
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
  }

  return (
    <div>
      {user ? 
      <div className='flex items-center'>
        <p className="text-xl mr-5">Welcome, {user.displayName}</p>
        <GoogleLogout />
      </div> :
        <div className="font-bold text-lg text-blue-600 border-2 p-1.5 px-6 rounded-lg border-blue-400 hover:bg-blue-100">
          <button onClick={handleLogin}>Login</button>
        </div>
      }
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center"}}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarConfig.severity}
          className="justify-center items-center"
        >
          <p className="font-bold text-sm">{snackbarConfig.message}</p>
        </Alert>
      </Snackbar>
    </div>
  );
}

const GoogleLogout = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem('user')
      window.location.href = '/';
    } catch(err) {
      console.error('Error while signing out:', err);
    }
  }
  return (
    <div className='font-bold text-lg text-red-600 border-2 p-1.5 px-6 rounded-lg border-red-400 hover:bg-red-100'>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export { GoogleLogin } ;