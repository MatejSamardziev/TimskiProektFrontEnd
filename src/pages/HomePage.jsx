import PageLayout, { StyledPageLayout } from "../components/PageLayout.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import ImgMediaCard from "../components/ImgMediaCard.jsx";
import Typography from "@mui/material/Typography";
import * as React from "react";
import StyledHomePageContentWrapper from "../components/wrappers/HomePageContentWrapper.jsx";

const HomePage = () => {
  const [user, setUser] = useState(null); // To hold the fetched user data
  const [isLoading, setIsLoading] = useState(true); // Optional loading state

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/employees/current-user",
          {
            withCredentials: true,
          },
        );
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
        <div>
          <Typography gutterBottom variant="h5" component="div">
            Welcome {user?.firstName} {user?.lastName}{" "}
          </Typography>
          <Typography variant="body2">Position: {user?.jobTitle}</Typography>
          <Typography variant="body2">Email: {user?.email}</Typography>
          <Typography variant="body2">
            Manager: {user?.manager?.firstName} {user?.manager?.lastName}
          </Typography>
        </div>
        <ImgMediaCard days={user?.vacationDays}></ImgMediaCard>
      </StyledHomePageContentWrapper>
    </StyledPageLayout>
  );
};

export default HomePage;
