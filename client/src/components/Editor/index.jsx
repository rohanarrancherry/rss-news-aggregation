import styles from "./styles.module.css";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; 
import EditorUi from './editor';
import Profile from './profile';
import Navigation from './navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const Main = () => {
    return (
        <div>
                    <Router>
                    <Navigation />
                    <Routes>
                        <Route path="/" element={<EditorUi />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </Router>
        </div>
               
            
    
    );
};

export default Main;
/*
                <h1>Editor Page</h1>

                <button className={styles.white_btn} onClick={handleLogout}>
                    Logout
                </button>*/