import React from 'react'
import axios from 'axios'
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import jwtDecode from 'jwt-decode'
import { Link, useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux'
import { logIn } from '../../redux/actions/authAction';
import apiInstance from '../../redux/apiInstance/api';

function Login() {

    const dispatch = useDispatch()

    const navigate = useNavigate()
    
    const validationSchema = Yup.object().shape({

        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .max(40, 'Password must not exceed 40 characters'),
    });

    const onSubmit = data => {

        apiInstance.post('/login', data)
            .then((response) => {
                dispatch(logIn(response.data.user))
                sessionStorage.setItem("token", response.data.accessToken)
                sessionStorage.setItem("role", response.data.user.role)
                if(response.data.user.role === 'user'){
                    navigate('/products')
                }
                else if(response.data.user.role === 'admin'){
                    navigate('/admin/dashboard')
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onSuccess = (response) => {
        console.log(response);
        let data = jwtDecode( response.credential)
        apiInstance.post('/login', data)
            .then((response) => {
                dispatch(logIn(response.data.user))
                sessionStorage.setItem("token", response.data.accessToken);
                sessionStorage.setItem("role", response.data.user.role);
                if(response.data.user.role === 'user'){
                    navigate('/products')
                }
            })
        .catch(function (error) {
            console.log(error);
        });
        
    };
    
    const onError = (error) => {
        console.log(error);
    };

    const { register, control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(validationSchema) });

    return (
        <Grid container
            direction="column"
            alignItems="center"
            justifyContent="center">
            <Box sx={{
                boxShadow: 3,
                borderRadius: 2,
                px: 4,
                py: 6,
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            margin="dense"
                            {...register('email')}
                            error={errors.email ? true : false}
                        />
                        <Typography variant="inherit" color="textSecondary">
                            {errors.email?.message}
                        </Typography>
                        
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            margin="dense"
                            {...register('password')}
                                error={errors.password ? true : false}
                            />
                        <Typography variant="inherit" color="textSecondary">
                            {errors.password?.message}
                        </Typography>
                    </Grid>

                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                    sx={{ mt: 3, mb: 2, background: 'black' }}
                >
                    Sign In
                </Button>

                <Grid container>
                    <Grid item xs>
                        {/* <Link to='/'> */}
                            Forgot password?
                        {/* </Link> */}
                    </Grid>
                    <Grid item>
                    <GoogleLogin onSuccess={onSuccess} onError={onError}/>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    )
}

export default Login