import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'


function PublicRoutes({children}) {

    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');

    if(token && role === 'user'){
        return <Navigate to='/products'/>
    }
    else if(token && role === 'admin')
        return <Navigate to='/admin/dashboard'/>

  return children
}

export default PublicRoutes