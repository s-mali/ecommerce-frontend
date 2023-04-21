import React from 'react'
import { AppBar, Box, IconButton , Button, Toolbar } from '@mui/material'

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header