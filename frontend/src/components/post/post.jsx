import {useRef, useState,useEffect} from "react";

import axios from "axios";
import {AiFillHeart} from "react-icons/ai";
import {BsThreeDotsVertical} from "react-icons/bs";

import {P} from "../GeneralStyles/General.styled";
import {PostButton} from "../newPost/newPost.styled";
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
    PostBottomLeft, CommentArea
}
    from "./Post.styled";

const Post = (props) => {
    const commentRef = useRef();
    const [liked, setLiked] = useState(props.liked);
    const [likes, setLikes] = useState(props.likes);
    const [comments,setComments] = useState(props.comment);
    const [text, setText] = useState("");
    const [textAreaHeight, setTextAreaHeight] = useState("auto");

    useEffect(() => {
        setTextAreaHeight(`${commentRef.current?.scrollHeight}px`);
    }, [text]);

    const likeHandler = async() => {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
        try {
            await axios.get(`global/addordeletelike/${props.id}`);
        }
        catch{
            console.log("Couldn't pass the like to the server.");
        }
    };

    const onChangeHandler = e => {
        setTextAreaHeight("auto");
        setText(e.target.value);
    };

    const postComment = async() => {
        const data = {content:text,postId:props.id};
        try {
            await axios.post('global/addcomment',data);
            setComments(comments+1);
            setText("");
        }
        catch(e){
            console.log("Couldn't pass the comment to the server.");
        }
    };

    return (
        <PostBody key={props.id}>
            <PostWrapper>
                <PostTop>
                    <PostTopLeft>
                        <ProfileImg src={props.profileurl} alt="Post image"/>
                        <P>{props.fullname}</P>
                        <P color="grey">{props.date}</P>
                    </PostTopLeft>
                    <div className="postTopRight">
                        <BsThreeDotsVertical/>
                    </div>
                </PostTop>
                <PostCenter>
                    <P>{props.desc}</P>
                    {props.url? <PostImage src={props.url}/>:null}
                </PostCenter>
                <PostBottom>
                    <PostBottomLeft>
                        <AiFillHeart onClick={likeHandler} color={liked ? 'red' : ''} size={liked ? '20px' : ''}/>
                        <LikeCounter>&nbsp; {likes} people liked it</LikeCounter>
                    </PostBottomLeft>
                    <div className="postBottomRight">
                        <LikeCounter>{comments} comments</LikeCounter>
                    </div>
                </PostBottom>
                <hr/>
                <div className="d-flex">
                    <CommentArea
                        value={text}
                        placeholder="Write your comment here..."
                        onChange={onChangeHandler}
                        height={textAreaHeight}
                        ref={commentRef}
                    />
                    <div>
                        <PostButton className="mx-2" onClick={postComment}>Post</PostButton>
                    </div>
                </div>

            </PostWrapper>
        </PostBody>
    );
};

export default Post;