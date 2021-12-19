import {Container, InsideContent} from "../styles/Container.styled";
import {Button, Input} from "../styles/Forms.styled";
import React, {useState} from "react";
import axios from "axios";
import {Redirect, useParams} from "react-router";

const ResetPass = () => {
    const { id } = useParams()
    const [reset, setReset] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const submit = async (e) => {
        e.preventDefault();

        const data = {
            password: password,
            passwordConfirm: passwordConfirm
        }

        const response = await axios.post(
            "http://bdac-2a0d-6fc0-6ca-4600-1973-9ff9-e55-c247.ngrok.io/updatenewpass",
            data,
            {headers:{'auth_token':id}}
        )

        console.log(response.data)
        setReset(true);
    }

    if (reset)
        return <Redirect to={'/'} />

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
            </form>
        </InsideContent></Container>
)
}

export default  ResetPass;