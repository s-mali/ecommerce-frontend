import React, { useEffect, useState } from 'react'
import { AppBar, Box, Grid, IconButton, Button, Toolbar, CardMedia } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useNavigate, Link } from 'react-router-dom';

function Header() {

  const navigate = useNavigate()

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


  const logout = () => {
    sessionStorage.clear()
    navigate('/login');

  }

  return (
    <>
      <AppBar position="static" color='transparent' >
        <Toolbar>
          <Grid container>
            <Grid item xs>
              <Link to='/products'>
                <CardMedia
                  component="img"
                  title='MY APP'
                  src={'https://images.app.goo.gl/Vu29KZgYwNYfsx7x6'}
                />
              </Link>
            </Grid>

            {isAuth ? (
              role === 'user' ? (
                <Grid item >
                  <IconButton onClick={() => navigate('/wishlist')} 
                    sx={{color:'black'}}>
                    <ShoppingBagIcon />
                  </IconButton>
                  <IconButton onClick={() => navigate('/cart')}
                    sx={{color:'black'}}>
                    <ShoppingCartIcon />
                  </IconButton>
                  <IconButton onClick={() => logout()}
                    sx={{color:'black'}}>
                    <LogoutIcon />
                  </IconButton>
                </Grid>
              ) : (
                <Grid item >
                  <IconButton onClick={() => logout()}
                    sx={{color:'black'}}>
                    <LogoutIcon />
                  </IconButton>
                </Grid>
              )) :
              (<Grid item>
                <Button
                  variant="contained"
                  sx={{ background: 'black' }}>
                  Sign In
                </Button>
              </Grid>)}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header