import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Login from '../components/auth/Login'
import SignUp from '../components/auth/SignUp'

function PublicRoutes({isAuth , role , children}) {

    if(isAuth && role === 'user'){
        return <Navigate to='/products'/>
    }
    else if(isAuth && role === 'admin')
        return <Navigate to='/admin/dashboard'/>

  return children
}

export default PublicRoutes