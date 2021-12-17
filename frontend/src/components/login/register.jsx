import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { Container, InsideContent} from "../styles/Container.styled";
import {Logo, P} from "../styles/Text.styled";
import {Input, Button} from "../styles/Forms.styled";
import {Img} from "../styles/Images.styled";
import GoogleLogin from "react-google-login";

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
            "http://3381-82-80-173-170.ngrok.io/register",
            //"https://httpbin.org/post",
            userDetails
        );
        // console.log(email,fullname,username,password);
        // const content = await response.data();
        console.log(response.data);
    }

    return(
        <Container><InsideContent>
                <div className="mt-3">
                    <Logo>Webol</Logo>
                </div>
                <P color="grey">Sign up and watch your favorite creators.</P>

                <GoogleLogin
                    clientId=""
                    buttonText="Sign in with Google"
                    onSuccess={(e) => console.log(e)}
                    onFailure={(e) => console.log(e)}
                    cookiePolicy={'single_host_origin'}
                />
                <P color="grey" className="mt-3">or quickly sign up</P>

                <form id="test" onSubmit={submit}>
                    <div className="mb-3">
                        <Input type="email" name="email" placeholder="Email" required
                               onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <Input type="text" name="fullname" placeholder="Full Name" required
                               onChange={e => setFullname(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <Input type="text" name="Username" placeholder="Username" required
                            onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div>
                        <Input type="password" name="password" placeholder="Password" required
                               onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <Button type="submit" className="btn mt-5">Sign up</Button>
                    </div>
                </form>
                <P color="#4D47C3" className="mt-5 mb-4">have an account?
                    <Link style={{ textDecoration: 'none' }}to="/login"> Log in</Link></P>
        </InsideContent></Container>
    )
}
export default Register;