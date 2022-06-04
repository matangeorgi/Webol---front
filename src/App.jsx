import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {useEffect, useMemo, useState} from "react";

import axios from "axios";
import dotenv from "dotenv";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Home from "./components/pages/home/home";
import {Login, Register, ForgotPass, ResetPass} from './components/pages/login/index';
import NotFound from "./components/pages/notFound/notFound";
import PostPage from "./components/pages/postPage/postPage";
import Profile from "./components/pages/profile/profile";
import Settings from "./components/pages/settings/settings";
import {SocketContext, socket} from "./socket/socket";
import CategoriesSidebar from "./components/common/categoriesSidebar/categoriesSidebar";
import Navbar from "./components/common/Navbar/Navbar";
import Explore from "./components/pages/explore/explore";

dotenv.config();
axios.defaults.baseURL = process.env.REACT_APP_API_KEY;

const App = () => {
    const verified = useMemo(() => (localStorage.getItem('token')), [localStorage.getItem('token')]);
    axios.defaults.headers.common['auth_token'] = useMemo(() => verified, [verified]);
    const [sideBar, setSidebar] = useState(true);
    const [width, setWidth] = useState();

    return (
        <SocketContext.Provider value={socket}>
            <Router>
                {verified?
                    <>
                        <Navbar width={width} sidebar={sideBar} setSidebar={setSidebar}/>
                        <CategoriesSidebar width={width} setWidth={setWidth} open={sideBar} setOpen={setSidebar}/>
                    </>
                    : null}
                <Routes>
                    {verified ? (
                            <>
                                <Route exact path="/" element={<Home/>}/>
                                <Route path="/:username" element={<Profile/>}/>
                                <Route path="/NotFound" element={<NotFound/>}/>
                                <Route path="/settings" element={<Settings/>}/>
                                <Route path="/post/:id" element={<PostPage/>}/>
                                <Route path="/explore/:category" element={<Explore/>}/>
                            </>
                        )
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
        </SocketContext.Provider>
    );
};

export default App;