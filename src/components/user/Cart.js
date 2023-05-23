import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { Box, Grid, List, Divider, ListItem, ListItemAvatar, ListItemText, Typography, Button, ListItemButton } from '@mui/material';
import { Avatar, IconButton, CardMedia } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux'
import { getCart, removeFormCart, increaseQuantity, decreaseQuantity } from '../../redux/actions/cartAction'
import { Stack } from '@mui/joy';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { loadStripe } from "@stripe/stripe-js";
import apiInstance from '../../redux/apiInstance/api';

function Cart() {

  const cart = useSelector(state => state.cart)

  const [total, setTotal] = useState();
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getCart)
    setTotal(cart.reduce((acc, curr) => acc + Number(curr.price * curr.quantity), 0))
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

  const handleClick = async () => {
    let product = {
      name: "shopping",
      price: total,
      quantity: 1
    }
    const stripe = await loadStripe("pk_test_51N5lEpSIxhgB0CDKAmeeADPMpb2IesfYltsrURSnFghQT9JIAGUeXPifXKGT9A7hEmZgJbtDNw2rgJZDX2JO53O2005hJi6JVs");
    const response = await apiInstance.post('/create-checkout-session', { product })
    const session = await response.data;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
    }
  }

  const renderItem = () => {

    if (cart.length <= 0) {
      return (
        <Box sx={{ p: 4 }}>
          <Grid container
            alignItems='center'
            flexDirection='column'>
            <ShoppingCartOutlinedIcon />
            <Typography variant='h3'>Empty Cart!</Typography>
          </Grid>
        </Box>
      )
    }

    return (
      <Box sx={{ p: 4 }}>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Grid container
            alignItems='center'
            flexDirection='column'>
            <ShoppingCartOutlinedIcon />
            <Typography variant='h3'>My Cart</Typography>
          </Grid>
          <Divider variant="inset" />
          <List >
            {cart.map((product) => (
              <ListItem key={product._id}>
                <ListItemAvatar>
                  <Avatar alt={product.productName} src={product.productImage} sx={{ objectFit: 'cover' }} />
                </ListItemAvatar>
                <ListItemText
                  primary={product.productName}
                  secondary={
                    <>
                      {product.brand}{` — ${product.discription}`}
                    </>
                  }
                />
                <Button variant="body1" disabled={product.quantity == 1}
                  onClick={() => quantityDec(product._id)}>-</Button>
                <Typography variant="body2">{product.quantity}</Typography>
                <Button variant="body1"
                  onClick={() => quantityInc(product._id)}>+</Button>
                <Typography variant="body2">${product.price * product.quantity}</Typography>
                <IconButton item edge="end" aria-label="delete"
                  onClick={() => removeItem(product._id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Divider variant="inset" />
          <Grid container >
            <Grid item xs>
              <Button disabled={total <= 0} onClick={() => handleClick()}>Pay</Button>
            </Grid>
            <Grid item>
              <Typography>Total : ${total}</Typography>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    )

  }
  return renderItem()
}

export default Cart