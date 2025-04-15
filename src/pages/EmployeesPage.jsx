import PageLayout from "../components/PageLayout.jsx";
import Typography from "@mui/material/Typography";
import ImgMediaCard from "../components/ImgMediaCard.jsx";
import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Optional loading state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/employees/find-all-managed-by",
          {
            withCredentials: true,
          },
        );
        setEmployees(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <PageLayout>
      <div>TESTING</div>
    </PageLayout>
  );
};

export default EmployeesPage;
