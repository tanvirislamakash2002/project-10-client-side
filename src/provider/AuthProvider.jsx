import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    

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
    const signIn = ({email, password})=>{
        setLoading(true)
        console.log(email, password)
        return signInWithEmailAndPassword(auth, email, password)
    }

    //login with google
    const loginWithGoogle=()=>{
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }

    //logOut
    const logOut = () =>{
        signOut(auth)
        .then(res=>{
            alert('logout successful')
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
        signIn,
        loginWithGoogle,
        logOut,
    }
    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;