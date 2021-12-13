import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        const userDetails = {email, fullname, username, password};
        // send the username and password to the server
        const response = await axios.post(
            "https://8080-2a0d-6fc0-6f7-400-9181-b26-ad3f-2c4e.ngrok.io/register",
            //"https://httpbin.org/post",
            userDetails
        );
        // console.log(email,fullname,username,password);
        // const content = await response.data();
        console.log(response.data);
    }

    return(
        <div className="base-container">
            <div className="content">
                <div className="mt-4">
                    <h2>Webol</h2>
                </div>
                <p>Sign up and have better experience.</p>

                <form id="test" className="form" onSubmit={submit}>
                    <div className="form-group mb-3">
                        <input type="email" name="email" placeholder="Email" required
                               onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group mb-3">
                        <input type="text" name="fullname" placeholder="Full Name" required
                               onChange={e => setFullname(e.target.value)}/>
                    </div>
                    <div className="form-group mb-3">
                        <input type="text" name="Username" placeholder="Username" required
                            onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" placeholder="Password" required
                               onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="footer">
                        <button type="submit" className="btn">Sign up</button>
                    </div>
                </form>
            </div>
            <div className="base-container-small">
                <p className="loginOption mt-2">have an account?
                    <span><Link style={{ textDecoration: 'none' }}to="/login"> Log in</Link></span></p>

                <p className="orContinue">or continue with</p>

                <img src="frontend/public/google.png"
                     alt="Google auth icon" className="mb-4"/>
            </div>
        </div>
    )
}
export default Register;