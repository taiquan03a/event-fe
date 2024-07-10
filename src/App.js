import "./App.css";
import "./index.css";
import path from "./constant/path";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Swal from "sweetalert2";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import ManageUsers from "./pages/DashboardAdmin/ManageUsers/ManageUsers";
import ManageEvents from "./pages/DashboardAdmin/ManageEvents/ManageEvents";
import BookingHistory from "./pages/BookingHistory/BookingHistory";
import EventList from "./pages/EventList/EventList";
import EventDetail from "./pages/EventDetail/EventDetail";
import ManageSuplier from "./pages/ManageSuplier/ManageSuplier";
import CanceledEvent from "./components/CanceledEvent/CanceledEvent";

const ProtectedRoute = ({ element, roles }) => {
  const accessToken = localStorage.getItem("accessToken");
  const userRoles = localStorage.getItem("role");
  console.log(userRoles);
  if (!accessToken) {
    Swal.fire({
      icon: "warning",
      title: "Chưa đăng nhập",
      text: "Bạn cần đăng nhập để truy cập trang này.",
      showConfirmButton: false,
      timer: 1500,
    });
    return <Navigate to={path.login} />;
  }

  if (roles.length > 0 && !roles.some((role) => userRoles.includes(role))) {
    Swal.fire({
      icon: "error",
      title: "Không có quyền truy cập",
      text: "Bạn không có quyền truy cập trang này.",
      showConfirmButton: false,
      timer: 1500,
    });
    return <Navigate to={path.home} />;
  }

  return element;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path={path.login} element={<Login />} />
        <Route path={path.home} element={<Home />} />
        <Route path={path.about} element={<About />} />
        <Route path={path.events} element={<EventList />} />
        <Route path={path.eventDetail(":id")} element={<EventDetail />} />
        <Route
          path={path.bookingHistory}
          element={
            <ProtectedRoute
              element={<BookingHistory />}
              roles={["ROLE_USER"]}
            />
          }
        />
        <Route
          path={path.canceledHistory}
          element={
            <ProtectedRoute element={<CanceledEvent />} roles={["ROLE_USER"]} />
          }
        />
        <Route
          path={path.manageEvents}
          element={
            <ProtectedRoute
              element={<ManageEvents />}
              roles={["ROLE_ADMINISTRATOR"]}
            />
          }
        />
        <Route
          path={path.manageUsers}
          element={
            <ProtectedRoute
              element={<ManageUsers />}
              roles={["ROLE_ADMINISTRATOR"]}
            />
          }
        />
        <Route
          path={path.manageSuplier}
          element={
            <ProtectedRoute
              element={<ManageSuplier />}
              roles={["ROLE_ADMINISTRATOR"]}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
