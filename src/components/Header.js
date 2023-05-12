import React, { useEffect, useState } from 'react'
import { AppBar, Box, Grid, IconButton, Button, Toolbar, CardMedia, Avatar, Menu, MenuItem } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {

  const user = useSelector(state => state.user);
  const navigate = useNavigate()
  const location = useLocation()

  const [isAuth, setAuth] = useState(false)
  const [role, setRole] = useState()
  const [anchorEl, setAnchorEl] = useState(null);
  const userImage = sessionStorage.getItem('userImage');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');

    if (token) {
      setAuth(true)
    } else {
      setAuth(false)
    }
    if (role) {
      setRole(role)
    } else {
      setRole(null)
    }
  }, [location])

  const handleButtonClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    handleClose()
    sessionStorage.clear()
    navigate('/login');

  }

  return (
    <>
      <AppBar position="static" color='transparent' >
        <Toolbar>
          <Grid container display='flex' justifyContent='space-between'>
            <Grid item >
              <Link to='/products'>
                <CardMedia
                  component="img"
                  title='MY APP'
                  sx={{ objectFit: 'cover', width: 150, height: 40, p:'4px'}}
                  src={'http://res.cloudinary.com/djtxo7fay/image/upload/v1683181339/vsn8qbrlhss4h5x9dulu.jpg'}
                />
              </Link>
            </Grid>

            {isAuth ? (
              role === 'user' ? (
                <Grid item >
                  <IconButton onClick={() => navigate('/wishlist')}
                    sx={{ color: 'black' }}>
                    <ShoppingBagIcon />
                  </IconButton>
                  <IconButton onClick={() => navigate('/cart')}
                    sx={{ color: 'black' }}>
                    <ShoppingCartIcon />
                  </IconButton>
                  <Button onClick={handleButtonClick}>
                    <Avatar src={userImage || '../Assets/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg'} />
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={()=>{ navigate('/profile'); handleClose()}}>Profile</MenuItem>
                    <MenuItem onClick={()=> logout()}>Log Out</MenuItem>
                  </Menu>
                </Grid>
              ) : (
                <Grid item >
                  <IconButton onClick={() => logout()}
                    sx={{ color: 'black' }}>
                    <LogoutIcon />
                  </IconButton>
                </Grid>
              )) :
              (<Grid item>
                {(location.pathname === '/login') ?
                  <Button onClick={() => navigate('/signup')}
                    variant="contained"
                    sx={{ background: 'black' }}>
                    Sign Up
                  </Button> :
                  <Button onClick={() => navigate('/login')}
                    variant="contained"
                    sx={{ background: 'black' }}>
                    Sign In
                  </Button>}
              </Grid>)}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header