import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {useMemo} from "react";

import axios from "axios";
import dotenv from "dotenv";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Home from "./components/pages/home/home";
import {Login, Register, ForgotPass, ResetPass} from './components/pages/login/index';
import NotFound from "./components/pages/notFound/notFound";
import PostPage from "./components/pages/postPage/postPage";
import Profile from "./components/pages/profile/profile";
import Settings from "./components/pages/settings/settings";

dotenv.config();
axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
axios.interceptors.response.use(response => {
    return response;
    }, error => {
    if (error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
    }
    return error;
});

const App = () => {

    const verified = useMemo(() => (localStorage.getItem('token')), [localStorage.getItem('token')]);
    axios.defaults.headers.common['auth_token'] = useMemo(() => verified, [verified]);

    return (
        <Router>
            <Routes>
                {verified ? (
                        <>
                            <Route exact path="/" element={<Home/>}/>
                            <Route path="/:username" element={<Profile/>}/>
                            <Route path="/NotFound" element={<NotFound/>}/>
                            <Route path="/settings" element={<Settings/>}/>
                            <Route path="/post/:id" element={<PostPage/>}/>
                        </>)
                    :
                    <>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/forgotpass" element={<ForgotPass/>}/>
                        <Route path="/resetpass/:id/:token" element={<ResetPass/>}/>
                        <Route path='*' element={<Login/>}/>
                    </>
                }
            </Routes>
        </Router>
    );
};

export default App;