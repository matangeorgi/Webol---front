import 'react-loading-skeleton/dist/skeleton.css';
import {useState} from "react";

import axios from "axios";
import {BsFillUnlockFill} from "react-icons/bs";
import {useNavigate, useParams} from "react-router-dom";

import useClickOutside from "../../../hooks/useClickOutside";
import UseInfiniteScroll from "../../../hooks/useInfiniteScroll";
import {P, Button} from "../../common/commonStyles/General.styled";
import NewPost from "../../common/newPost/newPost";
import Posts from "../../common/posts/posts";
import ResizeTextArea from "../../common/resizeTextArea/resizeTextArea";
import Topbar from "../../common/Topbar/Topbar";
import ChangeImage from "./changeImage/changeImage";
import {
    ProfileImg,
    ProfileImgDiv,
    ThemeImage,
    Images,
    Body,
    MiddleDiv,
    Content,
    LockIcon,
    BioInput
} from "./Profile.styled";

const Profile = () => {
    const navigate = useNavigate();
    const {username} = useParams();
    const [offset, setOffset] = useState(20);
    const [data, setData] = useState(getData);
    const [loaded, setLoaded] = useState(false);
    const [visible, setVisible] = useState(false);
    const [modalDetails, setModalDetails] = useState();
    const [isFollowed, setFollowed] = useState(false);
    const [isMyProfile, setIsMyProfile] = useState(true);
    const [editBio, setEditBio] = useState(false);
    const [bioInput, setBioInput] = useState();
    const [posts, setPosts] = useState([]);
    const [endOfPosts, setEndOfPosts] = useState();

    const refChangeImage = useClickOutside(() => {
        setVisible(false);
    });

    UseInfiniteScroll(true,offset,setOffset, setPosts, posts, `user/getmoreuserpost/${username}/${offset}`);

    let refBio = useClickOutside(async() => {
        setEditBio(false);
        if(editBio)
        {
            try{
                await axios.put('update/updatebio',{bio:bioInput});
            }catch{
                console.error("Couldn't update bio");
            }
        }
    });

    async function getData() {
        try {
            const res = await axios.get(`user/${username}`);
            console.log(res.data);
            setPosts(res.data[2].post);
            setIsMyProfile(res.data[0]);
            setFollowed(res.data[1]);
            setData(res.data[2]);
            setBioInput(res.data[2].bio);
            setLoaded(true);
        } catch {
            navigate('/NotFound');
        }
    }

    const ChangeProfile = () => {
        if (isMyProfile) {
            setModalDetails({
                image: 'Profile Image',
                url: data.profileImage,
                serverURL: 'profileImage'
            });
            setVisible(true);
        }
    };

    const ChangeTheme = () => {
        if (isMyProfile) {
            setModalDetails({
                image: 'Theme Image',
                url: data.themeImage,
                serverURL: 'themeImage'
            });
            setVisible(true);
        }
    };

    const handleFollow = async() => {
        try {
            await axios.get(`user/addordeletefollower/${data.id}`);
            window.location.reload();
        } catch {

        }
    };

    const ContentLocked = () => {
        return (
            <div className="mt-5 mb-5">
                <hr style={{color: "#5450bd"}}/>
                <P className="d-flex justify-content-center">{`Follow ${data.fullName} to unlock his content`}</P>
                <LockIcon onClick={handleFollow}>
                    <BsFillUnlockFill size="25px"/>
                </LockIcon>
            </div>
        );
    };

    return loaded ? (
        <div>
            <Topbar/>
            <ChangeImage
                forwardRef={refChangeImage}
                open={visible}
                onClose={() => setVisible(false)}
                data={modalDetails}>
            </ChangeImage>

            <Body>
                <Images className="mt-2">
                    <ThemeImage
                        src={data.themeImage}
                        className='mx-auto rounded'
                        alt="Theme image"
                        onClick={ChangeTheme}
                        clickAble={isMyProfile}/>

                    <ProfileImgDiv>
                        <ProfileImg
                            src={data.profileImage}
                            alt="Profile image"
                            onClick={ChangeProfile}
                            clickAble={isMyProfile}/>
                        <P size="20px" className="mt-2">{data.fullName}</P>
                    </ProfileImgDiv>
                </Images>

                <MiddleDiv>
                    {!isMyProfile ?
                        <div>
                            <Button width="105px" height="45px" onClick={handleFollow}>
                                {isFollowed? "UnFollow":"Follow"}
                            </Button>
                            <Button width="105px" height="45px">Message</Button>
                        </div> : null}

                    <div>
                        <P size="14px"><b>{data.followers} followers &emsp; {data.posts} posts &emsp; {data.role}</b></P>
                    </div>

                </MiddleDiv>

                <Content>
                    {isMyProfile && editBio ?
                        <BioInput>
                            <ResizeTextArea
                                ForwardRef={refBio}
                                text={bioInput}
                                setText={setBioInput}
                                borderStyle="dashed"/>
                        </BioInput> :
                        <P onClick={() => setEditBio(true)} style={{cursor: isMyProfile? "pointer" : ""}}>{bioInput}</P>}

                    {isMyProfile ? <NewPost profileurl={data.profileImage}/> : null}
                    {isFollowed || isMyProfile ?
                        <Posts
                            posts={posts}
                            userId={data.id}
                            profileImage={data.profileImage}
                            username={data.username}/>
                        :
                        <ContentLocked/>}

                </Content>
            </Body>
        </div>
    ) : (<></>);
};

export default Profile;