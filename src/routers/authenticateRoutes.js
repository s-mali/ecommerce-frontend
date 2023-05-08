import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'

function AuthenticateRoutes() {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');

    if(token && role === 'user'){
        return <Navigate to='/products'/>
    }
    else if(token && role === 'admin')
        return <Navigate to='/admin/dashboard'/>
    
    else if(!token){
        return <Navigate to='/login' />
    }
}

export default AuthenticateRoutes