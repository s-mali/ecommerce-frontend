import React,{ useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom'

function AdminRestricted({isAuth, role, children}) {

   if(!isAuth || role !== 'admin'){
       return <Navigate to='/login'/>
   }

  return children
}

export default AdminRestricted