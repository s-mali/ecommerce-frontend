import React from 'react';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';


const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 200,
    flexShrink: 0,
    top : '80px'
  },
}));

export const  SideBar = () => {
  const classes = useStyles();

  return (
    <div>
      <Drawer 
        variant="permanent"
      >
        <List>
          <ListItem button key="Products">
            <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem button key="Payments">
            <ListItemIcon><PaymentIcon /></ListItemIcon>
            <ListItemText primary="Payments" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

//export default SideBar;