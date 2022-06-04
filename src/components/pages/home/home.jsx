import {useEffect, useState} from "react";

import axios from "axios";

import UseInfiniteScroll from "../../../hooks/useInfiniteScroll";
import NewPost from "../../common/newPost/newPost";
import Posts from "../../common/posts/posts";
import Navbar from "../../common/Navbar/Navbar";
import {Body} from "../profile/Profile.styled";
import {Content} from "./home.styled";
import Messenger from "../../common/messenger/messenger";
import UsersCarousel from "../../common/usersCarousel/usersCarousel";
import CategoriesSidebar from "../../common/categoriesSidebar/categoriesSidebar";

const Home = () => {
    const [posts, setPosts] = useState([]);
    UseInfiniteScroll(true, setPosts, posts, `global/gethomepage`);
    useEffect(async() => {
        try {
            const res = await axios.get('global/gethomepage/0');
            setPosts(res.data);
        } catch(e) {
            console.error("Couldn't retrieve data from server");
        }
    },[]);

    return (
        <div>
            <Messenger/>
            <Body>
                <Content>
                    <NewPost profileurl={posts.profileImage}/>
                    <UsersCarousel/>
                    <Posts posts={posts}/>
                </Content>
            </Body>
        </div>
    );
};

export default Home;