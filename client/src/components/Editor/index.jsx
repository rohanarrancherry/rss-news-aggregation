import styles from "./styles.module.css";
import React from 'react';
import ReactDOM from 'react-dom';
import './styles.module.css';
import EditorUi from './editor';
import Profile from './profile';
import Navigation from './navbar';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

const Main = () => {
    return (
        <div>

<Navigation />
                    <Routes>
                        <Route path="/editor/dashboard" element={<EditorUi />} />
                        <Route path="/editor/profile" element={<Profile />} />
                    </Routes>
        </div>
    );
};

export default Main;