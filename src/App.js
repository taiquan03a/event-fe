import "./App.css";
import path from "./constant/path";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
function App() {
  return (
    <Router>
      <Routes>
        <Route path={path.login} element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
