import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Editor from "./components/Editor";


function App() {
  const user = localStorage.getItem("token");

  return (
      <Routes>
        {user && <Route path="/" exact element={<Main />} />}
        {user &&  <Route path="/editor" exact element={<Editor />} />}
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/editor" element={<Navigate replace to="/editor" />} />


      </Routes>
  );
}

export default App;
