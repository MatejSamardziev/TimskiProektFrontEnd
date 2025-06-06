import PageLayout, { StyledPageLayout } from "../components/PageLayout.jsx";
import Typography from "@mui/material/Typography";
import ImgMediaCard from "../components/ImgMediaCard.jsx";
import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Paper, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EmployeePageContentWrapper from "../components/wrappers/EmployeePageContentWrapper.jsx";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";

const paginationModel = { page: 0, pageSize: 5 };

const EmployeesPage = () => {
  const [timeOffs, setTimeOffs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      fetchData();
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
      fetchData();
    } catch (err) {
      console.error("Deny failed:", err);
    }
  };
const timeOffColumns = [
  { field: "requestedEmployeeName", headerName: "First Name", flex: 1 },
  { field: "requestedEmployeeLastName", headerName: "Last Name", flex: 1 },
  { field: "startDate", headerName: "Start Date", flex: 1 },
  { field: "endDate", headerName: "End Date", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    flex: 2,
    renderCell: (params) => {
      const status = params.row.status?.toLowerCase();

      return (
        <>
          <Button
            variant="text"
            color="success"
            onClick={() => handleApprove(params.row)}
            sx={{ mr: 1 }}
            disabled={status === "approved"} // Disable if already approved
          >
            Approve
          </Button>
          <Button
            variant="text"
            color="error"
            onClick={() => handleDeny(params.row)}
            disabled={status === "rejected"} // Disable if already rejected
          >
            Deny
          </Button>
        </>
      );
    },
  },
]; // ← this closing bracket was missing

  return (
    <StyledPageLayout>
      <EmployeePageContentWrapper>
        <div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
  variant="h4"
  gutterBottom
  sx={{
    mt: 6,
    fontWeight: 600,
    textAlign: "center",
    color: "#3f51b5",
  }}
>
  PTO Requests Awaiting Your Action
</Typography>


          <Box
  component={Paper}
  elevation={4}
  sx={{
    width: "1200px",        // Fixed width
    height: "700px",        // Fixed height
    margin: "40px auto",    // Centered with spacing from top
    padding: 4,
    borderRadius: 4,
    boxShadow: 6,
    background: "linear-gradient(135deg, #e3f2fd, #fce4ec)",
    overflow: "hidden",     // Prevents inner overflow issues
  }}
>
           <DataGrid
  rows={timeOffs ?? []}
  columns={timeOffColumns}
  initialState={{ pagination: { paginationModel } }}
  pageSizeOptions={[5, 10]}
  getRowHeight={() => 75}
  sx={{
    border: 0,
    fontSize: "1rem",
    backgroundColor: "white",
    borderRadius: 2,
    height: "100%",   // Fill the container
    width: "100%",    // Fill the container
  }}
/>

            <Box sx={{
              textAlign: "center",
              mt: 6,
              py: 3,
              fontSize: "1.3rem",
              color: "#6a1b9a",
              fontWeight: 600,
              background: "linear-gradient(135deg, #e3f2fd, #fce4ec)",
              borderRadius: 3,
              boxShadow: "inset 0 0 6px #ec407a",
            }}>
              Here are the holiday requests from employees you manage.
              You can review, approve, or reject each request below.
            </Box>
          </Box>
        </div>
      </EmployeePageContentWrapper>
    </StyledPageLayout>
  );
};

export default EmployeesPage;
