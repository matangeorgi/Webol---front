import {AiOutlineLock} from 'react-icons/ai'
import {Container, InsideContent} from "../styles/Container.styled";
import {Logo, P} from "../styles/Text.styled";
import {Button, Input} from "../styles/Forms.styled";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";


const ForgotPass = () => {
    const [reset, setReset] = useState(false);
    const [email, setEmail] = useState('');
    const submit = async (e) => {
        e.preventDefault();
        await axios.post(
            "http://bdac-2a0d-6fc0-6ca-4600-1973-9ff9-e55-c247.ngrok.io/resetpass",
            //"https://httpbin.org/post",
            {email: email}
        )
        setReset(true);
    }
    if (reset){
        console.log("hey")
        return(
            <Container><InsideContent>
                <div><h5 className="mt-3">Email Sent</h5></div>
                <div>
                    <P className="mt-3 mb-3 w-75 mx-auto">An email to reset your password has been sent, please check your email for a reset link</P>
                </div>
            </InsideContent></Container>
        )}

    return (
        <Container><InsideContent>
            <div className="mt-5">
                <AiOutlineLock size='100px'></AiOutlineLock>
            </div>
            <form onSubmit={submit}>
                <div>
                    <Input className="mt-5 mb-3" type="email" name="username" placeholder="Email"
                           onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-4 mt-4">
                    <Button type="submit" className="">Reset your password</Button>
                </div>
            </form>

            <P color="#4D47C3" className="mt-4">
                <Link style={{ textDecoration: 'none' }} to="/register"> Create new account</Link></P>

            <P color="grey">OR</P>

            <P color="#4D47C3" className="mt-2 mb-4">have an account?
                <Link style={{ textDecoration: 'none' }}to="/"> Log in</Link>
            </P>
        </InsideContent></Container>
    )
}

export default ForgotPass;