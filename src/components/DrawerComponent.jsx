import React from "react";
import {
  Drawer,
  Box,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";

const DrawerComponent = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();
  const goToEmployees = () => {
    navigate("/employees");
  };
  const goToHome = () => {
    navigate("/home");
  };
  const goToRequestPto = () => {
    navigate("/request-pto");
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem key={"Home"} disablePadding>
          <ListItemButton onClick={goToHome}>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"Manage employees"} disablePadding>
          <ListItemButton onClick={goToEmployees}>
            <ListItemText primary={"Manage employees"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"Request paid time off"} disablePadding>
          <ListItemButton onClick={goToRequestPto}>
            <ListItemText primary={"Request paid time off"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Drawer open={open} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
};

export default DrawerComponent;
