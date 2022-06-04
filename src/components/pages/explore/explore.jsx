import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import {Body} from "../profile/Profile.styled";
import Posts from "../../common/posts/posts";
import axios from "axios";
import {Content} from "../home/home.styled";

const Explore = () => {
    const {category} = useParams();
    const [posts, setPosts] = useState();

    useEffect(() => {
        async function fetchData () {
            try{
                const res = await axios.get(`recommendation/getrecommendpost/${category}/0`)
                setPosts(res.data);
            }catch{

            }
        }
        fetchData();
    },[category])

    return(
        <Body>
            <Content>
                <Posts posts={posts}/>
            </Content>
        </Body>
    )
}

export default Explore;