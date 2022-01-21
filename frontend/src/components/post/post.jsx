import {
    PostBody,
    PostBottom,
    ProfileImg,
    LikeCounter,
    PostCenter,
    PostTop,
    PostImage,
    PostTopLeft,
    PostWrapper,
    PostBottomLeft
}
from "./Post.styled";
import {P} from "../GeneralStyles/General.styled";
import {useState} from "react";
import {BsThreeDotsVertical} from "react-icons/bs";
import {AiFillHeart} from "react-icons/ai";

const Post = (props) => {
    const [liked,setLiked] = useState(props.liked)
    const [likes,setLikes] = useState(props.likes);

    const likeHandler =()=>{
        setLiked(!liked)
        setLikes(liked? likes-1 : likes+1)
        // Post to server this have been liked.
    }

    return (
        <PostBody>
            <PostWrapper>
                <PostTop>
                    <PostTopLeft>
                        <ProfileImg src={props.profileurl} alt="Post image"/>
                        <P>{props.fullname}</P>
                        <P color="grey">{props.date}</P>
                    </PostTopLeft>
                    <div className="postTopRight">
                        <BsThreeDotsVertical />
                    </div>
                </PostTop>
                <PostCenter>
                    <P>{props.desc}</P>
                    <PostImage src={props.url}/>
                </PostCenter>
                <PostBottom>
                    <PostBottomLeft>
                        <AiFillHeart onClick={likeHandler} color={liked? 'red': ''} size={liked? '20px' : ''}/>
                        <LikeCounter>&nbsp; {likes} people liked it</LikeCounter>
                    </PostBottomLeft>
                    <div className="postBottomRight">
                        <LikeCounter>{props.comment} comments</LikeCounter>
                    </div>
                </PostBottom>
            </PostWrapper>
        </PostBody>
    );
}

export default Post;