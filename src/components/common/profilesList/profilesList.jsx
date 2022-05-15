import React, {useEffect, useState} from "react";

import axios from "axios";

import UseInfiniteScroll from "../../../hooks/useInfiniteScroll";
import {IconButton} from "../../pages/profile/changeImage/ChangeImage.styled";
import {P} from "../commonStyles/General.styled";
import ProfileInList from "../profileInList/profileInList";
import {ReactComponent as CloseIcon} from "../Navbar/icons/close.svg";
import {Modal, TopDiv, Ul, CloseButton} from "./profilesList.styled";


const ProfilesList = props => {
    const [data, setData] = useState();
    const [loaded, setLoaded] = useState(false);

    useEffect(async () => {
        try {
            const res = await axios.get(`${props.url}/0`);
            setData(res.data || []);
            setLoaded(true);
        } catch {
            console.error('Could not retrieve users from server.');
        }
    }, []);

    return (props.visible && loaded ?
            <Modal ref={props.ForwardRef}>
                <TopDiv>
                    <P>{props.title}</P>
                    <CloseButton>
                        <IconButton size={'30px'}><CloseIcon onClick={props.onClose}/></IconButton>
                    </CloseButton>
                </TopDiv>
                <Ul>
                    {data.map(like => (
                        <ProfileInList key={like.displayUsername} username={like.displayUsername} src={like.profileImage}/>
                    ))}
                </Ul>
            </Modal> : null
    );
};

export default ProfilesList;