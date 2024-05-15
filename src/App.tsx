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
import { useState } from "react";
import AdminPanel from "./pages/AdminPanelUsers";
import AdminPanelClasses from "./pages/AdminPanelClasses";
import AdminPanelSubjects from "./pages/AdminPanelSubjects";

function App() {
  const [search, setSearch] = useState<string>("");
  return (
    <>
      <Navbar
        search={(s) => {
          if (s != "") {
            setSearch(s);
          }
        }}
      />
      <Routes>
        <Route path="/" element={<Home search={search || ""} />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/me" element={<EditProfile />} />
        <Route path="/user/:id" element={<PublicProfile />} />
        <Route path="/user/:id/learning" element={<MyLearning />} />
        <Route path="/classes/:category" element={<Categorized />} />
        <Route path="/classes/class/:id" element={<Class />} />
        <Route path="/classes/create" element={<CreateClass />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/adminpanel/classes" element={<AdminPanelClasses />} />
        <Route path="/adminpanel/subjects" element={<AdminPanelSubjects />} />
      </Routes>
      <footer></footer>
    </>
  );
}

export default App;
