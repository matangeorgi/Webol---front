import {LoremIpsum} from "lorem-ipsum";

import NewPost from "../../components/newPost/newPost";
import Topbar from "../../components/Topbar/Topbar";
import {Body} from "../profile/Profile.styled";
import {Content} from "./home.styled";

const Home = () => {
    const data = {
        fullName: 'Matan',
        followers: 1456,
        media: 120,
        bio: new LoremIpsum().generateWords(30),
        role: 'Musician/Band',
        profileImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        themeImage: 'https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325466/man-walking-dog.jpg'
    };
    return (
        <div>
            <Topbar/>
            <Body>
                <Content>
                    <NewPost profileurl={data.profileImage}/>
                </Content>
            </Body>
        </div>
    );
};

export default Home;