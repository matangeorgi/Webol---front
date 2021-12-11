import { Component } from "react";
import { withRouter } from "react-router";

export class Register extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="base-container">
                <div className="content">
                    <div className="logo">
                        <h2>Webol</h2>
                    </div>
                    <form className="form">
                        <div className="form-group">
                            <input type="text" name="username" placeholder="username" />
                        </div>
                        <div className="form-group">
                            <input type="email" name="email" placeholder="email" />
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" placeholder="password" />
                        </div>
                        <div className="footer">
                            <button type="submit" className="btn">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default withRouter(Register);