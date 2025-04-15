import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import EmployeesPage from "./pages/EmployeesPage.jsx";
import RequestPtoPage from "./pages/RequestPtoPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/request-pto" element={<RequestPtoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
