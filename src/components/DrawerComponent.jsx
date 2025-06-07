import React, { useEffect, useState } from "react";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DrawerComponent = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/employees/current-user", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const goToEmployees = () => navigate("/employees");
  const goToHome = () => navigate("/home");
  const goToRequestPto = () => navigate("/request-pto");
  const goToManagePto = () => navigate("/manage-pto");
  const goToViewCalendar = () => navigate("/calendar");

  if (!user) return null; // Optional: return nothing while user is loading

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem key="Home" disablePadding>
          <ListItemButton onClick={goToHome}>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        {/* 🔒 Hide for EMPLOYEE_BASIC */}
        {user.role !== "EMPLOYEE_BASIC" && (
          <ListItem key="Manage employees" disablePadding>
            <ListItemButton onClick={goToEmployees}>
              <ListItemText primary="Manage employees" />
            </ListItemButton>
          </ListItem>
        )}
        {user.role !== "EMPLOYEE_BASIC" && (
        <ListItem key="Manage PTO" disablePadding>
          <ListItemButton onClick={goToManagePto}>
            <ListItemText primary="Manage PTO" />
          </ListItemButton>
        </ListItem>
        )}


        {/* 🔒 Hide for EMPLOYEE_BASIC */}
        
          <ListItem key="Request paid time off" disablePadding>
            <ListItemButton onClick={goToRequestPto}>
              <ListItemText primary="Request paid time off" />
            </ListItemButton>
          </ListItem>
        
        <ListItem key="View calendar" disablePadding>
          <ListItemButton onClick={goToViewCalendar}>
            <ListItemText primary="Your calendar" />
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
