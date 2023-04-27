import React, { useEffect, useState } from 'react'
import { AppBar, Box, Grid, IconButton, Button, Toolbar } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

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
              <img
                src={'https://pngtree.com/so/online'}
              />
            </Grid>

            {isAuth ? (
              role === 'user' ?(
                <Grid item >
                  <IconButton onClick={() => navigate('/cart')}>
                    <ShoppingCartIcon />
                  </IconButton>
                  <IconButton onClick={() => logout()}>
                    <LogoutIcon />
                  </IconButton>
                </Grid>
              ): (
              <Grid item >
                <IconButton onClick={() => logout()}>
                  <LogoutIcon />
                </IconButton>
              </Grid>
            )):
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