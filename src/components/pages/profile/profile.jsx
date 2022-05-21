import 'react-loading-skeleton/dist/skeleton.css';
import {useEffect, useState} from "react";

import axios from "axios";
import {BsFillUnlockFill} from "react-icons/bs";
import {useNavigate, useParams} from "react-router-dom";

import useClickOutside from "../../../hooks/useClickOutside";
import UseInfiniteScroll from "../../../hooks/useInfiniteScroll";
import {P, Button} from "../../common/commonStyles/General.styled";
import NewPost from "../../common/newPost/newPost";
import Posts from "../../common/posts/posts";
import ResizeTextArea from "../../common/resizeTextArea/resizeTextArea";
import Navbar from "../../common/Navbar/Navbar";
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
import ProfilesList from "../../common/profilesList/profilesList";
import Messenger from "../../common/messenger/messenger";
import {sendNotifications, socket} from "../../../socket/socket";

const Profile = () => {
    const navigate = useNavigate();
    const {username} = useParams();
    const [data, setData] = useState();
    const [loaded, setLoaded] = useState(false);
    const [visible, setVisible] = useState(false);
    const [modalDetails, setModalDetails] = useState();
    const [isFollowed, setFollowed] = useState(false);
    const [isMyProfile, setIsMyProfile] = useState(true);
    const [editBio, setEditBio] = useState(false);
    const [bioInput, setBioInput] = useState();
    const [posts, setPosts] = useState([]);
    const [followersModal, setFollowersModal] = useState(false);
    const [messageClicked, setMessageClicked] = useState(false);

    const refChangeImage = useClickOutside(() => {
        setVisible(false);
    });

    const followersRef = useClickOutside(() => {
        setFollowersModal(false);
    })

    useEffect(async() => {
        try {
            const res = await axios.get(`user/${username}`);
            setPosts(res.data[2].post);
            setIsMyProfile(res.data[0]);
            setFollowed(res.data[1]);
            setData(res.data[2]);
            setBioInput(res.data[2].bio || `Welcome to ${username} page!`);
            setLoaded(true);
        } catch {
            navigate('/NotFound');
        }
    }, [window.location.pathname]);

    UseInfiniteScroll(true,setPosts, posts, `user/getmoreuserpost/${username}`);

    let refBio = useClickOutside(async() => {
        setEditBio(false);
        if(editBio)
        {
            try{
                await axios.put('update/updatesettings',{bio:bioInput});
            }catch{
                console.error("Couldn't update bio");
            }
        }
    });

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
            socket.emit("sendNotification",data.id);
            window.location.reload();
        } catch {
            console.error('Could not send follow to the server.');
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
            <Navbar/>
            <Messenger
            userId={data.id}
            messaged={messageClicked}
            setMessaged={setMessageClicked}
            username={username}/>
            <ChangeImage
                forwardRef={refChangeImage}
                open={visible}
                onClose={() => setVisible(false)}
                data={modalDetails}>
            </ChangeImage>

            {followersModal?
                <ProfilesList
                    ForwardRef={followersRef}
                    visible={followersModal}
                    onClose={() => setFollowersModal(false)}
                    url={`user/getfollowers/${username}`}
                    title='Followers'
                />:null}
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
                                {isFollowed? "Unfollow":"Follow"}
                            </Button>
                            <Button width="105px" height="45px" onClick={() => setMessageClicked(true)}>Message</Button>
                        </div> : null}

                    <div>
                        <div className='d-flex'>
                            <P size="14px" onClick={() => setFollowersModal(true)}><span><b>{data.followers} followers &emsp;</b></span></P>
                            <P size="14px"><b>{data.posts} posts &emsp; {data.role}</b></P>
                        </div>
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
                            username={data.displayUsername}
                            isMe={true}/>
                        :
                        <ContentLocked/>}

                </Content>
            </Body>
        </div>
    ) : (<></>);
};

export default Profile;