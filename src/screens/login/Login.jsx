import React, { useContext, useRef, useState } from 'react';
import { TextField, Button, Box, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/user/UserContext';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth  } from "../../config/FirebaseConfig/FirebaseConfig";
// Assuming you have imported your Firebase auth module somewhere

export const Login = () => {
  // Use state to manage loading state
  const [loading, setLoading] = useState(false);

  // Refs for form fields
  const emailRef = useRef();
  const passwordRef = useRef();

  // Navigate
  const navigate = useNavigate();

  // Access setIsUser from UserContext
  const { setIsUser } = useContext(UserContext);

  // Login function
  const login = (event) => {
    event.preventDefault();

    // Extract email and password from refs
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Set loading state to true during login process
    setLoading(true);

    // Perform login
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsUser(true);
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle errors here, e.g., display error message to the user
        console.error('Login error:', errorCode, errorMessage);
      })
      .finally(() => {
        // Set loading state to false after login attempt
        setLoading(false);
      });
  };

  return (
    <>
      <Box sx={{ height: '80vh' }} className='d-flex justify-content-center  align-item-center'>
        <form onSubmit={login} className='d-flex justify-content-center flex-column  gap-3'>
          <h1 style={{ fontSize: '39px' }}>Login</h1>
          <TextField
            id="email"
            inputRef={emailRef}
            style={{
              border: '2px solid #284cff',
              borderRadius: '9px',
              backgroundColor: 'ButtonHighlight',
            }}
            label="Email"
            variant="outlined"
            required
          />
          <TextField
            type='password'
            id="password"
            label="Password"
            variant="outlined"
            inputRef={passwordRef}
            style={{
              border: '2px solid #284cff',
              borderRadius: '9px',
              backgroundColor: 'ButtonHighlight',
            }}
            required
          />
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Login'}
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Login;
