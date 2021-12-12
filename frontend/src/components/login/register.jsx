import React, {useState} from "react";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (e) => {
        e.preventDefault();

        const response = await fetch('ERROR', {
            method: 'POST',
            header: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
                email,
                password
            })
        });

        const content = await response.json();
    }

    return(
        <div className="base-container">
            <div className="content">
                <div className="logo mt-4">
                    <h2>Webol</h2>
                </div>
                <form className="form" onSubmit={submit}>
                    <div className="form-group">
                        <input type="text" name="username" placeholder="username" required
                            onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" placeholder="email" required
                               onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" placeholder="password" required
                               onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="footer">
                        <button type="submit" className="btn">Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Register;