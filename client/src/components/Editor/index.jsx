import styles from "./styles.module.css";
import React from 'react';
import ReactDOM from 'react-dom';
import './styles.module.css';
import EditorUi from './editor';
import Profile from './profile';
import Navigation from './navbar';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

const EditorMain = () => {
    return (
        <div>
<Router>
            <Navigation />
            <Routes>
                <Route path="/editor/dashboard" element={<EditorUi />} />
                <Route path="/editor/profile" element={<Profile />} />
            </Routes>
</Router>
        </div>
    );
};

export default EditorMain;