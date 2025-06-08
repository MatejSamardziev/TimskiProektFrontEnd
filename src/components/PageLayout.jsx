import styled from "styled-components";
import AppBar from "@mui/material/AppBar";
import { Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import DrawerComponent from "./DrawerComponent.jsx";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";

const PageLayout = ({ className, children }) => {
  const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:8080/logout", {}, {
                withCredentials: true, // Needed to send session cookie
            });
            window.location.href = "http://localhost:8080/login";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div className={className}>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Leave Management App
          </Typography>
          <Button onClick={handleLogout} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <div>{children}</div>
      <DrawerComponent
        open={open}
        toggleDrawer={toggleDrawer}
      ></DrawerComponent>
    </div>
  );
};

export const StyledPageLayout = styled(PageLayout)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

export default StyledPageLayout;
