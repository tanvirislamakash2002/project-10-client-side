import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import { toast } from 'react-toastify';

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [darkMode, setDarkMode] = useState(false)
    
useEffect(() => {
  const html = document.documentElement;
  
  if (darkMode) {
    html.classList.add('dark');
    html.setAttribute('data-theme', 'dark');
  } else {
    html.classList.remove('dark');
    html.setAttribute('data-theme', 'light');
  }
  
  // Persist preference
  localStorage.setItem('theme', darkMode ? 'dark' : 'light');
}, [darkMode]);

    //register
    const createUser = ({ email, password }) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // update user 
    const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData)
    }

    //login
    const signInUser = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    //login with google
    const signInWithGoogle=()=>{
        setLoading(true)
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }

    //logOut
    const logOut = () =>{
        signOut(auth)
        .then(res=>{
            toast.success('logout successful')
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)

        })
        return () => {
            unsubscribe()
        }
    }, [])
    const authData = {
        loading,
        user,
        setUser,
        createUser,
        updateUser,
        signInUser,
        signInWithGoogle,
        logOut,
        darkMode,
        setDarkMode
    }
    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;