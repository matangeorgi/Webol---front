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
    const [like,setLike] = useState(false)
    const [isLiked,setIsLiked] = useState(false)

    const likeHandler =()=>{
        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
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
                        <AiFillHeart onClick={likeHandler}/>
                        <LikeCounter>&nbsp; {props.likes} people like it</LikeCounter>
                    </PostBottomLeft>
                    <div className="postBottomRight">
                        <span>{props.comment} comments</span>
                    </div>
                </PostBottom>
            </PostWrapper>
        </PostBody>
    );
}

export default Post;