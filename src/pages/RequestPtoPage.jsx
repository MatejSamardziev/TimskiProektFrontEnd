import PageLayout from "../components/PageLayout.jsx";
import * as React from "react";
import RequestPtoPageContentWrapper from "../components/wrappers/RequestPtoPageContentWrapper.jsx";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import CheckIcon from "@mui/icons-material/Check";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import axios from "axios";
import { Alert } from "@mui/material";

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
        {showSuccess && (
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            variant="filled"
            severity="success"
          >
            PTO request was successful.
          </Alert>
        )}
        {showError && (
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            variant="filled"
            severity="error"
          >
            {error}
          </Alert>
        )}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            localeText={{ start: "Check-in", end: "Check-out" }}
            value={selectedDates}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit} // Submit function
        >
          Submit
        </Button>
      </RequestPtoPageContentWrapper>
    </PageLayout>
  );
};

export default RequestPtoPage;
