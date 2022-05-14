import {CloseButton, Modal, TopDiv, Ul} from "../../../common/likes/likes.styled";
import {P} from "../../../common/commonStyles/General.styled";
import React, {useEffect, useState} from "react";
import axios from "axios";
import ProfileInList from "../../../common/profileInList/profileInList";
import {IconButton} from "../changeImage/ChangeImage.styled";
import {ReactComponent as CloseIcon} from "../../../common/Navbar/icons/close.svg";

const FollowersModal = props => {
    const [followers, setFollowers] = useState([]);
    const [offset, setOffset] = useState(0);

    useEffect(async () => {
        try{
            const res = await axios.get(`user/getfollowers/${props.username}/0`);
            setFollowers(res.data);
            console.log(res.data);
        }catch{

        }
    }, [])

    return (
        <Modal ref={props.forwardRef}>
            <TopDiv>
                <P>Followers</P>
                <CloseButton>
                    <IconButton size={'30px'}><CloseIcon onClick={props.onClose}/></IconButton>
                </CloseButton>
            </TopDiv>
            <Ul>
                {followers.map(user => (
                    <ProfileInList username={user.username} src={user.profileImage}/>
                ))}
            </Ul>
        </Modal>
    )
}

export default FollowersModal;