import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import ProfilePage from './pages/ProfilePage';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                {/* <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} /> */}
                <Route path="/u/" element={<ProfilePage />} />
                <Route path="/fc" element={<>Flashcards</>} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
