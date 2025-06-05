import PageLayout from "../components/PageLayout.jsx";
import * as React from "react";
import RequestPtoPageContentWrapper from "../components/wrappers/RequestPtoPageContentWrapper.jsx";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import CheckIcon from "@mui/icons-material/Check";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import axios from "axios";
import { Alert, Paper, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

const RequestPtoPage = () => {
  const [selectedDates, setSelectedDates] = React.useState([null, null]);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleDateChange = (newValue) => {
    setSelectedDates(newValue);
  };

  const handleSubmit = async () => {
    if (selectedDates[0] && selectedDates[1]) {
      const [start, end] = selectedDates;
      const startDate = start.format("YYYY-MM-DD");
      const endDate = end.format("YYYY-MM-DD");
      try {
        await axios.post(
          `http://localhost:8080/time-offs/request-time-off?startDate=${startDate}&endDate=${endDate}`,
          {},
          { withCredentials: true },
        );
        setShowSuccess(true);
        setShowError(false);
      } catch (error) {
        setError(error.response.data);
        setShowError(true);
        setShowSuccess(false);
      }
    }
  };

  return (
    <PageLayout>
      <RequestPtoPageContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 4,
              background: "linear-gradient(135deg, #e1f5fe, #fce4ec)",
              maxWidth: 600,
              mx: "auto",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#3f51b5" }}>
              Request Your PTO
            </Typography>

            {showSuccess && (
              <Alert icon={<CheckIcon fontSize="inherit" />} variant="filled" severity="success" sx={{ mb: 2 }}>
                PTO request was successful.
              </Alert>
            )}
            {showError && (
              <Alert icon={<CheckIcon fontSize="inherit" />} variant="filled" severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ mb: 3 }}>
                <DateRangePicker
                  localeText={{ start: "Start Date", end: "End Date" }}
                  value={selectedDates}
                  onChange={handleDateChange}
                  sx={{ width: "100%" }}
                />
              </Box>
            </LocalizationProvider>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ px: 4, py: 1.5, fontSize: "1rem", borderRadius: 3 }}
            >
              Submit Request
            </Button>

            <Typography variant="body2" sx={{ mt: 4, color: "#6d6d6d" }}>
              🌴 Plan your holidays with confidence! ☀️
            </Typography>
          </Paper>
        </motion.div>
      </RequestPtoPageContentWrapper>
    </PageLayout>
  );
};

export default RequestPtoPage;
