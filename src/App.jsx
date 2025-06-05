import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import EmployeesPage from "./pages/EmployeesPage.jsx";
import RequestPtoPage from "./pages/RequestPtoPage.jsx";
import ManagePtoPage from "./pages/ManagePtoPage.jsx";
import YourCalendarPage from "./pages/YourCalendarPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import ChatBotPage from "./pages/ChatBotPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/chatBot" element={<ChatBotPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/manage-pto" element={<ManagePtoPage />} />
        <Route path="/request-pto" element={<RequestPtoPage />} />
        <Route path={"/calendar"} element={<YourCalendarPage />} />
      </Routes>
    </Router>
  );
}

export default App;
