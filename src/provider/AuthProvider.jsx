import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { createContext } from 'react';
import { auth } from '../firebase/firebase.config';

export const AuthContext = createContext()
const AuthProvider = ({children}) => {

    //register
    const createUser = ({email, password}) =>{
        // setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // update user 
    const updateUser = (updatedData)=>{
        return updateProfile(auth.currentUser, updatedData)
    }

        const authData={
        createUser,
        updateUser
    }
    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;