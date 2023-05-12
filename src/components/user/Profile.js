import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getUser, updateProfile, uploadProfileImage } from '../../redux/actions/authAction'
import { Box, Button, Container, Grid, TextField, Typography, Skeleton, IconButton, Divider, Input } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Edit as EditIcon, FormatIndentIncreaseOutlined, Save as SaveIcon } from '@mui/icons-material';
import noUserImage from '../../Assets/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg'

const UserProfileImage = styled('img')({
  width: '50%',
  borderRadius: '50%',
});



const schema = yup.object().shape({
  firstName: yup.string().required('First Name is requried'),
  lastName: yup.string().required('Last Name is requried'),
  dob: yup.date().test('dob', 'Date of birth can not be future date', function (value) {
    if (!value) {
      return true;
    }
    const today = new Date();
    const dob = new Date(value);
    return dob < today;
  }),
  email: yup.string().email(),
  phone: yup.string().matches(/^[0-9]{10}$/, "Invalid Phone Number")
});

function Profile() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const { control, handleSubmit, reset, formState: { errors }, } = useForm({
    resolver: yupResolver(schema),
  });
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isWaiting, setWaiting] = useState(true);

  const handleEditClick = () => {
    reset({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dob: user.dob ? new Date(user.dob).toISOString().slice(0, 10) : undefined,
      phone: user.phone ? user.phone : undefined
    })
    setIsEditing(true);
  };

  const handleSaveClick = (data) => {
    setIsEditing(false);
    console.log(data);
    dispatch(updateProfile(data))
  };

  const cancelEdit = () => {
    setIsEditing(false);
  }


  useEffect(() => {
    dispatch(getUser())
      .then(() => setWaiting(false))
      .catch(() => setWaiting(false))
  }, [])

  const handleFileInputChange = (event) =>{
    setWaiting(true)
    const file = event.target.files[0];

    let formData = new FormData()
    formData.append('image', file)

    dispatch(uploadProfileImage(formData))
    .then(() => setWaiting(false))
    .catch(() => setWaiting(false))
  }

  const renderProfileContent = () => {
    if (isEditing) {
      return (
        <Box sx={{
          mt: 4,
          maxWidth: 600,
          mx: "auto",
          boxShadow: 3,
          borderRadius: 3,
          p: 3,
        }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Edit Profile
          </Typography>
          <form onSubmit={handleSubmit(handleSaveClick)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="First Name"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastName"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Last Name"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="dob"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Date of Birth"
                      type="date"
                      error={!!errors.dob}
                      helperText={errors.dob?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      disabled
                      label="Email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Phone"
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-evenly' }}>
              <Button variant="contained" sx={{ background: 'black' }} type='submit'>
                Save
              </Button>
              <Button variant="contained" sx={{ background: 'black' }} onClick={cancelEdit}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      );
    }

    return (
      <>{
        !isWaiting ? (
          <Box sx={{
            mt: 4,
            maxWidth: 600,
            mx: "auto",
            boxShadow: 3,
            borderRadius: 3,
            p: 3,
          }}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: "center", position: "relative" }}>
                <UserProfileImage src={ user.userImage || noUserImage}
                  alt={`${user.firstName} ${user.lastName}`}/>
                  <Input
                  type="file"
                  inputRef={fileInputRef}
                  onChange={handleFileInputChange}
                  inputProps={{ accept: 'image/*' }}
                  sx={{display : 'none'}}
                  />
                <IconButton
                  sx={{ position: "absolute", 
                  size : "100px",
                  bottom: "12%",
                  left: "66%",             
                  bgcolor: "white",
                  boxShadow: 2,
                  borderRadius: '50%'
                  }}
                  onClick={()=> fileInputRef.current.click()}
                >
                <EditIcon />
                </IconButton>
              </Box>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={9}>
                    <Typography variant="h4" component="h1">
                      {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Date of Birth: { user.dob ? new Date(user.dob)
                                    .toLocaleDateString('en-US',
                                    {day: 'numeric', month: 'short', year: 'numeric'}) : ''}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Email: {user.email}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Phone: {user.phone}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Button variant="contained" sx={{ background: 'black' }} onClick={handleEditClick}>
                        Edit
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        ) : (

          <Box sx={{
            mt: 4,
            maxWidth: 600,
            mx: "auto",
            boxShadow: 3,
            borderRadius: 3,
            p: 3,
          }}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: "center" }}>
                <Skeleton variant="circular" width="50%" height={300} />
              </Box>
              <Box>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={9}>
                    <Typography variant="h4" component="h1">
                      <Skeleton />
                    </Typography>
                    <Typography variant="subtitle1" >
                      <Skeleton />
                    </Typography>
                    <Typography variant="subtitle1" >
                      <Skeleton />
                    </Typography>
                    <Typography variant="subtitle1" >
                      <Skeleton />
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Button>
                        <Skeleton variant="rounded"
                          width={70}
                          height={40} />
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        )
      }
      </>
    )
  }

  return renderProfileContent()
}

export default Profile