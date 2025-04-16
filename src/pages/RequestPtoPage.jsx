import PageLayout from "../components/PageLayout.jsx";
import * as React from "react";
import RequestPtoPageContentWrapper from "../components/RequestPtoPageContentWrapper.jsx";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import axios from "axios";

const RequestPtoPage = () => {
  const [selectedDates, setSelectedDates] = React.useState([null, null]);

  const handleDateChange = (newValue) => {
    setSelectedDates(newValue);
  };

  const handleSubmit = async () => {
    if (selectedDates[0] && selectedDates[1]) {
      const [start, end] = selectedDates;
      const startDate = start.format("YYYY-MM-DD");
      const endDate = end.format("YYYY-MM-DD");
      console.log(startDate, endDate);
      try {
        await axios.post(
          `http://localhost:8080/time-offs/request-time-off?startDate=${startDate}&endDate=${endDate}`,
          {},
          { withCredentials: true },
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <PageLayout>
      <RequestPtoPageContentWrapper>
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
