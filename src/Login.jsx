import React from 'react';
import './Login.css';
import { Button } from '@mui/material'; // updated import
import { auth, provider } from './Firebase';
import { signInWithPopup } from "firebase/auth"; // Firebase v9 import
import { useStateValue } from './StateProvider';
import { actionTypes } from './Reducer';
import whatsAppImg from './assests/logo.png'; // Ensure this path is correct

function Login() {
  const [, dispatch] = useStateValue();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login_container">
        <img 
          src={whatsAppImg} 
          alt="WhatsApp Logo" 
        />
        <div className="login_text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button 
          variant="contained"  
          type="submit" 
          onClick={signIn}
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
