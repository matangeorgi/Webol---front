import {useCallback, useEffect, useState} from "react";

import axios from "axios";

import UseInfiniteScroll from "../../../hooks/useInfiniteScroll";
import NewPost from "../../common/newPost/newPost";
import Posts from "../../common/posts/posts";
import Navbar from "../../common/Navbar/Navbar";
import {Body} from "../profile/Profile.styled";
import {Content} from "./home.styled";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [offset, setOffset] = useState(20);

    UseInfiniteScroll(true,offset,setOffset, setPosts, posts, `global/gethomepage/${offset}`);

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
            <Navbar/>
            <Body>
                <Content>
                    <NewPost profileurl={posts.profileImage}/>
                    <Posts posts={posts}/>
                </Content>
            </Body>
        </div>
    );
};

export default Home;