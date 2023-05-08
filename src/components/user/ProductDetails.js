import React, { useEffect, useState } from 'react';
import { Grid, Box,Typography, Button, Card, CardMedia, CardContent,CardActions,
        IconButton, Skeleton } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { fatchProductDetails , removeProduct} from '../../redux/actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addTowishlist } from '../../redux/actions/wishlistAction';
import { addToCart } from '../../redux/actions/cartAction';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    px:4,
    maxWidth:'50%',
    maxHeight:500,
    width: 'auto',
    height: 'auto',
    display: 'block',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent:'center',
      alignItems: 'center',
    },
  },
  containerGrid:{
    border : '1px solid Black',
    borderRadius : 5,
  },
  imageGrid:{
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
  },
  image: {
    height: 'auto',
    objectFit :'cover',
    display: 'block',
    maxWidth:'50%',
    maxHeight:500,
    width: 'auto',
    height: 'auto',
    objectFit:'cover'
  },
  content: {
    display: 'block',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor:'#8080806b',
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: theme.spacing(2),
    },
  },
  price: {
    marginBottom: theme.spacing(1),
  },
  brand: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  inStock: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    background: 'black',
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  wishlistButton: {
    color : 'black',
    '&:hover': {
      backgroundColor: theme.palette.secondary,
    },
  },
}));

const ProductDetails = () => {

  const classes = useStyles();

  const product = useSelector((state) => state.productDetails)

  const { productId } = useParams();

  const dispatch = useDispatch();


  useEffect(() => {

    if (productId && productId !== '') {
      dispatch(fatchProductDetails(productId))
    }
    return () => {
      dispatch(removeProduct())
    }
  }, [productId])

  const addInwishlist = () =>{
    dispatch(addTowishlist(product))
  }

  const addInCart = () =>{
    dispatch(addToCart(product))
  }

  return (
    <Box className={classes.container}>
      <Grid container spacing={2} className={classes.containerGrid}>
        <Grid item xs={12} md={6} className={classes.imageGrid}>
          {
            product.productImage 
            ? <CardMedia component="img" className={classes.image} image={product.productImage} title={product.productName} />
            :  <Skeleton variant="rectangular" width={120} height={210} />
          }
        </Grid>
        <Grid item xs={12} md={6} className={classes.content}>
          <CardContent>
            <Typography gutterBottom variant="h4" component="h2">
              {product.productName || <Skeleton/>}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              {product.discription || <Skeleton />}
            </Typography>
            <Typography variant="h6" className={classes.price}>
              {product.price ? `$${product.price}` : <Skeleton/>}
            </Typography>
            <Typography variant="h6" className={classes.brand}>
              {product.brand  || <Skeleton/>}
            </Typography>
            <Typography variant="body2" className={classes.inStock}>
              {! product.inStock ? <Skeleton/> : product.inStock> 0 ? 'In Stock' : 'Out of Stock'}
            </Typography>
          </CardContent>
          <CardActions className={classes.buttonContainer}>
            <Button sx={{background : 'black'}} onClick={() => addInCart()} variant="contained" className={classes.button}>
              Add to Cart
            </Button>
            <IconButton onClick={() => addInwishlist()} className={classes.wishlistButton}>
              <ShoppingBagIcon />
            </IconButton>
          </CardActions>
        </Grid>
      </Grid>
    </Box>

  );
};

export default ProductDetails;

