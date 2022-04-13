
import {useNavigate} from "react-router-dom";

import {P} from "../GeneralStyles/General.styled";
import {Li, ProfileImg} from "./profileInList.styled";

const ProfileInList = props => {
    const navigate = useNavigate();

    return(
        <Li onClick={() => navigate(`/${props.username}`)}>
            <ProfileImg src={props.src}/>
            <div>
                <P>{props.username}</P>
            </div>
        </Li>
    );
};

export default ProfileInList;