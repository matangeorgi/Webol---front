
import {useNavigate} from "react-router-dom";

import {P} from "../commonStyles/General.styled";
import {Li, ProfileImg} from "./profileInList.styled";

const ProfileInList = props => {
    const navigate = useNavigate();

    return(
        <Li onClick={() => navigate(`/${props.username}`)}>
            <ProfileImg src={props.src}/>
            <div>
                <P size={'14px'}>{props.username && props?.message}</P>
            </div>
        </Li>
    );
};

export default ProfileInList;