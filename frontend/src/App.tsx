import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Todos } from "./pages/todos";
import Login from "./pages/login";
import Navbar from "./components/Navbar";
import Register from "./pages/register";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
