import {MessageBody} from "./message.styled";

const Message = props => {
    return(
        <MessageBody isMine={props.isMine}>
            <p>{props.children}</p>
        </MessageBody>
    )
}

export default Message;