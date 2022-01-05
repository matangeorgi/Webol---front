import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Login, Register, ForgotPass, ResetPass } from '../src/components/login/index';
import Home from "./components/home/home";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

axios.defaults.headers.common['auth_token'] = localStorage.getItem('token');

const App = () => {

    const verified = localStorage.getItem('token');
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={true ? <Home /> : <Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/forgotpass" element={<ForgotPass />}/>
                    <Route path="/resetpass/:id/:token" element={<ResetPass />}/>
                    {/*<Route render={() => <Redirect to={{pathname: "/"}} />} />*/}
                </Routes>
            </Router>
        </div>
    );
};

export default App;