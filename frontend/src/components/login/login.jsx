import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import "./style.scss"


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, serRedirect] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        const response = await fetch('https://httpbin.org/post', {
            method: 'POST',
            header: {'Content-Type': 'application/json'},
            //credentials: 'include',
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        });

        const content = await response.json();
        console.log(response);
        serRedirect(true);
    }
    if (redirect)
        return <Redirect to={"/"}/>;

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
                        <input className="mt-5" type="password" name="password" placeholder="Password"
                               onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="footer mb-4">
                        <button type="submit" className="">Log In</button>
                    </div>
                </form>

                 <p className="orContinue">or continue with</p>
                <img src="https://developers.google.com/identity/images/g-logo.png"
                     alt="Google auth icon" className="mb-4"/>

                <p className="registerOption">Don't have an account?
                    <span><Link style={{ textDecoration: 'none' }}role="text" to="/register"> Sign Up</Link></span></p>
            </div>
        </div>
    )
}

export default Login;