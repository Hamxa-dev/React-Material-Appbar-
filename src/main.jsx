import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import React from 'react'
import './index.css'
import UserContextProvider from './context/user/UserContextProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(

  <UserContextProvider>
    <App />
  </UserContextProvider>,
)
