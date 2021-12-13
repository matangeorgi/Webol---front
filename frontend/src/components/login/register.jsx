import React, {useState} from "react";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://8080-2a0d-6fc0-6f7-400-9181-b26-ad3f-2c4e.ngrok.io/register', {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify({
                email:email,
                fullname: fullname,
                username:username,
                password:password
            })
        });
        console.log(email,fullname,username,password);
        const content = await response.json();
        console.log(content);
    }

    return(
        <div className="base-container">
            <div className="content">
                <div className="mt-4">
                    <h2>Webol</h2>
                </div>
                <p>Sign up and have better experience.</p>
                <p className="orContinue">or continue with</p>
                <img src="https://developers.google.com/identity/images/g-logo.png"
                     alt="Google auth icon" className="mb-4"/>
                <form id="test" className="form" onSubmit={submit}>
                    <div className="form-group mb-3">
                        <input type="email" name="email" placeholder="Email" required
                               onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group mb-3">
                        <input type="text" name="fullname" placeholder="Full Name" required
                               onChange={e => setFullname(e.target.value)}/>
                    </div>
                    <div className="form-group mb-3">
                        <input type="text" name="Username" placeholder="Username" required
                            onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className="form-group mb-3">
                        <input type="password" name="password" placeholder="Password" required
                               onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="footer">
                        <button type="submit" className="btn">Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Register;