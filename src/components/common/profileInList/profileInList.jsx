
import {useNavigate} from "react-router-dom";

import {P} from "../commonStyles/General.styled";
import {Li, ProfileImg} from "./profileInList.styled";

const ProfileInList = props => {
    const navigate = useNavigate();
    console.log(props.children)

    return(
        <Li onClick={() => navigate(`/${props.route}`)}>
            <ProfileImg src={props.src}/>
            <div>
                <P size={'14px'}>{props.children}</P>
            </div>
        </Li>
    );
};

export default ProfileInList;