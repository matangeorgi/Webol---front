import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Login from "./components/login/login";
import Register from "./components/login/register";
import Home from "./components/home/home";

const App = () => {
    const verified = true;
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={verified ? Home : Login}></Route>
                    <Route path="/register" component={Register}></Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
