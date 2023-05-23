import React from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box ,Grid,Typography} from '@mui/material';

function PaymentSucess() {
    return (
        <Box sx={{ p: 4 }}>
            <Grid container
                alignItems='center'
                flexDirection='column'>
                <CheckCircleOutlineIcon sx={{fontSize : "50px", color:'green'}}/>
                <Typography variant='h3'>Payment Sucessfull</Typography>
            </Grid>
        </Box>
    )
}

export default PaymentSucess