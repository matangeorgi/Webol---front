import React, {useState,useEffect} from "react";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import "./style.scss"


const Home = () => {
    console.log("home");
    if (!localStorage.getItem("user"))
        return (<Redirect to={"/login"}/>);

    let fullname = "";
    // const token = localStorage.getItem('user');
    // useEffect(async() => {
    //     try {
    //         const name = await axios.get(
    //             'http://3381-82-80-173-170.ngrok.io/login-success',
    //             {headers: {'auth-token':JSON.parse(token)}}
    //         );
    //         fullname = name.data.fullname;
    //     } catch (err) {
    //         console.error(err);
    //     }
    // })

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload(false);
    }

    return (
        <div>
            {fullname + ' You are logged in'}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;