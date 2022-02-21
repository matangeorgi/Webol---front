import Topbar from "../../components/Topbar/Topbar";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ProfileImg, ProfileImgDiv, ThemeImage, Images, Body, MiddleDiv, Content} from "./Profile.styled";
import {P,Button} from "../../components/GeneralStyles/General.styled";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Post from "../../components/post/post";
import ChangeImage from "./changeImage/changeImage";

const Profile = () => {
    const data = {
        fullname: 'Matan George',
        followers: 1456,
        media: 120,
        bio: 'Dick Broken 3rd year cs student. looking for cool ways to die, anyone is invited to die with me. asd asd asd as d',
        role : 'Musician/Band',
        profileImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        themeImage: 'https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325466/man-walking-dog.jpg'
    }

    const navigate = useNavigate();
    const { username } = useParams();
    const [themeImage, setThemeImage] = useState(window.innerWidth >= 920);
    //const [data, setData] = useState(getData);
    const [loaded, setLoaded] = useState(false); // always should be false
    const [modalOpen, setModalOpen] = useState(false);
    const [modalDetails, setModalDetails] = useState();

    async function getData () {
        try{
            const res = await axios.get(`user/${username}`);
            //setData(res.data);
            setLoaded(true);
        } catch {
            navigate('/NotFound');
        }
    }

    const handleFollow = async () => {

    }

    useEffect(async() => {
        function handleResize() {
            if (window.innerWidth < 920) // const
                setThemeImage(false);
            else
                setThemeImage(true);
        }
        window.addEventListener('resize', handleResize)
    },[])

    const ChangeProfile = () => {
        setModalDetails({
            image:'Profile Image',
            url: data.profileImage
        })
        setModalOpen(true);
    }

    const ChangeTheme = () => {
        setModalDetails({
            image:'Theme Image',
            url: data.themeImage
        })
        setModalOpen(true);
    }

    return loaded ? (
        <>
            <Topbar/>
            <ChangeImage
                open={modalOpen}
                onClose={()=> setModalOpen(false)}
                data={modalDetails}>
            </ChangeImage>

            <Body className="bg-white mx-auto mt-2">
                <Images className="mt-2">
                    <ThemeImage
                        src={data.themeImage}
                        className={`mx-auto d-block rounded ${themeImage? '':'d-none'}`}
                        alt="Theme image"
                        onClick={ChangeTheme}/>
                    <ProfileImgDiv>
                        <ProfileImg
                            src={data.profileImage}
                            alt="Profile image"
                            onClick={ChangeProfile}/>
                        <P size="20px">{data.fullName}</P>
                    </ProfileImgDiv>
                </Images>

                <MiddleDiv>
                    <div>
                        <Button width="105px" height="45px" className="">Follow</Button>
                        <Button width="105px" height="45px">Message</Button>
                    </div>
                    <div>
                        <P size="14px"><b>{data.media} followers &emsp; {data.media} media &emsp; {data.role}</b></P>
                    </div>
                </MiddleDiv>

                <Content className="mx-auto">
                    <P>{data.bio}</P>
                    <Post className="col-5"
                          profileurl={data.profileImage}
                          url={data.themeImage}
                          fullname={data.fullName}
                          date={'10/12/21'}
                          desc={'Wakin up in the morning'}
                          likes={20}
                          comment={3}
                          liked = {false}
                    />
                </Content>
            </Body>
        </>
    ) : (
        <>
            <Topbar/>
            <Body className="bg-white mx-auto mt-2">
                <Images className="mt-2">
                    <Skeleton width={820} height={300} className={`mx-auto d-block rounded ${themeImage? '':'d-none'}`} />
                    <ProfileImgDiv>
                        <Skeleton width={230} height={230} circle={true}/>
                        <Skeleton width={200} height={30}/>
                    </ProfileImgDiv>
                </Images>

                <MiddleDiv>
                    <div>
                        <Skeleton className='skeleton' width={105} height={45}/>
                        <Skeleton className='skeleton' width={105} height={45}/>
                    </div>
                    {/*<div>*/}
                    {/*    <Skeleton width={50} height={30}/>*/}
                    {/*    <Skeleton width={50} height={30}/>*/}
                    {/*    <Skeleton width={50} height={30}/>*/}
                    {/*</div>*/}
                </MiddleDiv>

                <Content className="mx-auto">
                    <div className="mx-auto">
                        <Skeleton width={themeImage? 750 : 400} height={30} count={2}/>
                    </div>
                    <Post className="col-5"
                          profileurl={data.profileImage}
                          url={data.themeImage}
                          fullname={data.fullName}
                          date={'10/12/21'}
                          desc={'Wakin up in the morning'}
                          likes={20}
                          comment={3}
                          liked = {false}
                    />
                </Content>
            </Body>
        </>
    )
}

export default Profile;