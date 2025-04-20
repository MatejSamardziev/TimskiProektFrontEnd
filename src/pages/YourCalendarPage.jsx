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
import Badge from "@mui/material/Badge";
import CircleComponent from "../components/CircleComponent.jsx";
import Legend from "../components/Legend.jsx";

function ServerDay(props) {
  const { days = [], day, outsideCurrentMonth, ...other } = props;

  const found = days.find((d) => d.date === day.format("YYYY-MM-DD"));
  let color;

  if (found?.status === "APPROVED") color = "green";
  else if (found?.status === "PENDING") color = "orange";
  else if (found?.status === "REJECTED") color = "red";

  console.log(color);

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
  console.log("aaa");
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
        },
      );
      setTimeOffs(response.data);
      setDays(mapDays(response.data));
    };
    fetchData();
  }, []);

  return (
    <PageLayout>
      <Legend></Legend>
      <YourCalendarPageContentWrapper>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{ day: ServerDay }}
            slotProps={{ day: { days } }}
          />
        </LocalizationProvider>
      </YourCalendarPageContentWrapper>
    </PageLayout>
  );
};
export default YourCalendarPage;
