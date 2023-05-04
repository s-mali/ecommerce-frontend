import { Grid, List, ListItem, ListItemText, Typography, Card, CardMedia, CardContent } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

function Product() {

  const navigate = useNavigate()

  const products = useSelector((state)=>state.allProducts.products)

  const navigateToDetails = (id) =>{
    navigate(`/products/${id}`)
  }

  return (
    <Grid container 
    spacing={2} py={2}
    justifyContent = 'center'
    width='half'
    >
    {products.map(product => (
      <Grid item onClick ={()=>{navigateToDetails(product._id)}}
        xs={12} sm={6} md={2} key={product._id}
        alignItems = 'center'
        >
        <Card sx={{ height: '100%' }}>
          <CardMedia
            component="img"
            height="200"
            image={product.productImage}
            alt={product.productName}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {product.productName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.discription}
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary={`Price: $${product.price}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`In Stock: ${product.inStock}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Brand: ${product.brand}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Category: ${product.category}`} />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
  )
}

export default Product