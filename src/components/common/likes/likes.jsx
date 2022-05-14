import React, {useEffect, useState} from "react";

import axios from "axios";

import UseInfiniteScroll from "../../../hooks/useInfiniteScroll";
import {IconButton} from "../../pages/profile/changeImage/ChangeImage.styled";
import {P} from "../commonStyles/General.styled";
import ProfileInList from "../profileInList/profileInList";
import {ReactComponent as CloseIcon} from "../Navbar/icons/close.svg";
import {Modal, TopDiv, Ul, CloseButton} from "./likes.styled";


const Likes = props => {
    const [data, setData] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(async () => {
        try {
            const res = await axios.get(`global/getlikes/${props.postId}/0`);
            setData(res.data || []);
            setLoaded(true);
        } catch {

        }
    }, []);

    return (props.visible && loaded ?
            <Modal ref={props.ForwardRef}>
                <TopDiv>
                    <P>Likes</P>
                    <CloseButton>
                        <IconButton size={'30px'}><CloseIcon onClick={props.onClose}/></IconButton>
                    </CloseButton>
                </TopDiv>
                <Ul>
                    {data.map(like => (
                        <ProfileInList username={like.username} src={like.profileImage}/>
                    ))}
                </Ul>
            </Modal> : null
    );
};

export default Likes;