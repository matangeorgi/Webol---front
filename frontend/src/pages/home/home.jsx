import {LoremIpsum} from "lorem-ipsum";

import NewPost from "../../components/newPost/newPost";
import Post from "../../components/post/post";
import Topbar from "../../components/Topbar/Topbar";
import {Body} from "../profile/Profile.styled";
import {Content} from "./home.styled";

const Home = () => {
    //const [data, setData] = useState(getData);

    const data = {
        fullName: 'Matan',
        followers: 1456,
        media: 120,
        bio: new LoremIpsum().generateWords(30),
        role: 'Musician/Band',
        profileImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        themeImage: 'https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325466/man-walking-dog.jpg'
    };

    // async function getData() {
    //     try {
    //         const res = await axios.get(`user/${username}`);
    //         setData(res.data);
    //     } catch {
    //         navigate('/NotFound');
    //     }
    // }

    const Posts = () => {
        return (data.post ?
                <div>
                    {data.post.map(post => (
                        <Post className="col-5"
                              key={post.id}
                              id={post.id}
                              profileurl={data.profileImage}
                              url={post.url}
                              fullname={data.username}
                              date={post.createdAt}
                              desc={post.description}
                              likes={post.likes}
                              comment={post.comments}
                              liked={post.like}
                        />
                    ))}
                </div> : null
        );
    };

    return (
        <div>
            <Topbar/>
            <Body>
                <Content>
                    <NewPost profileurl={data.profileImage}/>
                    <Posts/>
                </Content>
            </Body>
        </div>
    );
};

export default Home;