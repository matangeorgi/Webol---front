import React from "react";

import axios from "axios";
import GoogleLogin from "react-google-login";

const Google = () => {
    const googleLogin = async e => {
        try {
            const response = await axios.post('googlelogin', e.profileObj);
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("token", response.data.auth_token);
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("profileImage", response.data.profileImage);
            window.location.reload();
        } catch (error) {
            console.error(error.response?.data.error);
        }
    };

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_KEY}
            buttonText="Sign in with Google"
            onSuccess={googleLogin}
            onFailure={(e) => console.log(e)}
            cookiePolicy={'single_host_origin'}
        />
    );
};

export default Google;