import {CardDiv, ProfileImg} from "./card.styled";
import {P} from "../../commonStyles/General.styled";
import {useNavigate} from "react-router-dom";

const Card = props => {
    const navigate = useNavigate();

    return(
        <CardDiv>
            <ProfileImg src={props.data?.profileImage}
                        onClick={() => navigate(`/${props.data?.displayUsername}`)}/>
            <div onClick={() => navigate(`/${props.data?.displayUsername}`)}>
                <P><b>{props.data?.displayUsername}</b></P>
            </div>
            <div>
                <P>{props.data?.role}</P>
            </div>
        </CardDiv>
    )
}

export default Card;