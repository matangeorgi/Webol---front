import React, {useState} from "react";
import GoogleLogin from "react-google-login";
import {Link} from "react-router-dom";
import axios from "axios";
import { Container, InsideContent} from "../Container.styled.js";
import { ForgotPass } from "./Login.styled";
import {Input, Button , Logo, P} from "../Forms.styled";

const Login = () => {
    const [errorMessage, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Login in the regular way
    const submit = async e => {
        e.preventDefault();
        const user = {email, password};
        try{
            const response = await axios.post('login', user);
            console.log(response)
            localStorage.setItem("token", response.data.UserInfo.auth_token);
            window.location.reload();
        }catch (error){
            console.log(error.response.data.error);
            setError(error.response.data.error);
        }
    };

    // Login with Google
    const googleLogin = async e => {
        try{
            const response = await axios.post('googlelogin', e.profileObj);
            console.log(response);
            localStorage.setItem("token", response.data.UserInfo.auth_token);
            window.location.reload();
        }catch (error){
            console.log(error.response.data.error);
        }
    };

    return(
        <Container><InsideContent>
            <div className="mt-3">
                <Logo>Webol</Logo>
            </div>
            <form onSubmit={submit}>
                <div>
                    <Input className="mt-3 mb-3" type="text" name="email" placeholder="Email" required
                           onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <Input className="mt-3 mb-1" type="password" name="password" placeholder="Password" required
                           onChange={e => setPassword(e.target.value)}/>
                </div>
                <ForgotPass>
                    <Link style={{ textDecoration: 'none' }} to="/forgotpass"><span>Forgot password?</span></Link>
                </ForgotPass>
                <div className="mb-4 mt-5">
                    <Button type="submit" className="btn" disabled={!email || !password}>Log In</Button>
                </div>
                <P className="text-center mx-auto" color="red">{errorMessage}</P>
            </form>

            <P color="grey">or</P>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_KEY}
                buttonText="Sign in with Google"
                onSuccess={googleLogin}
                cookiePolicy={'single_host_origin'}
            />

            <P color="#4D47C3" className="mt-4">Don't have an account?
                <Link style={{ textDecoration: 'none' }} to="/register"> Sign Up</Link></P>
        </InsideContent></Container>
    )
}

export default Login;