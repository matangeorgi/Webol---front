import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import axios from "axios";
import dotenv from "dotenv";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Home from "./pages/home/home";
import {Login, Register, ForgotPass, ResetPass} from './pages/login/index';
import NotFound from "./pages/notFound/notFound";
import Profile from "./pages/profile/profile";


dotenv.config();
axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
axios.defaults.headers.common['auth_token'] = localStorage.getItem('token');

const App = () => {

    const verified = localStorage.getItem('token');
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={verified ? <Home/> : <Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/forgotpass" element={<ForgotPass/>}/>
                    <Route path="/resetpass/:id/:token" element={<ResetPass/>}/>
                    <Route path="/:username" element={true ? <Profile/> : <Login/>}/>
                    <Route path="/NotFound" element={<NotFound/>}/>
                </Routes>
            </Router>
        </div>
    );
};

export default App;