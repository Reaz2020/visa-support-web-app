

import { auth } from '../firebase.config';
import { createContext} from 'react';

export const AuthContext = createContext(null);

 import {  onAuthStateChanged,signOut,signInWithEmailAndPassword,createUserWithEmailAndPassword,
  signInWithPopup } from "firebase/auth";

 import { useState } from 'react';
 import { useEffect } from 'react';
 import { GoogleAuthProvider } from "firebase/auth";
 import { GithubAuthProvider } from "firebase/auth";





const Network = ({children}) => {

const [user, setUser]=useState(null);
const [loading, setLoading]=useState(true);

const provider = new GoogleAuthProvider();
const gitProvider = new GithubAuthProvider();




function createUser (email,password){
   return createUserWithEmailAndPassword(auth,email,password)
}
//sign in
function SignInUser (email,password){
  return  signInWithEmailAndPassword(auth, email, password)

}


//observer 

useEffect(() => {
    // Subscribe to the onAuthStateChanged listener
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {

        console.log('current user : - ',currentUser)
        setUser(currentUser); // Set the user when logged in
        setLoading(false)
     
 
    });

    // Cleanup the listener on component unmount
    return () => unSubscribe();

  },[]); // Empty dependency array ensures this effect onl

function handleGoogleSignIn(){
  return  signInWithPopup(auth, provider)

}

//sign in with github 

function handleGitSignIn(){
    signInWithPopup(auth, gitProvider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
  
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
    });}
//sign out 

function signOutUser(){
    return  signOut(auth);
  }
//adding to props list
  const authInfo={

    createUser,user,loading,SignInUser ,
    signOutUser,setUser,handleGoogleSignIn,handleGitSignIn


 }

    return ( 
    
    <AuthContext.Provider value={authInfo }>

        {children}

    </AuthContext.Provider>  
    
);
}
 
export default Network;