import React, { useEffect } from 'react';
import {
  Grid, Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton
} from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { fatchProductDetails , removeProduct} from '../../redux/actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addTowishlist } from '../../redux/actions/wishlistAction';


const ProductDetails = () => {

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

  return (
    <Grid container
      direction="column"
      alignItems="center"
      marginTop= "10%"
      justifyContent="center">
      <Box sx={{
        boxShadow: 3,
        borderRadius: 2,
        // px: 4,
        // py: 6,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}>
        <Grid item xs>
          <CardMedia component="img" image={'https://via.placeholder.com/500x500'}
            title={product.productName} />
        </Grid>
        <Grid item >
          <CardContent>
            <Typography gutterBottom variant="h4" component="h2">
              {product.productName}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              {product.discription}
            </Typography>
            <Typography variant="h6" color="primary" component="p">
              ${product.price}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {product.inStock > 0 ? 'In Stock' : 'Out of Stock'}
            </Typography>
            <Button
              variant="contained"
              sx = {{background : 'black' }}
            >
              Add to Cart
            </Button>
            <IconButton onClick={()=>addInwishlist()}>
              <ShoppingBagIcon/>
            </IconButton>
          </CardContent>
        </Grid>

      </Box>
    </Grid>

  );
};

export default ProductDetails;

