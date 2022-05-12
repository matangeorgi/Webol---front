import React, {useMemo, useState} from "react";

import axios from "axios";
import {useNavigate, useParams} from 'react-router-dom';

import {Button} from "../../../common/commonStyles/General.styled";
import {Container, InsideContent} from "../Container.styled.js";
import {Input, P} from "../Forms.styled";

const ResetPass = () => {
    const navigate = useNavigate();
    const {id, token} = useParams();
    const [errorMessage, setError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        const data = {
            id: id,
            password: password,
            passwordConfirm: passwordConfirm
        };

        try {
            await axios.post('updatenewpass', data, {headers: {'mail_token': token}});
            navigate('/');
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    const inputFields = useMemo(() => (
        [
            {
                type: 'password',
                placeholder: 'New password',
                onChange: setPassword
            },
            {
                type: 'password',
                placeholder: 'Re-type your password',
                onChange: setPasswordConfirm
            }
        ]
    ), []);

    return (
        <Container><InsideContent>
            <div className="mt-5 mb-4">
                <h2>Reset password</h2>
            </div>
            <form onSubmit={submit}>
                {inputFields.map(input => (
                    <div>
                        <Input className="mt-3 mb-3" type={input.type} placeholder={input.placeholder}
                               required
                               onChange={e => input.onChange(e.target.value)}/>
                    </div>
                ))}

                <div className="mb-4 mt-4">
                    <Button type="submit" width="320px" height="53px">Reset</Button>
                </div>
                <P className="text-center mx-auto w-75 mt-4" color="red">{errorMessage}</P>
            </form>
        </InsideContent></Container>
    );
};

export default ResetPass;