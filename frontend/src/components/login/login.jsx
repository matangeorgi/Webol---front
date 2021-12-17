import React, {useState, useEffect} from "react";
import GoogleLogin from "react-google-login";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import { Container, InsideContent,ForgotPass} from "../styles/Container.styled";
import {Logo, P} from "../styles/Text.styled";
import {Input, Button} from "../styles/Forms.styled";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();

    const submit = async e => {
        e.preventDefault();
        const user = { username, password };
        const response = await axios.post(
            //"http://3381-82-80-173-170.ngrok.io/login",
            "https://httpbin.org/post",
            user
        );
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(response.data);
    };


    //if there's a user logged in redirect to home
    if (localStorage.getItem("user")) {
        return (<Redirect to={"/"}/>);
    }

    // const reponseGoogle = response => {
    //     console.log(response);
    //     console.log(response.profileObj);
    // }

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
                clientId=""
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