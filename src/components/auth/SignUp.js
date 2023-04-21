import React from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { GoogleLogin } from '@react-oauth/google';


function SignUp() {

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .max(40, 'Password must not exceed 40 characters'),
    });

    const { register, control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(validationSchema) });

    const onSubmit = (data) =>{
        let payload = {...data , role:'user'}
        axios.post('http://localhost:5000/api/v1/signup',payload).then(response =>{
            console.log(response.data);
            sessionStorage.setItem("token", response.data.accessToken)
            sessionStorage.setItem("role", response.data.user.role)
        })
    }

    const onSuccess = (response) => {
        console.log(response);
        let data = jwtDecode( response.credential)
        axios.post('http://localhost:5000/api/v1/login', data)
        .then(function (response) { 
            console.log(response);
            sessionStorage.setItem("token", response.data.accessToken)
            sessionStorage.setItem("role", response.data.user.role)
        })
        .catch(function (error) {
            console.log(error);
        });
        
    };
    
    const onError = (error) => {
        console.log(error);
    };

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
                width:500,
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            fullWidth
                            margin="dense"
                            {...register('firstName')}
                            error={errors.firstName ? true : false}
                        />
                        <Typography variant="inherit" color="textSecondary">
                            {errors.firstName?.message}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            fullWidth
                            margin="dense"
                            {...register('lastName')}
                            error={errors.lastName ? true : false}
                        />
                        <Typography variant="inherit" color="textSecondary">
                            {errors.lastName?.message}
                        </Typography>
                    </Grid>
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
                    sx={{ mt: 3, mb: 2, background: 'black' }}
                    onClick={handleSubmit(onSubmit)}
                >
                    Sign Up
                </Button>

                <Grid container>
                    <Grid item xs>
                        {/* <Link to='/'> */}
                        Forgot password?
                        {/* </Link> */}
                    </Grid>
                    <Grid item >
                    <GoogleLogin onSuccess={onSuccess} onError={onError}/>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    )
}

export default SignUp