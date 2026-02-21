import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import { toast } from 'react-toastify';
import useJwtToken from '../../hooks/auth/useJwtToken';

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
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    //login with google
    const signInWithGoogle = () => {
        setLoading(true)
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }

    //logOut
    const logOut = () => {
        signOut(auth)
            .then(res => {
                toast.success('logout successful')
            })
    }
    const { mutate: fetchJwtToken } = useJwtToken()
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
            if (currentUser?.email && localStorage.getItem('token')) {
                // console.log('provider', currentUser.email);
                fetchJwtToken(currentUser.email)
            } else if (!currentUser) {
                localStorage.removeItem('token')
            }

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