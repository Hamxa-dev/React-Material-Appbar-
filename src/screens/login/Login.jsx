import React, {useContext, useRef, useState } from 'react'
import { TextField, Button, Box, CircularProgress, Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/user/UserContext';


export const Login = () => {
  //use state
  const [loading, setLoading] = useState(false);

  //form value
  const email = useRef()
  const password = useRef()

  //navigate
  const navigate = useNavigate()

  const {setIsUser} = useContext(UserContext);
  //login 
  const login = (event) => {
    event.preventDefault();
   
    signInWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredential) => {
          setIsUser(true);
        navigate('/')

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    setLoading(!loading)
  }
  return (
    <>
      <Box sx={{ height: '80vh'}} className='d-flex justify-content-center  align-item-center'>
        <form onSubmit={login} className='d-flex justify-content-center flex-column  gap-3'>
        <h1  style={{fontSize:"39px"}}>Login</h1>
        <TextField id="email" inputRef={email} style={{
        border: '2px solid #284cff ',
        borderRadius: '9px',
        backgroundColor: 'ButtonHighlight',
      
      }}label="email" variant="outlined" required />
          <TextField type='password' id="standard-basic" label="Password" variant="outlined" inputRef={password} 
          style={{ 
            border: '2px solid #284cff ',
            borderRadius: '9px',
            backgroundColor: 'ButtonHighlight',
          
          }}required />
          <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Login'}
        </Button>
        </form>
      </Box>
    </>
  )
}

export default Login