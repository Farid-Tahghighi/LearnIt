import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar/Navbar";
import EditProfile from "./pages/EditProfile";
import Categorized from "./components/Class/Categorized";
import Class from "./pages/Class";
import PublicProfile from "./pages/PublicProfile";
import CreateClass from "./pages/CreateClass";
import MyLearning from "./pages/MyLearning";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home search="" />} />
        <Route path="/home" element={<Home search="" />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/me" element={<EditProfile />} />
        <Route path="/user/:id" element={<PublicProfile />} />
        <Route path="/user/:id/learning" element={<MyLearning />} />
        <Route path="/classes/:category" element={<Categorized />} />
        <Route path="/classes/class/:id" element={<Class />} />
        <Route path="/classes/create" element={<CreateClass />} />
      </Routes>
      <footer></footer>
    </>
  );
}

export default App;
