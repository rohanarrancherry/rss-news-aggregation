import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Editor from "./components/Editor";
import EditorUi from "./components/Editor/editor";
import Profile from "./components/Editor/profile";
import React from "react";
import axios from "axios";
import data from "bootstrap/js/src/dom/data";


function App() {
  const token = localStorage.getItem("token");

    const url = "/api/auth/user/role";
    const user = fetch(url, {
        headers: {Authorization: 'Bearer: ' + token}
    }).then(res => res.json()).then(data => {
        if (data.role === "user"){
            return true
        }
        else if (data.role === "editor"){
            return true
        }
        return false
    });

  return (
      <Routes>
          {user && <Route path="/dashboard/:categoryParam" element={<Main/>} />}

          {user &&  <Route path="/editor/dashboard" exact element={<EditorUi />} />}
          {user && <Route path="/editor/profile" element={<Profile/>}/>}
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/*" element={<Navigate replace to="/login" />} />


      </Routes>
  );
}

export default App;
