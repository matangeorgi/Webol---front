import {useRef, useState, useEffect} from "react";

import axios from "axios";
import {AiFillHeart} from "react-icons/ai";
import {BsThreeDotsVertical} from "react-icons/bs";
import {useNavigate} from "react-router-dom";

import useOutsiderAlerter from "../../hooks/outsideAlerter";
import {P} from "../GeneralStyles/General.styled";
import Likes from "../likes/likes";
import {PostButton} from "../newPost/newPost.styled";
import ResizeTextArea from "../resizeTextArea/resizeTextArea";
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
    PostBottomLeft,
}
    from "./Post.styled";


const Post = (props) => {
    const navigate = useNavigate();
    const commentRef = useRef();
    const [liked, setLiked] = useState(props.liked);
    const [likes, setLikes] = useState(props.likes);
    const [likesList, setLikesList] = useState();
    const [likesModal, setLikesModal] = useState(false);
    const [comments, setComments] = useState(props.comment);
    const [text, setText] = useState("");

    const likesRef = useOutsiderAlerter(() => {
        setLikesModal(false);
    });

    const likeHandler = async () => {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
        try {
            await axios.get(`global/addordeletelike/${props.id}`);
        } catch {
            console.log("Couldn't pass the like to the server.");
        }
    };

    const postComment = async () => {
        const data = {content: text, postId: props.id};
        try {
            await axios.post('global/addcomment', data);
            setComments(comments + 1);
            setText("");
        } catch (e) {
            console.log("Couldn't pass the comment to the server.");
        }
    };

    const openLikes = async () => {
        try {
            //axios here
            setLikesList([{
                src: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                username: "Matan"
            }, {
                src: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                username: "Matan"
            }]);
            setLikesModal(true);
        } catch {

        }
    };

    return (
        <PostBody key={props.id}>
            {likesModal?
                <Likes
                    ForwardRef={likesRef}
                    visible={likesModal}
                    likesList={likesList}
                    onClose={() => setLikesModal(false)}
                    postId={props.id}
                />:null}
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
                    {props.url ? <PostImage src={props.url} onClick={() => navigate(`/post/${props.id}`)}/> : null}
                </PostCenter>
                <PostBottom>
                    <PostBottomLeft>
                        <AiFillHeart onClick={likeHandler} color={liked ? 'red' : ''} size={liked ? '20px' : ''}/>
                        <LikeCounter onClick={openLikes}>&nbsp; {likes} people liked it</LikeCounter>
                    </PostBottomLeft>
                    <div className="postBottomRight">
                        <LikeCounter onClick={() => navigate(`/post/${props.id}`)}>{comments} comments</LikeCounter>
                    </div>
                </PostBottom>
                <hr/>
                <div className="d-flex">
                    <ResizeTextArea
                        text={text}
                        setText={setText}
                        placeholder="Write your comment here..."
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