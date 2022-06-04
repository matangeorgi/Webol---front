import React, {useContext, useEffect, useMemo, useState} from "react";

import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

import {Button} from "../../../common/commonStyles/General.styled";
import Google from "../../../common/googleLogin/GoogleLogin";
import {Container, InsideContent} from "../Container.styled.js";
import {Input, Logo, P} from "../Forms.styled";
import {ForgotPass, ForgotPassDiv} from "./Login.styled";

const Login = () => {
    const navigate = useNavigate();
    const [errorMessage, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
       navigate('/');
    },[])

    const submit = async e => {
        e.preventDefault();
        const user = {username, password};

        try {
            const response = await axios.post('login', user);
            console.log(response.data);
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("token", response.data.auth_token);
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("profileImage", response.data.profileImage);
            window.location.reload();
        } catch (error) {
            setError(error.response?.data.error);
        }

    };

    const inputFields = useMemo(() => (
        [
            {
                type: 'text',
                placeholder: 'Email or username',
                onChange: setUsername
            },
            {
                type: 'password',
                placeholder: 'Password',
                onChange: setPassword
            }
        ]
    ),[]);

    return (
        <Container><InsideContent>
            <div className="mt-3">
                <Logo>Webol</Logo>
            </div>
            <form onSubmit={submit}>
                {inputFields.map(input => (
                    <div key={input.placeholder}>
                        <Input className="mt-3 mb-3" type={input.type} placeholder={input.placeholder}
                               required
                               onChange={e => input.onChange(e.target.value)}/>
                    </div>
                ))}

                <ForgotPassDiv>
                    <ForgotPass>
                        <Link style={{textDecoration: 'none'}} to="/forgotpass"><span>Forgot password?</span></Link>
                    </ForgotPass>
                </ForgotPassDiv>

                <div className="mb-4 mt-5">
                    <Button type="submit" disabled={!username || !password} width="320px" height="53px">Log
                        In</Button>
                </div>

                <P className="text-center mx-auto" color="red">{errorMessage}</P>
            </form>

            <P color="grey">or</P>
            <Google/>

            <P color="#4D47C3" className="mt-4">Don't have an account?
                <Link style={{textDecoration: 'none'}} to="/register"> Sign Up</Link></P>
        </InsideContent></Container>
    );
};

export default Login;