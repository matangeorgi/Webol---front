import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {useMemo} from "react";

import axios from "axios";
import dotenv from "dotenv";
import {BrowserRouter as Router, Route, Routes, useMatch} from "react-router-dom";

import Home from "./pages/home/home";
import {Login, Register, ForgotPass, ResetPass} from './pages/login/index';
import NotFound from "./pages/notFound/notFound";
import PostPage from "./pages/postPage/postPage";
import Profile from "./pages/profile/profile";
import Settings from "./pages/settings/settings";


dotenv.config();
axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
axios.defaults.headers.common['auth_token'] = localStorage.getItem('token');

const App = () => {

    const verified = useMemo(() => (localStorage.getItem('token')),[localStorage.getItem('token')]);
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={verified ? <Home/> : <Login/>} />
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/forgotpass" element={<ForgotPass/>}/>
                    <Route path="/resetpass/:id/:token" element={<ResetPass/>}/>
                    <Route path="/:username" element={verified ? <Profile/> : <Login/>}/>
                    <Route path="/NotFound" element={<NotFound/>}/>
                    <Route path="/settings" element={verified ? <Settings/> : <Login/>}/>
                    <Route path="/post/:id" element={<PostPage/>}/>
                </Routes>
            </Router>
        </div>
    );
};

export default App;