import React, {useEffect, useState} from "react";

import axios from "axios";

import {P} from "../../common/commonStyles/General.styled";
import {Button} from "../../common/commonStyles/General.styled";
import ResizeTextArea from "../../common/resizeTextArea/resizeTextArea";
import Navbar from "../../common/Navbar/Navbar";
import {Input} from "../login/Forms.styled";
import {Body} from "../profile/Profile.styled";
import {DivForm, Top, ProfileImg, Field, FieldsDiv, Hr} from "./settings.styled";

const Settings = () => {
    const [bio, setBio] = useState("");
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [nameError, setNameError] = useState();
    const [bioError, setBioError] = useState();
    const [usernameError, setUsernameError] = useState();
    const [passwordError, setPasswordError] = useState();


    useEffect(async() => {
        try {
            const res = await axios.get('update/userinfo');
            setFullName(res.data.fullName);
            setBio(res.data.bio || "");
        } catch {
            console.error("couldn't retrieve data from the server");
        }
    }, []);


    const submitChanges = async() => {
        let error = false;

        if (!fullName) {
            setNameError("Name can not be empty");
            error = true;
        } else
            setNameError("");

        if (!username) {
            setUsernameError("Username can not be empty");
            error = true;
        } else
            setUsernameError("");

        if ((password || newPassword || passwordConfirmation) &&
            !(password && newPassword && passwordConfirmation)) {
            setPasswordError("In case of password change, all passwords fields must be entered.");
            error = true;
        } else
            setPasswordError("");

        if (!error) {
            const data = {fullName, username, password, newPassword, passwordConfirmation, bio};
            try {
                const res = await axios.put('update/updatesettings',data);
                if (username)
                    localStorage.setItem("username", username);
                localStorage.setItem("token", res.data.auth_token);

                window.location.reload();
            } catch (e){
                console.log(e.response.data);
                setNameError(e.response.data?.fullName);
                setPasswordError(e.response.data?.password);
                setBioError(e.response.data?.bio);
                setUsernameError(e.response.data?.username);
            }
        }
    };

    return (
        <div>
            <Navbar/>
            <Body>
                <DivForm>
                    <Top>
                        <ProfileImg
                            src={localStorage.getItem('profileImage')}
                            alt="Profile image"/>
                        <P size={'18px'}>{localStorage.getItem('username')}</P>
                    </Top>

                    <FieldsDiv>
                        <Field>
                            <P>Name:</P>
                            <Input value={fullName} onChange={e => setFullName(e.target.value)}/>
                        </Field>
                        <P size={'14px'} color={'#a09cd5'}>This name will be displayed in your profile page.</P>
                        <P size={'14px'} color={'red'}>{nameError}</P>

                        <Field>
                            <P>Username:</P>
                            <Input value={username} onChange={e => setUsername(e.target.value)}/>
                        </Field>
                        <P size={'14px'} color={'#a09cd5'}>Choose a name that wil help people find you with ease.</P>
                        <P size={'14px'} color={'red'}>{usernameError}</P>

                        <Field>
                            <P>Bio:</P>
                            <ResizeTextArea
                                text={bio}
                                setText={setBio}
                                borderStyle="dashed"/>
                        </Field>
                        <P size={'14px'} color={'#a09cd5'}>Bio can have 150 characters.</P>
                        <P size={'14px'} color={'red'}>{bioError}</P>
                        <Hr/>

                        <P size={'18px'} color={'grey'}>Change password</P>
                        <Field>
                            <P>Current password:</P>
                            <Input value={password} type='password' onChange={e => setPassword(e.target.value)}/>
                        </Field>

                        <Field>
                            <P>New password:</P>
                            <Input type='password' onChange={e => setNewPassword(e.target.value)}/>
                        </Field>
                        <P size={'14px'} color={'#a09cd5'}>Choose a password that it will be hard to guess.</P>
                        <Field>
                            <P>Password confirmation:</P>
                            <Input type='password' onChange={e => setPasswordConfirmation(e.target.value)}/>
                        </Field>
                        <P size={'14px'} color={'red'}>{passwordError}</P>
                    </FieldsDiv>

                    <Button width="220px" height="53px" onClick={submitChanges}>Save changes</Button>
                </DivForm>
                <P size={'14px'} color={'grey'} className='mx-auto p-2'>
                    Things such as profile image, theme image and bio can be changed through profile page.
                </P>
            </Body>
        </div>
    );
};

export default Settings;