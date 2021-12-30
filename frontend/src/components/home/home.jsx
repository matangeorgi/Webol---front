import Topbar from "./Topbar/Topbar";
import ImageUpload from "./ImageUpload"
import axios from "axios";

const Home = () => {
    const test = async (e) => {
        try {
            const response = await axios.get('matan')
            console.log(response);
        }
        catch(error){
            if (error.response.status === 401) {
                axios.defaults.headers.common['auth_token'] ='';
                localStorage.removeItem('token')
                window.location.reload();
            }
        }
    }

    return (
        <div>
            <Topbar></Topbar>
            <button onClick={test}>Hey</button>
            <ImageUpload></ImageUpload>
        </div>
    );
}

export default Home;