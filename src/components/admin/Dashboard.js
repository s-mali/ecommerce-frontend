import React from 'react'
import { Box, Button, Grid, TextField, Typography, Modal } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';

function Dashboard() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 10,
    p: 2,
  };

  const onSubmit = (data) => {
    console.log();
  }

  return (
    <div>
      <Button onClick={handleOpen}>Add Product</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Grid id="modal-modal-description" container spacing={2} >
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="productName"
                name="productName"
                label="Name"
                fullWidth
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="price"
                name="price"
                label="Price"
                type="number"
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="brand"
                name="brand"
                label="Brand"
                fullWidth
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="category"
                name="category"
                label="Category"
                fullWidth
                margin="dense"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
               
              <TextareaAutosize
                minRows={3}
                placeholder="Discription"
                required
                id="discription"
                name="discription"
                label="Discription"
                fullWidth
                margin="dense"               
              />
            </Grid >

          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, background: 'black' }}
            onClick={onSubmit}
          >
           Add product
          </Button>          
        </Box>
      </Modal>
    </div>
  )
}

export default Dashboard