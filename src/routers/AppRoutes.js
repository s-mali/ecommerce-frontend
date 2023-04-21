import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminRestricted from './AdminRestricted'
import UserRestricted from './UserRestricted'
import Dashboard from '../components/admin/Dashboard'
import PublicRoutes from './PublicRoutes'
import Cart from '../components/user/Cart'
import Wishlist from '../components/user/Wishlist'
import ProductList from '../components/user/ProductList'
import ProductDetails from '../components/user/ProductDetails'
import Login from '../components/auth/Login'
import SignUp from '../components/auth/SignUp'

function AppRoutes() {

    const [isAuth, setAuth] = useState(false)
    const [role, setRole] = useState()

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const role = sessionStorage.getItem('role');

        if (token) {
            setAuth(true)
        }
        if (role) {
            setRole(role)
        }
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/admin/dashboard"
                    element={
                        <AdminRestricted isAuth={isAuth} role={role}>
                            <Dashboard />
                        </AdminRestricted>
                    }
                />
                <Route
                    path = "/cart"
                    element={
                        <UserRestricted isAuth={isAuth} role={role}>
                            <Cart/>
                        </UserRestricted>
                    }
                />
                <Route
                    path = "/wishlist"
                    element={
                        <UserRestricted isAuth={isAuth} role={role}>
                            <Wishlist/>
                        </UserRestricted>
                    }
                />
                <Route
                    path = "/products"
                    element={
                        <UserRestricted isAuth={isAuth} role={role}>
                            <ProductList/>
                        </UserRestricted>
                    }
                />
                <Route
                    path = "/products/:productId"
                    element={
                        <UserRestricted isAuth={isAuth} role={role}>
                            <ProductDetails/>
                        </UserRestricted>
                    }
                />
                <Route
                    path = "/login"
                    element={
                        <PublicRoutes isAuth={isAuth} role={role}>
                            <Login/>
                        </PublicRoutes>
                    }
                />
                <Route
                    path = "/signup"
                    element={
                        <PublicRoutes isAuth={isAuth} role={role}>
                            <SignUp/>
                        </PublicRoutes>
                    }
                />
                
            </Routes>
           
        </BrowserRouter>
    )
}

export default AppRoutes