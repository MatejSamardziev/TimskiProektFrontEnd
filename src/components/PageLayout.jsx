import styled from "styled-components";
import AppBar from "@mui/material/AppBar";
import { Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import DrawerComponent from "./DrawerComponent.jsx";
import MenuIcon from "@mui/icons-material/Menu";

const PageLayout = ({ className, children }) => {
  const [open, setOpen] = useState(false);

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
          <Button color="inherit">Logout</Button>
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
  gap: 10px;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

export default StyledPageLayout;
