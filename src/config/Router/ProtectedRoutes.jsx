import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../FirebaseConfig/FirebaseConfig'
import { useNavigate } from 'react-router-dom'


const ProtectedRoute = ({component}) => {

    //navigate user
    const navigate = useNavigate()

    //state
    const [isUser, setIsUser] = useState(false);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                 navigate('/login')
                return
            }
            setIsUser(true)
        })


    }, [])
    return (
      isUser ?
        component : <img style={{ width: '100%',
        height: '100%',
        objectFit: 'cover',}} src="https://t4.ftcdn.net/jpg/01/39/16/63/240_F_139166369_NdTDXc0lM57N66868lC66PpsaMkFSwaf.jpg" alt="" />
    );
}

export default ProtectedRoute