import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Login, Register, ForgotPass, ResetPass } from './pages/login/index';
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
axios.defaults.headers.common['auth_token'] = localStorage.getItem('token');

const App = () => {

    const verified = localStorage.getItem('token');
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={verified ? <Home /> : <Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/forgotpass" element={<ForgotPass />}/>
                    <Route path="/resetpass/:id/:token" element={<ResetPass />}/>
                    <Route path="/:username" element={<Profile />}/>
                    {/*<Route render={() => <Redirect to={{pathname: "/"}} />} />*/}
                </Routes>
            </Router>
        </div>
    );
};

export default App;