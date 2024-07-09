import "./App.css";
import "./index.css";
import path from "./constant/path";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import ManageUsers from "./pages/DashboardAdmin/ManageUsers/ManageUsers";
import ManageEvents from "./pages/DashboardAdmin/ManageEvents/ManageEvents";
import BookingHistory from "./pages/BookingHistory/BookingHistory";
import EventList from "./pages/EventList/EventList";
import EventDetail from "./pages/EventDetail/EventDetail";
function App() {
  return (
    <Router>
      <Routes>
        <Route path={path.login} element={<Login />}></Route>
        <Route path={path.home} element={<Home />}></Route>
        <Route path={path.about} element={<About />}></Route>
        <Route path={path.events} element={<EventList />}></Route>
        <Route path={path.eventDetail(":id")} element={<EventDetail />} />
        <Route path={path.bookingHistory} element={<BookingHistory />}></Route>
        <Route path={path.manageEvents} element={<ManageEvents />}></Route>
        <Route path={path.manageUsers} element={<ManageUsers />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
