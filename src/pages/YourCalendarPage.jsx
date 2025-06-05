import YourCalendarPageContentWrapper from "../components/wrappers/YourCalendarPageContentWrapper.jsx";
import PageLayout from "../components/PageLayout.jsx";
import {
  DateCalendar,
  DayCalendarSkeleton,
  PickersDay,
} from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Legend from "../components/Legend.jsx";
import { Box, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";

function ServerDay(props) {
  const { days = [], day, outsideCurrentMonth, ...other } = props;

  const found = days.find((d) => d.date === day.format("YYYY-MM-DD"));
  let color;

  if (found?.status === "APPROVED") color = "green";
  else if (found?.status === "PENDING") color = "orange";
  else if (found?.status === "REJECTED") color = "red";

  return (
    <PickersDay
      day={day}
      outsideCurrentMonth={outsideCurrentMonth}
      {...other}
      sx={{
        backgroundColor: color || undefined,
        "&:hover": {
          backgroundColor: color || undefined,
          opacity: 0.9,
        },
      }}
    />
  );
}

function mapDays(data) {
  let days = [];
  data.forEach(({ startDate, endDate, status }) => {
    let current = dayjs(startDate);
    const end = dayjs(endDate);
    while (current.isBefore(end) || current.isSame(end, "day")) {
      days.push({
        date: current.format("YYYY-MM-DD"),
        status,
      });
      current = current.add(1, "day");
    }
  });
  return days;
}

const YourCalendarPage = () => {
  const [timeOffs, setTimeOffs] = useState([]);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8080/time-offs/find-all-by-employee",
        {
          withCredentials: true,
        }
      );
      setTimeOffs(response.data);
      setDays(mapDays(response.data));
    };
    fetchData();
  }, []);

  return (
    <PageLayout>
      <Legend />
      <YourCalendarPageContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            component={Paper}
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 4,
              width: "100%",
              maxWidth: "500px",
              margin: "0 auto",
              background: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{ textAlign: "center", fontWeight: 600, color: "#3f51b5" }}
            >
              Your Time Off Calendar
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ width: "100%" }}>
                <DateCalendar
                  renderLoading={() => <DayCalendarSkeleton />}
                  slots={{ day: ServerDay }}
                  slotProps={{ day: { days } }}
                  sx={{
                    width: "100%",
                    backgroundColor: "white",
                    borderRadius: 2,
                    p: 2,
                  }}
                />
              </Box>
            </LocalizationProvider>

            <Typography
              variant="body1"
              sx={{ textAlign: "center", mt: 3, fontStyle: "italic" }}
            >
              📅 Track your approved, pending, or rejected requests below.
            </Typography>
          </Box>
        </motion.div>
      </YourCalendarPageContentWrapper>
    </PageLayout>
  );
};

export default YourCalendarPage;
