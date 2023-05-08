import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { Box, Grid, List, Divider, ListItem, ListItemAvatar, ListItemText, Typography, Button } from '@mui/material';
import { Avatar, IconButton, CardMedia } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux'
import { getCart, removeFormCart , increaseQuantity, decreaseQuantity} from '../../redux/actions/cartAction'
import { Stack } from '@mui/joy';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

function Cart() {

  const cart = useSelector(state => state.cart)

  const [total, setTotal] = useState();

  const dispatch = useDispatch()

  console.log(cart)

  useEffect(() => {
    dispatch(getCart)
    setTotal(cart.reduce((acc, curr)=> acc+ Number(curr.price * curr.quantity),0))
  }, [cart])

  const quantityInc = (productId) => {
    dispatch(increaseQuantity(productId))
  }

  const quantityDec = (productId) => {
    dispatch(decreaseQuantity(productId))
  }

  const removeItem = (productId) => {
    dispatch(removeFormCart(productId))
  }

  return (
    <Box sx={{
      px: 4,
      py: 4,
      display: 'flex',
      justifyContent: 'center'
    }}>
      <Stack spacing={2}>
        <Grid container
          alignItems='center'
          flexDirection='column'>
          <ShoppingCartOutlinedIcon />
          <Typography variant='h3'>My Cart</Typography>
        </Grid>
        <Divider variant="inset" />
        <List sx={{ width: "100%" }}>
          {cart.map((product) => (
            <ListItem key={product._id}>
                <ListItemAvatar>
                  <Avatar alt={product.productName} src={product.productImage} sx={{ objectFit: 'cover' }} />
                </ListItemAvatar>
                <ListItemText
                  primary={product.productName}
                  secondary={
                    <>
                      <Typography variant="body2" sx={{ display: 'inline' }}>
                        {product.brand}
                      </Typography>
                      {` — ${product.discription}`}
                    </>
                  }
                />
                <Box  sx={{ display: 'flex', flexDirection: 'row' }}
                  alignItems='center'
                  flexDirection='row'>
                  <Button variant="body1" disabled={product.quantity == 1}
                    onClick={()=> quantityDec(product._id)}>-</Button>
                  <Typography variant="body2">{product.quantity}</Typography>
                  <Button variant="body1"
                    onClick={()=> quantityInc(product._id)}>+</Button>
                </Box>
                  <Typography variant="body2">${product.price * product.quantity}</Typography>
                <IconButton item edge="end" aria-label="delete"
                       onClick={()=> removeItem(product._id)}>
                  <DeleteIcon />
                </IconButton>
            </ListItem>
          ))}
        </List>
        <Divider variant="inset" />
        <Grid container >
            <Grid item xs>
              <Typography></Typography>            
            </Grid>
            <Grid item>
              <Typography>Total : ${total}</Typography>
            </Grid>
          </Grid>
      </Stack>
    </Box>
  )
}

export default Cart