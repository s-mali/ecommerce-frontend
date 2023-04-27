import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
  Box, Button, Grid, Paper, TextField, Typography, Modal, MenuItem,
  Table, TableContainer, TableHead, TableRow, TableBody, TableCell,
  Dialog, DialogTitle, DialogContent, DialogActions, Pagination
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import { Stack, Textarea } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import apiInstance from '../../redux/apiInstance/api';
import CloseIcon from '@mui/icons-material/Close';

const categories = [
  { value: "Electronics", label: "Electronics" },
  { value: "Clothing", label: "Clothing" },
  { value: "Food", label: "Food" },
  { value: "Sports", label: "Sports" },
  { value: "Accesories", label: "Accesories" }
];


const validationSchema = yup.object().shape({
  productName: yup.string().required("Product Name is required"),
  brand: yup.string().required("Brand is required"),
  category: yup.string().required("category is required"),
  price: yup.number().required("Price is required").positive().integer("Price must be positive Number"),
  inStock: yup.number().positive().integer().required("Number of in stock is required"),
  discription: yup.string().required("Discription is Required"),
});


function Dashboard() {

  const { handleSubmit, reset, control, formState: { errors } } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const [products, setProducts] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const [isUpdating, setUpdate] = useState(false)
  const [totalPage, setTotalPage] = useState(1)

  useEffect(() => {
    apiInstance.get(`/getProducts?page=${pageNo}&limit=${10}`).then((response) => {
      setProducts(response.data.products)
      let pageCount = Math.ceil((response.data.total)/10)
      setTotalPage(pageCount)
    })
  }, [pageNo]);

  const [open, setOpen] = useState(false);
  const [deleteModel , setDeleteModel] = useState(false)
  const [deleteProdId , setDeleteProdId] = useState('');
  const handleOpen = () => { reset({}); setOpen(true) };

  const handleClose = () => {
    setOpen(false);
    setUpdate(false)
    setDeleteModel(false)
    reset()
  };


  const deleteModelOpen = (id) => {
    setDeleteModel(true)
    setDeleteProdId(id)
  }

  const onSubmit = (data) => {
    handleClose()
    apiInstance.post(`/addProduct`, data).then((response) => {
      products.pop()
      setProducts([response.data.product, ...products])
    })
  }

  const handleUpdate = (productId) => {
    setOpen(true);
    let updatingProduct = products.filter((c) => c._id === productId)
    reset(updatingProduct[0])
  }

  const updateProduct = (data) => {
    handleClose()
    apiInstance.post(`/updateProduct/${data._id}`, data).then((response) => {
      const index = products.findIndex(product => product._id === response.data._id)
      const newProducts = [...products]
      newProducts[index] = { ...response.data }
      setProducts(newProducts);
    })
  }

  const handlePageChange = (event, value) => {
    setPageNo(value);
  }

  const deleteProduct = (productId) => {
    handleClose()
    apiInstance.get(`/deleteProduct/${productId}`).then((response) => {
      setProducts(products.filter((c) => c._id !== productId));
    })
  }

  return (
    <div>
      <Dialog open={deleteModel} onClose={handleClose}>
        <DialogContent>
          <Typography>
            Are you sure? you want to delete
          </Typography>
          <DialogActions>
            <Button 
              variant="contained"
              sx={{ mt: 3, mb: 2, background: 'black' }}
              onClick={()=>handleClose()}>Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2, background: 'black' }}
              onClick={()=>deleteProduct(deleteProdId)}>Ok
            </Button>
          </DialogActions>
        </DialogContent >
      </Dialog>
      <Dialog open={open} onClose={handleClose}>
        <Grid container>
          <Grid item xs>
            <DialogTitle>Add Product</DialogTitle>
          </Grid>
          <Grid item>
          <DialogTitle>
            <IconButton onClick={handleClose}> 
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          </Grid>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Controller
              name="productName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  margin="dense"
                  label="Product Name"
                  fullWidth
                  error={!!errors.productName}
                  helperText={errors.productName?.message}
                />
              )}
            />
            <Controller
              name="brand"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  margin="dense"
                  label="Brand"
                  fullWidth
                  error={!!errors.brand}
                  helperText={errors.brand?.message}
                />
              )}
            />
            <Controller
              name="category"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  margin="dense"
                  label="Category"
                  fullWidth
                  select
                  error={!!errors.category}
                  helperText={errors.category?.message}
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="price"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  margin="dense"
                  label="Price"
                  type="number"
                  fullWidth
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              )}
            />
            <Controller
              name="inStock"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  margin="dense"
                  label="In Stock"
                  type="number"
                  fullWidth
                  error={!!errors.inStock}
                  helperText={errors.inStock?.message}
                />
              )}
            />
            <Controller
              name="discription"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  margin="dense"
                  multiline
                  rows={3}
                  label="Discription"
                  fullWidth
                  error={!!errors.discription}
                  helperText={errors.discription?.message}
                />
              )}
            />
            <DialogActions>{isUpdating ?
              <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit(updateProduct)}
                sx={{ mt: 3, mb: 2, background: 'black' }}
              >Update</Button> :
              <Button
                type="submit"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                sx={{ mt: 3, mb: 2, background: 'black' }}
              >Add Product</Button>
            }
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>

      <Box sx={{
        px: 4,
        py: 4,
      }}>
        <Stack spacing={3}>
          <Grid container >
            <Grid item xs>
              <Button sx={{ background: 'black' }} onClick={handleOpen} variant="contained">Add Product</Button>
            </Grid>
            <Grid item>
              <Typography>Page No. {pageNo}</Typography>
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>S.no</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Category</TableCell>
                  <TableCell align="center">In Stock</TableCell>
                  <TableCell align="center">Brand</TableCell>
                  <TableCell align="center">Delete</TableCell>
                  <TableCell align="center">Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow
                    key={product._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {(index + 1 + (pageNo - 1) * 10)}
                    </TableCell>
                    <TableCell align="center">{product.productName}</TableCell>
                    <TableCell align="center">${product.price}</TableCell>
                    <TableCell align="center">{product.category}</TableCell>
                    <TableCell align="center">{product.inStock}</TableCell>
                    <TableCell align="center">{product.brand}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => deleteModelOpen(product._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => { setUpdate(true); handleUpdate(product._id) }}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid container justifyContent="center" >
            <Pagination count={totalPage} size="large" onChange={handlePageChange} />
          </Grid>
        </Stack>
      </Box>
    </div>
  )
}

export default Dashboard