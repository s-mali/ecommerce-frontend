import React from 'react'
import { SideBar } from './SideBar'
import Dashboard from './Dashboard'
import PaymentList from './PaymentList'
import { Route, Routes } from 'react-router-dom'

function AdminModule() {
    return (
        <div>
            {/* <SideBar /> */}
            <Dashboard />
        </div>
    )
}

export default AdminModule