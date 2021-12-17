import React, {useState,useEffect} from "react";
import Topbar from "./Topbar";
import { ImHome,ImSearch,ImBell,ImUser } from "react-icons/im";
import {Navbar} from "../styles/Navbar.styled";
import {IconContext} from "react-icons";


const Home = () => {
    return (
        <div>
            {/*<IconContext.Provider value={{ size: '30px' }}>*/}
            {/*<Navbar className ='navbar d-flex justify-content-center'>*/}
            {/*    <a href="#home"><ImHome/></a>*/}
            {/*    <a href="#news"><ImBell/></a>*/}
            {/*    <a href="#contact"><ImSearch/></a>*/}
            {/*    <a href="#contact"><ImUser/></a>*/}
            {/*</Navbar>*/}
            {/*</IconContext.Provider>*/}
            <Topbar></Topbar>
        </div>
    );
}

export default Home;