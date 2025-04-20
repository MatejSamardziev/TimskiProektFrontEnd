import PageLayout, { StyledPageLayout } from "../components/PageLayout.jsx";
import Typography from "@mui/material/Typography";
import ImgMediaCard from "../components/ImgMediaCard.jsx";
import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EmployeePageContentWrapper from "../components/wrappers/EmployeePageContentWrapper.jsx";
import Button from "@mui/material/Button";

const employeesColumns = [
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "jobTitle",
    headerName: "Job title",
    width: 90,
  },
  {
    field: "vacationDays",
    headerName: "Vacation days",
    sortable: true,
    type: "number",
    width: 130,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

const EmployeesPage = () => {
  const [employees, setEmployees] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Optional loading state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [employeesResponse, timeOffsResponse] = await Promise.all([
          axios.get("http://localhost:8080/employees/find-all-managed-by", {
            withCredentials: true,
          }),
          axios.get("http://localhost:8080/time-offs/find-all-by-manager", {
            withCredentials: true,
          }),
        ]);
        setEmployees(employeesResponse.data);
        setTimeOffs(timeOffsResponse.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  console.log(employees);

  return (
    <StyledPageLayout>
      <EmployeePageContentWrapper>
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={employees ?? []}
            columns={employeesColumns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
          />
        </Paper>
      </EmployeePageContentWrapper>
    </StyledPageLayout>
  );
};

export default EmployeesPage;
