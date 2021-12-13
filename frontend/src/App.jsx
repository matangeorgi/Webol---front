import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Login from "./components/login/login";
import Register from "./components/login/register";
import Home from "./components/home/home";

const App = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={Home}><Home /></Route>
                    <Route path="/login" component={Login}><Login /></Route>
                    <Route path="/register" component={Register}><Register /></Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
