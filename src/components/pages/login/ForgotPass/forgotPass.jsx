import React, {useState} from "react";

import axios from "axios";
import {AiOutlineLock} from 'react-icons/ai';
import {Link} from "react-router-dom";

import {Button} from "../../../common/commonStyles/General.styled";
import {Container, InsideContent} from "../Container.styled.js";
import {Input, P} from "../Forms.styled";

const ForgotPass = () => {
    const [errorMessage, setError] = useState('');
    const [reset, setReset] = useState(false);
    const [email, setEmail] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('resetpass', {email: email});
            setReset(true);
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    return reset ?
        (
            <Container><InsideContent>
                <div><h5 className="mt-3">Email Sent</h5></div>
                <div>
                    <P className="mt-3 mb-3 w-75 text-center mx-auto">An email to reset your password has been sent,
                        please check your email for a reset link</P>
                </div>
                <P color="#4D47C3" className="mt-1 mb-3">
                    <Link style={{textDecoration: 'none'}} to="/">Back to log in</Link></P>
            </InsideContent></Container>
        ) : (
            <Container><InsideContent>
                <div className="mt-5">
                    <AiOutlineLock size='100px'/>
                </div>
                <form onSubmit={submit}>
                    <div>
                        <Input className="mt-5 mb-3" type="email" placeholder="Email"
                               onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-4 mt-4">
                        <Button type="submit" width="320px" height="53px">Reset your password</Button>
                    </div>
                    <P className="text-center mx-auto w-75 mt-4" color="red">{errorMessage}</P>
                </form>

                <P color="#4D47C3" className="mt-4">
                    <Link style={{textDecoration: 'none'}} to="/register"> Create new account</Link></P>

                <P color="grey">OR</P>

                <P color="#4D47C3" className="mt-2 mb-4">
                    <Link style={{textDecoration: 'none'}} to="/">Back to log in</Link>
                </P>
            </InsideContent></Container>
        );
};

export default ForgotPass;