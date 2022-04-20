import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import EditorUi from "./components/Editor/editor";
import Profile from "./components/Editor/profile";

function App() {
  const userRole = localStorage.getItem("role")

  return (
    <>
      <Routes>
          { userRole === "user" && <Route path="/dashboard/:categoryParam" element={<Main/>} />}
          { userRole === "editor" &&  <Route path="/editor/dashboard" exact element={<EditorUi />} />}
          {(userRole === "editor") && <Route path="/editor/profile" element={<Profile/>}/>}
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
      </>
  );
}

export default App;
