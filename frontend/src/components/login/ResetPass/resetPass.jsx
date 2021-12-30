import { Container, InsideContent} from "../Container.styled.js";
import {Button, Input , P} from "../Forms.styled";
import React, {useState} from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const ResetPass = () => {
    const navigate = useNavigate();
    const { id, token} = useParams();
    const [errorMessage, setError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        const data = {
            id: id,
            password: password,
            passwordConfirm: passwordConfirm
        }

        try{
             await axios.post('updatenewpass', data, {headers:{'mail_token':token}});
             navigate('/');
        }catch (error){
            setError(error.response.data.error);
        }
    }

    return (
        <Container><InsideContent>
            <div className="mt-5">
                <h2>Reset password</h2>
            </div>
            <form onSubmit={submit}>
                <div>
                    <Input className="mt-5 mb-3" type="password" name="password" placeholder="Password"
                           onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <Input className="mt-3 mb-3" type="password" name="passwordconfirm" placeholder="Re-type your password"
                           onChange={e => setPasswordConfirm(e.target.value)} />
                </div>
                <div className="mb-4 mt-4">
                    <Button type="submit" className="">Reset</Button>
                </div>
                <P className="text-center mx-auto w-75 mt-4" color="red">{errorMessage}</P>
            </form>
        </InsideContent></Container>
    )
}

export default  ResetPass;