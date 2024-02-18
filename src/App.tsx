import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./pages/Profile";
import Classes from "./pages/Classes";
import Categorized from "./components/Class/Categorized";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/me" element={<Profile />} />
        <Route path="/user/me/learning" element={<div>Nathin' 2</div>} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/classes/:category" element={<Categorized />} />
        {/* <Route path="/classes/:id" element={<div>Nathin' 3</div>} /> */}
      </Routes>
      <footer></footer>
    </>
  );
}

export default App;
