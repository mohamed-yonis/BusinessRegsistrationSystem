import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import App from './App.jsx'
import {createBrowserRouter, RouterProvider,BrowserRouter} from  'react-router-dom'
import Header from './pages/Header.jsx'
import AddCity from './pages/AddCity.jsx'
import AddUser from './pages/AddUser.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/login.jsx'
import PrivateRoute from './PrivateRoute.jsx'

// create browser router for routes 


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <BrowserRouter>
        <App />
      </BrowserRouter>
  </StrictMode>,
)
