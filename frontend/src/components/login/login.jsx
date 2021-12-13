import React, {useState, useEffect} from "react";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import "./style.scss"

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);

    // logout the user
    const handleLogout = () => {
        setUser({});
        setUsername("");
        setPassword("");
        localStorage.clear();
    };

    // login the user
    const submit = async e => {
        e.preventDefault();
        const user = { username, password };
        // send the username and password to the server
        const response = await axios.post(
            "https://8080-2a0d-6fc0-6f7-400-9181-b26-ad3f-2c4e.ngrok.io/login",
            //"https://httpbin.org/post",
            user
        );
        // set the state of the user
        setUser(response.data);
        // store the user in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.token));
        console.log(response.data);
    };

    //if there's a user show the message below
    if (user) {
        return (<Redirect to={"/"}/>);
    }

    return(
        <div className="base-container">
            <div className="content">
                <div className="logo mt-4">
                    <h2>Webol</h2>
                </div>
                <form className="form" onSubmit={submit}>
                    <div className="form-group">
                        <input className="" type="text" name="username" placeholder="Email or username"
                               onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <input className="mt-3" type="password" name="password" placeholder="Password"
                               onChange={e => setPassword(e.target.value)}/>
                    </div>

                    <Link className="forgot" style={{ textDecoration: 'none' }} to="/register"> Forgot password?</Link>

                    <div className="footer mb-4">
                        <button type="submit" className="">Log In</button>
                    </div>
                </form>

                <p className="orContinue">or continue with</p>
                <img src="https://developers.google.com/identity/images/g-logo.png"
                     alt="Google auth icon" className="mb-4"/>

                <p className="registerOption">Don't have an account?
                    <span><Link style={{ textDecoration: 'none' }}to="/register"> Sign Up</Link></span></p>
            </div>
        </div>
    )
}

export default Login;