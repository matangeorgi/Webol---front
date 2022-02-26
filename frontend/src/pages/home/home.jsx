import axios from "axios";

import ImageUpload from "../../components/media/ImageUpload";
import Topbar from "../../components/Topbar/Topbar";

const Home = () => {
    const test = async (e) => {
        try {
            const response = await axios.get('matan');
            console.log(response);
        } catch (error) {
            if (error.response.status === 401) {
                axios.defaults.headers.common['auth_token'] = '';
                localStorage.removeItem('token');
                window.location.reload();
            }
        }
    };

    const test2 = async (e) => {
        const data = {imgurl: "hesadsay"};
        const res = await axios.post('user/userimage/profile_image', data);
        //console.log(res.data.theme_images);
    };

    return (
        <div>
            <Topbar/>
        </div>
    );
};

export default Home;