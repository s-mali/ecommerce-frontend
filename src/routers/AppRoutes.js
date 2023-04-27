import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from '../components/admin/Dashboard'
import PublicRoutes from './PublicRoutes'
import Cart from '../components/user/Cart'
import Wishlist from '../components/user/Wishlist'
import ProductList from '../components/user/ProductList'
import ProductDetails from '../components/user/ProductDetails'
import Login from '../components/auth/Login'
import SignUp from '../components/auth/SignUp'
import Header from '../components/Header'
import PrivateRoute from './privateRoutes'

function AppRoutes() {


    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route
                    path="/admin/dashboard"
                    element={
                        <PrivateRoute roles={['admin']}>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path = "/cart"
                    element={
                        <PrivateRoute  roles={['user']}>
                            <Cart/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path = "/wishlist"
                    element={
                        <PrivateRoute roles={['user']} >
                            <Wishlist/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path = "/products"
                    element={
                        <PrivateRoute roles={['user']}>
                            <ProductList/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path = "/products/:productId"
                    element={
                        <PrivateRoute roles={['user']}>
                            <ProductDetails/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path = "/login"
                    element={
                        <PublicRoutes>                      
                            <Login/>                      
                        </PublicRoutes>
                    }
                />
                <Route
                    path = "/signup"
                    element={
                        <PublicRoutes >
                            <SignUp/>
                        </PublicRoutes>
                    }
                />
                <Route
                    path = "*"
                    element={
                        <PublicRoutes />
                    }
                />
                
            </Routes>
           
        </BrowserRouter>
    )
}

export default AppRoutes