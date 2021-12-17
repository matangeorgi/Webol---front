import React, {useState,useEffect} from "react";
import { ImHome,ImSearch,ImBell,ImUser } from "react-icons/im";
import {Navbar} from "../styles/Navbar.styled";
import {IconContext} from "react-icons";


const Home = () => {
    return (
        <div>
            <IconContext.Provider value={{ color: '5450bd', size: '30px' }}>
            <Navbar className ='navbar d-flex justify-content-center'>
                <a href="#home"><ImHome/></a>
                <a href="#news"><ImBell/></a>
                <a href="#contact">Contact</a>
            </Navbar>
            </IconContext.Provider>
        </div>
    );
}

export default Home;