import React, { useRef, useState } from 'react';
import { TextField, Button, Box, CircularProgress } from '@mui/material';
import { auth } from '../../config/FirebaseConfig/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [loading, setLoading] = useState(false);
  const password = useRef();
  const email = useRef();
  const navigate = useNavigate()
  const Register = (event) => {
    event.preventDefault();
    setLoading(true);
    const registerEmail = email.current.value;
    const registerPassword = password.current.value;
    
    //imported from Firebase
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredential) => { 
       
        navigate('/'); 
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box sx={{ height: '80vh' }} className="d-flex justify-content-center align-item-center">
      <form onSubmit={Register} className="d-flex justify-content-center flex-column w-25 gap-3">
        <h1>Register</h1>
        <TextField id="email" inputRef={email} label="Email" variant="outlined" required />
        <TextField type='password' id="standard-basic" label="Password" variant="outlined" inputRef={password} required />
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Register'}
        </Button>
      </form>
    </Box>
  );
};
