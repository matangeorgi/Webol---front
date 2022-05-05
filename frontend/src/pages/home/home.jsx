import {useCallback, useEffect, useState} from "react";

import axios from "axios";

import NewPost from "../../components/newPost/newPost";
import Post from "../../components/post/post";
import Topbar from "../../components/Topbar/Topbar";
import UsePagination from "../../hooks/usePagination";
import {Body} from "../profile/Profile.styled";
import {Content} from "./home.styled";

const Home = () => {
    const [posts, setPosts] = useState(getData);
    const [offset, setOffset] = useState(20);
    const [endOfData, setEndOfData] = useState(false);

    UsePagination(true,offset,endOfData,async() => {
        try{
            const res = await axios.get(`global/gethomepage/${offset}`);
            setOffset(offset + 20);
            if (res.data.length === 0)
                setEndOfData(true);
            else
                setPosts(posts => [...posts,...res.data]);
        }catch{

        }
    });


    const Posts = () => {
        return (posts.length ?
                <div>
                    {posts.map(post => (
                        <Post className="col-5"
                              key={post.id}
                              id={post.id}
                              userId={post.user.id}
                              profileurl={post.user.profileImage}
                              url={post.url}
                              fullname={post.user.username}
                              date={post.createdAt}
                              desc={post.description}
                              likes={post.likes}
                              comment={post.comments}
                              liked={!!post.like}
                              isMe={post.isMe}
                        />
                    ))}
                </div> : null
        );
    };

    async function getData() {
        try {
            const res = await axios.get('global/gethomepage/0');
            setPosts(res.data);
        } catch(e) {
            console.error("Couldn't retrieve data from server");
        }
    }

    return (
        <div>
            <Topbar/>
            <Body>
                <Content>
                    <NewPost profileurl={posts.profileImage}/>
                    <Posts/>
                </Content>
            </Body>
        </div>
    );
};

export default Home;