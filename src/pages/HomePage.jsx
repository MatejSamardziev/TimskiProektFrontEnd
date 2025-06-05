import PageLayout, { StyledPageLayout } from "../components/PageLayout.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import * as React from "react";
import StyledHomePageContentWrapper from "../components/wrappers/HomePageContentWrapper.jsx";
import { Link } from "react-router-dom";
import { Button, Grid, Paper, Avatar, Divider, Box } from "@mui/material";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/employees/current-user", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <StyledPageLayout>
      <StyledHomePageContentWrapper>
        {/* Profile Info Section */}
        <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ marginTop: 4 }}>
          <Grid item xs={12} md={8}>
            <Paper elevation={4} sx={{ padding: 4, borderRadius: 4, backgroundColor: "#f5f7fa" }}>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Avatar sx={{ width: 64, height: 64 }}>
                  {user?.firstName?.[0]}
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    Welcome {user?.firstName} {user?.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user?.jobTitle} | {user?.email}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Vacation days:</strong> {user?.vacationDays}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Manager:</strong> {user?.managerFirstName} {user?.managerLastName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Email:</strong> {user?.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Job Title:</strong> {user?.jobTitle}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Action Cards Section */}
        <Grid container spacing={3} justifyContent="center" mt={6}>
          {user?.role === "ADMIN" && (
            <Grid item xs={12} sm={4}>
              <Link to="/admin" style={{ textDecoration: "none" }}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 3,
                    transition: "0.3s",
                    "&:hover": { backgroundColor: "#e3f2fd" },
                  }}
                >
                  <Box fontSize="40px">🛠️</Box>
                  <Typography variant="h6" mt={1} color="text.primary">
                    Admin Panel
                  </Typography>
                </Paper>
              </Link>
            </Grid>
          )}

          <Grid item xs={12} sm={4}>
  <Link to="/chatBot" style={{ textDecoration: "none" }}>
    <Paper
      elevation={3}
      sx={{
        p: 3,
        textAlign: "center",
        borderRadius: 3,
        transition: "0.3s",
        "&:hover": { backgroundColor: "#f3e5f5" },
      }}
    >
      <Box display="flex" justifyContent="center" mb={1}>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#673ab7" viewBox="0 0 16 16">
          <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135" />
          <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5" />
        </svg>
      </Box>
      <Typography variant="h6" color="text.primary">
        Chat with ChatBot
      </Typography>
    </Paper>
  </Link>
</Grid>


          <Grid item xs={12} sm={4}>
            <Link to="/chat-colleagues" style={{ textDecoration: "none" }}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": { backgroundColor: "#e8f5e9" },
                }}
              >
                <Box fontSize="40px">💬</Box>
                <Typography variant="h6" mt={1} color="text.primary">
                  Chat with Colleagues
                </Typography>
              </Paper>
            </Link>
          </Grid>
        </Grid>
      </StyledHomePageContentWrapper>
    </StyledPageLayout>
  );
};

export default HomePage;
