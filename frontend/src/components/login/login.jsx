import { Component } from "react";
import { withRouter } from "react-router";
import {Link} from "react-router-dom";
import axios from "axios";


export class Login extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = e => {
        console.log("hey");
        e.preventDefault();

        const data = {
            email: this.email,
            password: this.password
        }
        axios.post('http://2aa4-2a0d-6fc0-6f7-400-c0e1-3919-e408-618c.ngrok.io',data)
            .then(res => {
                console.log(res);
                localStorage.setItem('token',res.token);
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return(
            <div className="base-container">
                {/*<div className="header">Login</div>*/}
                <div className="content">
                    <div className="logo">
                        <h2>Webol</h2>
                    </div>
                    <form className="form" onSubmit={this.handleSubmit}>
                    {/*<div className="form">*/}
                        <div className="form-group">
                            <input className="" type="text" name="username" placeholder="Enter email or username"
                                   onChange={e => this.email = e.target.value }/>
                        </div>
                        <div className="form-group">
                            <input className="mt-5" type="password" name="password" placeholder="password"
                                   onChange={e => this.password = e.target.value }/>
                        </div>
                    {/*//</div>*/}
                    </form>
                </div>
                <div className="footer">
                    <button type="submit" className="btn btn-dark shadow">Login</button>
                </div>
                <Link to="/register">Register</Link>
            </div>
        )
    }
}

export default withRouter(Login);