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

const paginationModel = { page: 0, pageSize: 5 };

const EmployeesPage = () => {
  const [timeOffs, setTimeOffs] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Optional loading state

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (row) => {
    try {
      await axios.post(
        `http://localhost:8080/time-offs/approve/${row.id}`,
        {},
        { withCredentials: true },
      );
      fetchData(); // refresh data after successful approve
    } catch (err) {
      console.error("Approve failed:", err);
    }
  };

  const handleDeny = async (row) => {
    try {
      await axios.post(
        `http://localhost:8080/time-offs/reject/${row.id}`,
        {},
        { withCredentials: true },
      );
      fetchData(); // refresh data after successful deny
    } catch (err) {
      console.error("Deny failed:", err);
    }
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
