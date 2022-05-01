import React, {useEffect, useState} from "react";

import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

import {P} from "../../components/GeneralStyles/General.styled";
import {Ul, TopDiv} from "../../components/likes/likes.styled";
import Post from "../../components/post/post";
import {Li, ProfileImg} from "../../components/profileInList/profileInList.styled";
import {ReactComponent as CloseIcon} from "../../components/Topbar/icons/close.svg";
import Topbar from "../../components/Topbar/Topbar";
import {IconButton} from "../profile/changeImage/ChangeImage.styled";
import {CommentsDiv, Page, Comment, CloseButton} from "./postPage.styled";

const PostPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [data, setData] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(async () => {
        try {
            const res = await axios.get(`global/getcomments/${id}`);
            setData(res.data);
            setLoaded(true);
        } catch {

        }
    }, []);

    async function deleteComment(id) {
        try {
            await axios.get(`global/deletecomment/${id}`);
            window.location.reload();
        } catch {

        }
    }

    const Comments = props => {
        return (
            <Comment>
                <Li>
                    <ProfileImg src={props.src} onClick={() => navigate(`/${props.username}`)}/>
                    <P onClick={() => navigate(`/${props.username}`)}>{props.username}</P>
                    <P color="grey" size="14px">&nbsp; {props.date} </P>
                    {props.isMine ?
                        <CloseButton>
                            <IconButton size={'20px'}>
                                <CloseIcon onClick={() => deleteComment(props.id)}/>
                            </IconButton>
                        </CloseButton> : null}
                </Li>
                <P size="14px">{props.comment}</P>
                <hr/>
            </Comment>
        );
    };

    return (loaded ?
            <div>
                <Topbar/>
                <Page>
                    <Post className="col-5"
                          id={id}
                          profileurl={data.user["profileImage"]}
                          url={data.url}
                          fullname={data.user["username"]}
                          date={data.createdAt}
                          desc={data.description}
                          likes={data.likes}
                          comment={data.comments}
                          liked={data.like}
                    />
                    <CommentsDiv>
                        <TopDiv>
                            <P>Comments</P>
                        </TopDiv>
                        <Ul>
                            {data.comment.map(comment => (
                                <Comments
                                    key={comment.id}
                                    id={comment.id}
                                    src={comment.user["profileImage"]}
                                    username={comment.user["username"]}
                                    comment={comment.content}
                                    date={comment.createdAt}
                                    isMine={comment.isMe}
                                />
                            ))}
                        </Ul>
                    </CommentsDiv>
                </Page>
            </div> : null
    );
};

export default PostPage;