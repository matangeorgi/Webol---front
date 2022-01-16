import Topbar from "../../components/Topbar/Topbar";
import ImageUpload from "../../components/media/ImageUpload"
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

    const Logout = () => {
        localStorage.removeItem('token')
        window.location.reload();
    };

    const test2 = async(e) => {
        const data = {imgurl: "hesadsay"};
        const res = await axios.post('user/userimage/profile_image',data);
        //console.log(res.data.theme_images);
    }

    return (
        <div>
            <Topbar></Topbar>
            {/*<button onClick={test2}>Hey</button>*/}
            <button onClick={Logout}>Logout</button>
            {/*<ImageUpload></ImageUpload>*/}
        </div>
    );
}

export default Home;