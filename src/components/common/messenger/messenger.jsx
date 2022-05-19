
import {
    MessengerDiv,
    MinimizeDiv,
    NameOfChat, OnlineBadge,
    ProfileImage,
    ProfileInChat,
    SideBar,
    TextAreDiv
} from "./messenger.styled";
import './messenger.css';
import { ReactComponent as ArrowIcon } from '../Navbar/icons/arrow.svg';
import { ReactComponent as ChatIcon } from '../Navbar/icons/chat.svg';

import React, {useState, useEffect, useRef, useMemo} from 'react';
import { CSSTransition } from 'react-transition-group';
import {ProfileImg} from "../post/Post.styled";
import Message from "./message/message";
import ResizeTextArea from "../resizeTextArea/resizeTextArea";
import {PostButton} from "../newPost/newPost.styled";
import useClickOutside from "../../../hooks/useClickOutside";
import axios from "axios";
import {NumberBadge} from "./messenger.styled"

const Messenger = props => {
    const [conversation, setConversation] = useState([]);
    const [message, setMessage] = useState('');
    const [activeChatId, setActiveChatId] = useState(null);
    const [activeChat, setActiveChat] = useState('main');
    const [sideBarHeight, setSideBarHeight] = useState(null);
    const [width, setWidth] = useState((window.innerWidth - 900)/2- 30);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [users, setUsers] = useState([]);
    const dropdownRef = useRef(null);

    const sideBarRef = useClickOutside(() => {
        setOpenSidebar(false);
        setConversation([]);
    })

    useEffect(() => {
        async function openChat() {
            const res = await axios.get(`message/getmessages/${props.userId}/0`);
            setConversation(res.data);
            setActiveChat(props.username)
            setOpenSidebar(true);
            props.setMessaged(false);
        }
        if (props.messaged)
            openChat();
    },[props.messaged])

    useEffect(async () => {
        try{
            const res = await axios.get('message/getusersmessages');
            setUsers(res.data)
            console.log(res.data);
        }catch{

        }

        const handleResize = () => {
            setWidth((window.innerWidth - 900)/2 - 30);
        }
        window.addEventListener('resize',handleResize)
        return () => {
            window.removeEventListener('resize',handleResize);
        }
    },[])

    useEffect(() => {
        setSideBarHeight(users.length * 70);
    },[users])

    const right = useMemo(() => {
        if(width > 250)
            return Math.max(( (width/2 )- 10),115);
        else return 100;
    },[width])

    useEffect(() => {
        setSideBarHeight(dropdownRef.current?.firstChild.offsetHeight);
    }, [])

    function calcHeight(el) {
        setSideBarHeight(users.length * 70);
    }

    const openSpecificChat = async(specificChat) => {
        if (specificChat === 'main')
        {
            setActiveChat('main');
            setConversation([])
        }
        else
        {
            const res = await axios.get(`message/getmessages/${specificChat.id}/0`);
            setConversation(res.data);
            setActiveChatId(specificChat.id);
            setActiveChat(specificChat.displayUsername);
        }
    }

    function DropdownItem(props) {
        return (
            <ProfileInChat key={props.goToChat.id} onClick={() => openSpecificChat(props.goToChat)}>
                {props.leftIcon? <ProfileImage>{props.leftIcon}</ProfileImage> : null}
                {props.children}
                {props.rightIcon? <ProfileImage>{props.rightIcon}</ProfileImage> : null}
                {props.goToChat.messages ? <NumberBadge>{props.goToChat.messages}</NumberBadge> : null}
            </ProfileInChat>
        );
    }

    const sendMessage = async() => {
        try{
            await axios.post('message/sendmessage',{
                recipient:activeChatId,
                message:message
            })
            setMessage('');
            setConversation(conversation => [...conversation,{message:message,isMe:true}])
        }catch{

        }
    }

    return (width > 250 || openSidebar?
        <MessengerDiv  ref={sideBarRef}>
            <SideBar style={{height: sideBarHeight,width: width, right:-right}} ref={dropdownRef}>
                <CSSTransition
                    in={activeChat === 'main'}
                    timeout={500}
                    classNames="menu-primary"
                    unmountOnExit
                    onEnter={calcHeight}>
                    <div className="menu">
                        {users.map(user => (
                            <DropdownItem
                                leftIcon={<ProfileImg src={user.profileImage} alt="Profile image"/>}
                                goToChat={user}>
                                {user.displayUsername}
                            </DropdownItem>
                        ))}
                    </div>
                </CSSTransition>

                <CSSTransition
                    in={activeChat !== 'main'}
                    timeout={500}
                    classNames="menu-secondary"
                    unmountOnExit
                    onEnter={() => setSideBarHeight(400)}>
                    <div className="menu">
                        <DropdownItem goToChat="main" rightIcon={<ArrowIcon />}>
                            <h2>All Chats</h2>
                        </DropdownItem>
                        <NameOfChat>
                            <p>{activeChat}</p>
                        </NameOfChat>
                        <div>
                            {conversation.map(message => (
                                <Message key={message.id} isMine={message.isMe}>{message.message}</Message>
                            ))}
                        </div>

                        <TextAreDiv>
                            <ResizeTextArea
                                text={message}
                                setText={setMessage}
                                placeholder="Message..."/>
                            <PostButton onClick={sendMessage}>Send</PostButton>
                        </TextAreDiv>
                    </div>
                </CSSTransition>
            </SideBar>
        </MessengerDiv>
            :
            <MinimizeDiv onClick={() => setOpenSidebar(true)}>
                <ChatIcon/>
                <OnlineBadge/>
            </MinimizeDiv>
    );
}

export default Messenger;