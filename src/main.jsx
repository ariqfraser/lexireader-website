import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import FlashCardPage from './pages/FlashCardPage';
import DeckEditPage from './pages/DeckEditPage';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                {/* <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} /> */}
                <Route path="/u/" element={<ProfilePage />} />
                <Route path="/fc" element={<FlashCardPage />} />
                <Route path={'/fc/:title'} element={<DeckEditPage />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
