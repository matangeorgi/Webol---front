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
import {ReactComponent as CogIcon} from "../Topbar/icons/cog.svg";
import {ReactComponent as HelpIcon} from "../Topbar/icons/help.svg";
import {ReactComponent as LogoutIcon} from "../Topbar/icons/logout.svg";
import {DropDownDiv, MenuDiv} from "../Topbar/Menu.styled";
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
    Options
}
    from "./Post.styled";


const Post = (props) => {
    const navigate = useNavigate();
    const [liked, setLiked] = useState(props.liked);
    const [likes, setLikes] = useState(props.likes);
    const [likesList, setLikesList] = useState();
    const [likesModal, setLikesModal] = useState(false);
    const [comments, setComments] = useState(props.comment);
    const [text, setText] = useState("");
    const [openOptions, setOpenOptions] = useState(false);

    const likesRef = useOutsiderAlerter(() => {
        setLikesModal(false);
    });

    const optionsRef = useOutsiderAlerter(() => {
        setOpenOptions(false);
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

    const CopyLink = async() => {
        setOpenOptions(false);

        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(`http://localhost:3000/post/${props.id}`);
        } else {
            return document.execCommand('copy', true, `http://localhost:3000/post/${props.id}`);
        }
    };

    const DeletePost = async() => {
        window.location.reload();
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
                        <ProfileImg src={props.profileurl} alt="Profile"/>
                        <P>{props.fullname}</P>
                        <P color="grey">{props.date}</P>
                    </PostTopLeft>
                    <span>
                        <BsThreeDotsVertical onClick={() => setOpenOptions(!openOptions)}/>
                        {openOptions?
                        <Options ref={optionsRef}>
                                <P size='14px' onClick={CopyLink}>Copy link</P>
                                {props.isMe?
                                    <P size='14px' onClick={DeletePost} color='red'>Delete</P>:
                                    <P size='14px'>Report</P>}
                        </Options> : null}
                    </span>
                </PostTop>
                <PostCenter>
                    <P>{props.desc}</P>
                    {props.url ? <PostImage src={props.url} onClick={() => navigate(`/post/${props.id}`)}/> : null}
                </PostCenter>
                <PostBottom>
                    <PostBottomLeft>
                        <AiFillHeart onClick={likeHandler} color={liked ? 'red' : ''} size={liked ? '20px' : ''}/>
                        <LikeCounter onClick={() => setLikesModal(true)}>&nbsp; {likes} people liked it</LikeCounter>
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