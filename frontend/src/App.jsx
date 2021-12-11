import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch , Link } from "react-router-dom";
import React from "react";
import {Login, Register} from "./components/login"

const App = () => {
    return (
        <div to="/">
            <Router>
                <Switch>
                    <Route path="/" exact><h1>Nothing yet baby</h1></Route>
                    <Route path="/login" component={Login}><Login /></Route>
                    <Route path="/register" component={Register}><Register /></Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
