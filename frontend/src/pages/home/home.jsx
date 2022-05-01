import {useEffect, useState} from "react";

import axios from "axios";

import NewPost from "../../components/newPost/newPost";
import Post from "../../components/post/post";
import Topbar from "../../components/Topbar/Topbar";
import UsePagination from "../../hooks/usePagination";
import {Body} from "../profile/Profile.styled";
import {Content} from "./home.styled";

const Home = () => {
    const [data, setData] = useState(getData);

    const paginationRef = UsePagination(() => {
        console.log("bottom");
    });

    const Posts = () => {
        return (data.length ?
                <div>
                    {data.map(post => (
                        <Post className="col-5"
                              key={post.id}
                              id={post.id}
                              profileurl={post.user.profileImage}
                              url={post.url}
                              fullname={post.user.username}
                              date={post.createdAt}
                              desc={post.description}
                              likes={post.likes}
                              comment={post.comments}
                              liked={!!post.like}
                        />
                    ))}
                </div> : null
        );
    };

    async function getData() {
        try {
            const res = await axios.get('global/gethomepage');
            setData(res.data);
        } catch {
            console.error("Couldn't retrieve data from server");
        }
    }

    return (
        <div ref={paginationRef}>
            <Topbar/>
            <Body>
                <Content>
                    <NewPost profileurl={data.profileImage}/>
                    <Posts/>
                    <Post className="col-5"
                          profileurl={data.profileImage}
                          url={data.themeImage}
                          fullname={data.fullName}
                          date={'10/12/21'}
                          desc={'Wakin up in the morning'}
                          likes={20}
                          comment={3}
                          liked={false}
                    />
                    <Post className="col-5"
                          profileurl={data.profileImage}
                          url={data.themeImage}
                          fullname={data.fullName}
                          date={'10/12/21'}
                          desc={'Wakin up in the morning'}
                          likes={20}
                          comment={3}
                          liked={false}
                    />
                    <Post className="col-5"
                          profileurl={data.profileImage}
                          url={data.themeImage}
                          fullname={data.fullName}
                          date={'10/12/21'}
                          desc={'Wakin up in the morning'}
                          likes={20}
                          comment={3}
                          liked={false}
                    />
                    <Post className="col-5"
                          profileurl={data.profileImage}
                          url={data.themeImage}
                          fullname={data.fullName}
                          date={'10/12/21'}
                          desc={'Wakin up in the morning'}
                          likes={20}
                          comment={3}
                          liked={false}
                    />
                </Content>
            </Body>
        </div>
    );
};

export default Home;