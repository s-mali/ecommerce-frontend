import { Box,Grid, Typography } from '@mui/material'
import React from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function PaymentFailed() {
  return (
    <Box sx={{ p: 4 }}>
      <Grid container
        alignItems='center'
        flexDirection='column'>
        <HighlightOffIcon sx={{ fontSize: "50px", color: 'red' }} />
        <Typography variant='h3'>Payment Failed!</Typography>
      </Grid>
    </Box>
  )
}

export default PaymentFailed