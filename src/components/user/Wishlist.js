import {
  Grid, Box, Typography, Paper, CardMedia, Button, Avatar, Skeleton,
  Table, TableContainer, TableHead, TableRow, TableBody, TableCell,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import { useSelector, useDispatch } from 'react-redux'
import { getWishList, removeFromWishlist } from '../../redux/actions/wishlistAction'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Stack } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';
import { addToCart } from '../../redux/actions/cartAction';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container : {
    '&:hover': {
      cursor : 'pointer'
    },
  }
 }))

function Wishlist() {

  const classes = useStyles()
  const [isWaiting , setWaiting] = useState(true)

  const wishList = useSelector(state => state.wishList)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getWishList())
      .then(() => setWaiting(false))
      .catch(() => setWaiting(false))
  }, [])

  const deleteFromWishlist = (id) => {
    dispatch(removeFromWishlist(id))
  }

  const addInCart = (product) => {
    dispatch(addToCart(product))
  }

  return (
    <>{ !isWaiting ?

      ( wishList.length > 0 ?
        (<Box sx={{
          px: 4,
          py: 4,
          alignItems: 'center'
        }}>
          <Stack spacing={2}>
            <Grid container
              alignItems='center'
              flexDirection='column'>
              <FavoriteBorderIcon variant='h1' />
              <Typography variant='h3'>My Wishlist</Typography>
            </Grid>
            <TableContainer >
              <Table sx={{ minWidth: 100 }} size="large" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="left">Product Name</TableCell>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="left">In Stock</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                  {wishList.map((product, index) => (
                    <TableRow
                      key={product._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="left">
                        <IconButton onClick={() => deleteFromWishlist(product._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell >
                      <TableCell align="right">
                        <Link to={`/products/${product._id}`}>
                        <CardMedia
                          alt={product.productName}
                          image={product.productImage}
                          sx={{ width: 60, height: 60 }}
                        />
                        </Link>
                      </TableCell>
                      <TableCell align="left">{product.productName}</TableCell>
                      <TableCell align="left">${product.price}</TableCell>
                      <TableCell align="left">{product.inStock}</TableCell>
                      <TableCell align="center">
                        <Button onClick={()=> addInCart(product)}
                          variant="contained"
                          sx={{
                            background: 'black',
                            borderRadius: 5
                          }}
                        >
                          Add to Cart
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>

        </Box>) :
        (
          <Box sx={{
            px: 4,
            py: 4,
            alignItems: 'center'
          }}>
            <Grid container
              alignItems='center'
              flexDirection='column'>
              <FavoriteBorderIcon variant='h1' />
              <Typography variant='h3'>Your Wishlist Is Empty</Typography>
            </Grid>
          </Box>
        ))


          
        :(
          isWaiting &&
          <Box sx={{
            px: 4,
            py: 4,
            alignItems: 'center'
          }}>
            <Stack spacing={2}>
              <Grid container 
              alignItems='center'
              flexDirection='column'>
              <Typography variant='h6'><Skeleton width={300}/></Typography>
              <Typography variant='h3'><Skeleton width={300}/></Typography>
              </Grid>
              <TableContainer >
                <Table sx={{ minWidth: 100 }} size="large" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell align="left">Product Name</TableCell>
                      <TableCell align="left">Price</TableCell>
                      <TableCell align="left">In Stock</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody >
                    {[1,2,3,4,5].map((product, index) => (
                      <TableRow
                        key={product._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="left">
                        <Skeleton variant="circular" width={40} height={40} />
                        </TableCell >
                        <TableCell align="right">
                          <Skeleton variant="rectangular" width={60} height={60} />
                        </TableCell>
                        <TableCell align="left"><Skeleton/></TableCell>
                        <TableCell align="left"><Skeleton/></TableCell>
                        <TableCell align="left"><Skeleton/></TableCell>
                        <TableCell align="center">
                        <Skeleton variant="rounded" width={100} height={60} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Box>
        )}

    </>
  )
}

export default Wishlist