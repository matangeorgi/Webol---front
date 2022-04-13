import React from "react";

import axios from "axios";
import GoogleLogin from "react-google-login";

const Google = () => {
    const googleLogin = async e => {
        try {
            const response = await axios.post('googlelogin', e.profileObj);
            localStorage.setItem("token", response.data.UserInfo.auth_token);
            window.location.reload();
        } catch (error) {
            console.log(error.response.data.error);
        }
    };

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_KEY}
            buttonText="Sign in with Google"
            onSuccess={googleLogin}
            cookiePolicy={'single_host_origin'}
        />
    );
};

export default Google;