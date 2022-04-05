import 'react-loading-skeleton/dist/skeleton.css';
import {useEffect, useState} from "react";

import axios from "axios";
import {LoremIpsum} from "lorem-ipsum";
import {BsFillUnlockFill} from "react-icons/bs";
import Skeleton from 'react-loading-skeleton';
import {useNavigate, useParams} from "react-router-dom";

import {P, Button} from "../../components/GeneralStyles/General.styled";
import Post from "../../components/post/post";
import Topbar from "../../components/Topbar/Topbar";
import useOutsiderAlerter from "../../hooks/outsideAlerter";
import ChangeImage from "./changeImage/changeImage";
import {ProfileImg, ProfileImgDiv, ThemeImage, Images, Body, MiddleDiv, Content, LockIcon} from "./Profile.styled";

const Profile = () => {
    const data = {
        fullname: 'Matan',
        followers: 1456,
        media: 120,
        bio: new LoremIpsum().generateWords(30),
        role: 'Musician/Band',
        profileImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        themeImage: 'https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325466/man-walking-dog.jpg'
    };

    const navigate = useNavigate();
    const {username} = useParams();
    //const [data, setData] = useState(getData);
    const [loaded, setLoaded] = useState(false);
    const [visible, setVisible] = useState(false);
    const [modalDetails, setModalDetails] = useState();
    const [isFollowed, setFollowed] = useState();

    const ref = useOutsiderAlerter(() => {
        setVisible(false);
    });

    async function getData() {
        try {
            const res = await axios.get(`user/${username}`);
            //setData(res.data);
            setFollowed(res.data[0]);
            setLoaded(true);
        } catch {
            navigate('/NotFound');
        }
    }

    const ChangeProfile = () => {
        setModalDetails({
            image: 'Profile Image',
            url: data.profileImage
        });
        setVisible(true);
    };

    const ChangeTheme = () => {
        setModalDetails({
            image: 'Theme Image',
            url: data.themeImage
        });
        setVisible(true);
    };

    const handleFollow = () => {

    };

    const ContentLocked = () => {
        return (
            <div className="mt-5 mb-5">
                <hr style={{color: "#5450bd"}}/>
                <P className="d-flex justify-content-center">{`Follow ${data.fullname} to unlock new content!`}</P>
                <LockIcon onClick={handleFollow}>
                    <BsFillUnlockFill size="25px"/>
                </LockIcon>
            </div>
        );
    };

    return !loaded ? ( // should be loaded instead of true
        <>
            <Topbar/>
            <ChangeImage
                forwardRef={ref}
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
                        onClick={ChangeTheme}/>

                    <ProfileImgDiv>
                        <ProfileImg
                            src={data.profileImage}
                            alt="Profile image"
                            onClick={ChangeProfile}/>
                        <P size="20px" className="mt-2">{data.fullname}</P>
                    </ProfileImgDiv>
                </Images>

                <MiddleDiv>
                    <div>
                        <Button width="105px" height="45px" onClick={handleFollow}>Follow</Button>
                        <Button width="105px" height="45px">Message</Button>
                    </div>
                    <div>
                        <P size="14px"><b>{data.followers} followers &emsp; {data.media} media &emsp; {data.role}</b></P>
                    </div>
                </MiddleDiv>

                <Content className="mx-auto">
                    <P>{data.bio}</P>
                    {isFollowed ?
                        <Post className="col-5"
                              profileurl={data.profileImage}
                              url={data.themeImage}
                              fullname={data.fullName}
                              date={'10/12/21'}
                              desc={'Wakin up in the morning'}
                              likes={20}
                              comment={3}
                              liked={false}
                        /> :
                        <ContentLocked/>}
                </Content>
            </Body>
        </>
    ) : (
        <>
            <Topbar/>
            <Body className="bg-white mx-auto mt-2">
                <Images className="mt-2">
                    <Skeleton width={820} height={300}
                              className='mx-auto rounded'/>
                    <ProfileImgDiv>
                        <Skeleton width={230} height={230} circle={true}/>
                        <Skeleton className="mb-3" width={200} height={30}/>
                    </ProfileImgDiv>
                </Images>

                <MiddleDiv>
                    <div>
                        <Button width="105px" height="45px" className="">Follow</Button>
                        <Button width="105px" height="45px">Message</Button>

                    </div>
                    <div>
                        <Skeleton width={300} height={30}/>
                    </div>
                </MiddleDiv>

                <Content className="mx-auto">
                    <div className="mx-auto">
                        <Skeleton width={400} height={30} count={2}/>
                    </div>
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
        </>
    );
};

export default Profile;