import React, { useRef, useState } from 'react';
import { TextField, Button, Box, CircularProgress } from '@mui/material';


export const Register = () => {
  const [loading, setLoading] = useState(false);

  const password = useRef()
  const email = useRef()

  const handleButtonClick = (event) => {
    event.preventDefault();
    setLoading(!loading);
    console.log(email.current.value);
    console.log(password.current.value);
  };

  return (
    <Box sx={{ height: '80vh' }} className="d-flex justify-content-center align-item-center">
      <form  onSubmit={handleButtonClick} className="d-flex justify-content-center flex-column w-25 gap-3">
        <h1>Register</h1>
        <TextField id="email" inputRef={email} label="Email" variant="outlined" required />
        <TextField id="password" inputRef={password} label="Password" variant="outlined" required />
        <Button type='submit'  variant="contained" disabled={loading} onSubmit={handleButtonClick}>
          {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Register'}
        </Button>
      </form>
    </Box>
  );
};
