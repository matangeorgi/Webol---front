import Topbar from "../../components/Topbar/Topbar";
import ImageUpload from "../../components/media/ImageUpload";
import { ProfileImg, ProfileImgDiv, ThemeImage, Images, Body, MiddleDiv, Content } from "./Profile.styled";
import {P,Button} from "../../components/GeneralStyles/General.styled";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Post from "../../components/post/post";

const Profile = () => {
    let data = {
        fullname: 'Matan George',
        followers: 1456,
        media: 120,
        bio: 'Dick Broken 3rd year cs student. looking for cool ways to die, anyone is invited to die with me. asd asd asd as d',
        role : 'Musician/Band',
        profileImageUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        //profileImageUrl: 'https://webolhac.s3.eu-central-1.amazonaws.com/profile.png',
        themeImageUrl: 'https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325466/man-walking-dog.jpg'
    }

    const navigate = useNavigate();
    const { username } = useParams();
    const [themeImage, setThemeImage] = useState(window.innerWidth >= 920);

    useEffect(async () => {
        function handleResize() {
            if (window.innerWidth < 920) // const
                setThemeImage(false);
            else
                setThemeImage(true);

        }
        try{
            const res = await axios.get(username);
            data = res.data;
        } catch {
            navigate('/NotFound');
        }


        window.addEventListener('resize', handleResize)
    },[])

    return(
        <>
            <Topbar></Topbar>
            <Body className="bg-white mx-auto mt-2">
                <Images className="mt-2">
                    <ThemeImage src={data.themeImageUrl} className={`mx-auto d-block rounded ${themeImage? '':'d-none'}`} alt="Theme image"/>
                    <ProfileImgDiv>
                        <ProfileImg src={data.profileImageUrl} alt="Profile image"/>
                        <P size="20px">{data.fullname}</P>
                    </ProfileImgDiv>
                </Images>

                <MiddleDiv>
                    <div>
                        <Button width="105px" height="45px" className="">Follow</Button>
                        <Button width="105px" height="45px">Message</Button>
                    </div>
                    <div>
                        <P size="14px"><b>{data.followers} followers &emsp; {data.media} media &emsp; {data.role}</b></P>
                    </div>
                </MiddleDiv>

                <Content>
                    <P>{data.bio}</P>
                    <Post className="col-5"
                          profileurl={data.profileImageUrl}
                          url={data.themeImageUrl}
                          fullname={data.fullname}
                          date={'10/12/21'}
                          desc={'Wakin up in the morning'}
                          likes={20}
                          comment={3}
                    />
                    <Post className="col-5"
                          profileurl={data.profileImageUrl}
                          url={data.themeImageUrl}
                          fullname={data.fullname}
                          date={'10/12/21'}
                          desc={'Wakin up in the morning'}
                          likes={20}
                          comment={3}
                    />
                </Content>
            </Body>
        </>
    )
}

export default Profile;