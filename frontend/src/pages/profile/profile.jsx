import 'react-loading-skeleton/dist/skeleton.css';
import {useState} from "react";

import axios from "axios";
import {LoremIpsum} from "lorem-ipsum";
import {BsFillUnlockFill} from "react-icons/bs";
import {useNavigate, useParams} from "react-router-dom";

import {P, Button} from "../../components/GeneralStyles/General.styled";
import NewPost from "../../components/newPost/newPost";
import Post from "../../components/post/post";
import Topbar from "../../components/Topbar/Topbar";
import useOutsiderAlerter from "../../hooks/outsideAlerter";
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
    // const data = {
    //     fullName: 'Matan',
    //     follow: 1456,
    //     media: 120,
    //     bio: new LoremIpsum().generateWords(30),
    //     role: 'Musician/Band',
    //     profileImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    //     themeImage: 'https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325466/man-walking-dog.jpg'
    // };

    const navigate = useNavigate();
    const {username} = useParams();
    const [data, setData] = useState(getData);
    const [loaded, setLoaded] = useState(false);
    const [visible, setVisible] = useState(false);
    const [modalDetails, setModalDetails] = useState();
    const [isFollowed, setFollowed] = useState(false);
    const [isMyProfile, setIsMyProfile] = useState(true);
    const [editBio, setEditBio] = useState(false);
    const [bioInput, setBioInput] = useState(data.bio || `Welcome to ${data.fullName} profile!`);

    const refChangeImage = useOutsiderAlerter(() => {
        setVisible(false);
    });

    const refBio = useOutsiderAlerter(() => {
        setEditBio(false);
        // Send new bio to backend
    });

    async function getData() {
        try {
            const res = await axios.get(`user/${username}`);
            console.log(res.data);
            setIsMyProfile(res.data[0]);
            setFollowed(res.data[1]);
            setData(res.data[2]);
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

    const Posts = () => {
        return (data.post ?
                <div>
                    {data.post.map(post => (
                        <Post className="col-5"
                              key={post.id}
                              id={post.id}
                              profileurl={data.profileImage}
                              url={post.url}
                              fullname={data.fullName}
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

    return loaded ? ( // should be loaded instead of true
        <>
            <Topbar/>
            <ChangeImage
                forwardRef={refChangeImage}
                open={visible}
                onClose={() => setVisible(false)}
                data={modalDetails}>
            </ChangeImage>

            <Body className="bg-white mx-auto mt-2">
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
                        <P size="14px"><b>{data.followers} followers &emsp; {data.media} media &emsp; {data.role}</b></P>
                    </div>

                </MiddleDiv>

                <Content className="mx-auto">
                    {isMyProfile && editBio ?
                        <BioInput
                            maxLength="150"
                            ref={refBio}
                            defaultValue={bioInput}
                            onChange={e => setBioInput(e.target.value)}/> :
                        <P onClick={() => setEditBio(true)} style={{cursor: "pointer"}}>{bioInput}</P>}

                    {isMyProfile ? <NewPost profileurl={data.profileImage}/> : null}
                    {isFollowed || isMyProfile ? <Posts/> : <ContentLocked/>}
                </Content>
            </Body>
        </>
    ) : (<></>);
};

export default Profile;