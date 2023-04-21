import React, { useState, useEffect } from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'

function UserRestricted({isAuth, role, children}) {

    console.log("=====>>>",role, isAuth);

   if(!isAuth || role !== 'user'){
        return <Navigate to='/login'/>
   }

  return children
}

export default UserRestricted