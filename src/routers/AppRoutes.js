import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './privateRoutes'
import PublicRoutes from './PublicRoutes'
import Login from '../components/auth/Login'
import SignUp from '../components/auth/SignUp'
import AuthenticateRoutes from './authenticateRoutes'
const Dashboard = lazy(() => import('../components/admin/Dashboard'))
const Cart = lazy(() => import('../components/user/Cart'))
const Wishlist = lazy(() => import('../components/user/Wishlist'))
const ProductList = lazy(() => import('../components/user/ProductList'))
const ProductDetails = lazy(() => import('../components/user/ProductDetails'))
const Header = lazy(() => import('../components/Header'))
const Profile = lazy(() => import('../components/user/Profile'))


function AppRoutes() {


    return (
        // <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
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
                        path="/cart"
                        element={
                            <PrivateRoute roles={['user']}>
                                <Cart />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/wishlist"
                        element={
                            <PrivateRoute roles={['user']} >
                                <Wishlist />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/products"
                        element={
                            <PrivateRoute roles={['user']}>
                                <ProductList />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/products/:productId"
                        element={
                            <PrivateRoute roles={['user']}>
                                <ProductDetails />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute roles={['user']}>
                                <Profile/>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <PublicRoutes>
                                <Login />
                            </PublicRoutes>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <PublicRoutes >
                                <SignUp />
                            </PublicRoutes>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <AuthenticateRoutes />
                        }
                    />

                </Routes>
            </Suspense>


        // </BrowserRouter>
    )
}

export default AppRoutes