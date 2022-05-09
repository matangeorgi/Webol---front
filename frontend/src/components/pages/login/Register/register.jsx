import React, {useMemo, useState} from "react";

import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

import {Button} from "../../../common/commonStyles/General.styled";
import Google from "../../../common/googleLogin/GoogleLogin";
import {Container, InsideContent} from "../Container.styled.js";
import {Input, Logo, P} from "../Forms.styled";

const Register = () => {
    const navigate = useNavigate();
    const [errorMessage, setError] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullname] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        const userDetails = {email, username, fullName, password};
        try {
            await axios.post('register', userDetails);
            navigate('/');
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    const inputFields = useMemo(() => (
        [
            {
                type: 'text',
                placeholder: 'Email',
                onChange: setEmail
            },
            {
                type: 'text',
                placeholder: 'Username',
                onChange: setUsername
            },
            {
                type: 'text',
                placeholder: 'Full name',
                onChange: setFullname
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
            <P color="grey">Sign up and watch your favorite creators.</P>

            <Google/>

            <P color="grey" className="mt-3">or quickly sign up</P>

            <form id="test" onSubmit={submit}>
                {inputFields.map(input => (
                    <div>
                        <Input className="mb-3" type={input.type} placeholder={input.placeholder}
                               required
                               onChange={e => input.onChange(e.target.value)}/>
                    </div>
                ))}

                <div>
                    <Button type="submit" className="btn mt-5" disabled={!password || !fullName || !email} width="320px"
                            height="53px">
                        Sign up</Button>
                </div>
                <div>
                    <P className="text-center mx-auto w-75 mt-4" color="red">{errorMessage}</P>
                </div>
            </form>
            <P color="#4D47C3" className="mt-3 mb-4">have an account?
                <Link style={{textDecoration: 'none'}} to="/"> Log in</Link></P>

        </InsideContent></Container>
    );
};
export default Register;