import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate } from "react-router-dom";
import { Container, InsideContent} from "../Container.styled.js";
import {Button, Input , Logo, P} from "../Forms.styled";
import GoogleLogin from "react-google-login";

const Register = () => {
    const navigate = useNavigate();
    const [errorMessage, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [full_name, setFullname] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        const userDetails = {email, full_name, password};
        try{
            console.log(userDetails);
            await axios.post('register', userDetails);
            navigate('/');
        }catch (error){
            setError(error.response.data.error);
        }
    }

    const test = () => {
        console.log(1);
        navigate('/');
        console.log(2);
    }

    return(
        <Container><InsideContent>
            <div className="mt-3">
                <Logo>Webol</Logo>
            </div>
            <P color="grey">Sign up and watch your favorite creators.</P>

            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_KEY}
                buttonText="Sign in with Google"
                onSuccess={(e) => console.log(e)}
                onFailure={(e) => console.log(e)}
                cookiePolicy={'single_host_origin'}
            />
            <P color="grey" className="mt-3">or quickly sign up</P>

            <form id="test" onSubmit={submit}>
                <div className="mb-3">
                    <Input type="text" name="email" placeholder="Email" required
                           onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <Input type="text" name="fullname" placeholder="Full Name" required
                           onChange={e => setFullname(e.target.value)}/>
                </div>
                <div>
                    <Input type="password" name="password" placeholder="Password" required
                           onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    <Button type="submit" className="btn mt-5" disabled={!password || !full_name || !email}>
                        Sign up</Button>
                </div>
                <div>
                    <P className="text-center mx-auto w-75 mt-4" color="red">{errorMessage}</P>
                </div>
            </form>
            <P color="#4D47C3" className="mt-3 mb-4">have an account?
                <Link style={{ textDecoration: 'none' }} to="/"> Log in</Link></P>

            <button onClick={test}>asd</button>
        </InsideContent></Container>
    )
}
export default Register;