import PageLayout, { StyledPageLayout } from "../components/PageLayout.jsx";
import Typography from "@mui/material/Typography";
import ImgMediaCard from "../components/ImgMediaCard.jsx";
import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EmployeePageContentWrapper from "../components/EmployeePageContentWrapper.jsx";
import Button from "@mui/material/Button";

const handleApprove = (row) => {
  console.log("Approving:", row);
  // TODO: call API here if needed
};

const handleDeny = (row) => {
  console.log("Denying:", row);
  // TODO: call API here if needed
};

const timeOffColumns = [
  { field: "requestedEmployeeName", headerName: "First Name", width: 130 },
  { field: "requestedEmployeeLastName", headerName: "Last Name", width: 130 },
  { field: "startDate", headerName: "Start Date", width: 130 },
  { field: "endDate", headerName: "End Date", width: 130 },
  { field: "status", headerName: "Status", width: 130 },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    width: 200,
    renderCell: (params) => (
      <>
        <Button
          variant="text"
          color="success"
          onClick={() => handleApprove(params.row)}
          sx={{ mr: 1 }}
        >
          Approve
        </Button>
        <Button
          variant="text"
          color="error"
          onClick={() => handleDeny(params.row)}
        >
          Deny
        </Button>
      </>
    ),
  },
];

const paginationModel = { page: 0, pageSize: 5 };

const EmployeesPage = () => {
  const [timeOffs, setTimeOffs] = useState(null);
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

        setTimeOffs(timeOffsResponse.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  console.log(timeOffs);

  return (
    <StyledPageLayout>
      <EmployeePageContentWrapper>
        <Paper sx={{ height: 400, width: "860px" }}>
          <DataGrid
            rows={timeOffs ?? []}
            columns={timeOffColumns}
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
