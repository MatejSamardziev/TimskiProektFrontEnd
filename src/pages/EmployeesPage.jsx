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

const employeesColumns = [
  { field: "firstName", headerName: "First name", flex: 1 },
  { field: "lastName", headerName: "Last name", flex: 1 },
  { field: "jobTitle", headerName: "Job title", flex: 2 },
  { field: "vacationDays", headerName: "Vacation days", type: "number", flex: 1 },
];

const paginationModel = { page: 0, pageSize: 5 };

const EmployeesPage = () => {
  const [employees, setEmployees] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <StyledPageLayout>
      <EmployeePageContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, textAlign: "center", color: "#3f51b5" }}>
            Your Managed Employees
          </Typography>

          <Box
            component={Paper}
            elevation={4}
            sx={{
              width: "95%",
              maxWidth: "1600px",
              mx: "auto",
              p: 4,
              borderRadius: 4,
              boxShadow: 6,
              background: "linear-gradient(135deg, #e3f2fd, #fce4ec)",
            }}
          >
            <DataGrid
              autoHeight
              rows={employees ?? []}
              columns={employeesColumns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              getRowHeight={() => 75}
              sx={{
                border: 0,
                fontSize: "1rem",
                backgroundColor: "white",
                borderRadius: 2,
              }}
            />

            {/* Happy Message with Emoji Flair */}
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
               Keep leading with kindness and clarity – your team appreciates you! 
            </Box>
          </Box>
        </motion.div>
      </EmployeePageContentWrapper>
    </StyledPageLayout>
  );
};

export default EmployeesPage;
