import React, {useState, useEffect} from "react";
import GoogleLogin from "react-google-login";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import { Container, InsideContent,ForgotPass} from "../styles/Container.styled";
import {Logo, P} from "../styles/Text.styled";
import {Input, Button} from "../styles/Forms.styled";
import Cookies from 'js-cookie';


const Login = () => {
    axios.defaults.withCredentials = true;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();

    const submit = async e => {
        e.preventDefault();
        const user = {username, password};
        const response = await axios.post(
            "http://a3ea-2a0d-6fc0-6ca-4600-6c4f-5b05-e0bd-d3e1.ngrok.io/login",
            //"https://httpbin.org/post",
            user,
            { withCredentials: true }
        );
        console.log(response.data);
    };

    return(
        <Container><InsideContent>
            <div className="mt-3">
                <Logo>Webol</Logo>
            </div>
            <form onSubmit={submit}>
                <div>
                    <Input className="mt-3 mb-3" type="text" name="username" placeholder="Email or username"
                           onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <Input className="mt-3 mb-1" type="password" name="password" placeholder="Password"
                           onChange={e => setPassword(e.target.value)}/>
                </div>
                <ForgotPass>
                    <Link style={{ textDecoration: 'none' }} to="/register"><span>Forgot password?</span></Link>
                </ForgotPass>
                <div className="mb-4 mt-5">
                    <Button type="submit" className="">Log In</Button>
                </div>
            </form>

            <P color="grey">or</P>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_KEY}
                buttonText="Sign in with Google"
                onSuccess={(e) => console.log(e)}
                onFailure={(e) => console.log(e)}
                cookiePolicy={'single_host_origin'}
            />

            <P color="#4D47C3" className="mt-4">Don't have an account?
                <Link style={{ textDecoration: 'none' }} to="/register"> Sign Up</Link></P>
        </InsideContent></Container>
    )
}

export default Login;