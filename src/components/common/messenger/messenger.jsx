import {
    MessengerDiv,
    MinimizeDiv,
    NameOfChat,
    NumberBadge,
    OnlineBadge,
    ProfileImage,
    ProfileInChat,
    SideBar,
    TextAreDiv,
    ConversationDiv
} from "./messenger.styled";
import './messenger.css';
import {ReactComponent as ArrowIcon} from '../Navbar/icons/arrow.svg';
import {ReactComponent as ChatIcon} from '../Navbar/icons/chat.svg';

import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import {ProfileImg} from "../post/Post.styled";
import Message from "./message/message";
import ResizeTextArea from "../resizeTextArea/resizeTextArea";
import {PostButton} from "../newPost/newPost.styled";
import useClickOutside from "../../../hooks/useClickOutside";
import axios from "axios";
import {SocketContext} from "../../../socket/socket";
import {get, set} from "mobx";

const Messenger = props => {
    const [conversation, setConversation] = useState([]);
    const [message, setMessage] = useState('');
    const [activeChatId, setActiveChatId] = useState(null);
    const [activeChat, setActiveChat] = useState('main');
    const [sideBarHeight, setSideBarHeight] = useState(null);
    const [width, setWidth] = useState((window.innerWidth - 900) / 2 - 70);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [users, setUsers] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [marginTop, setMarginTop] = useState();
    const dropdownRef = useRef(null);
    const messagesRef = useRef();
    const socket = useContext(SocketContext);

    const sideBarRef = useClickOutside(() => {
        setOpenSidebar(false);
        setActiveChat('main')
        calcHeight();
        setConversation([]);
    })

    async function getChats(onlineUsers) {
        try {
            const res = await axios.get('message/getusersmessages');
            let allUsers = res.data;
            allUsers.forEach((user) =>{
                if (Object.keys(onlineUsers).find(onlineUser => onlineUser === user.id))
                    user.online = true;
                else
                    user.online = false;
            })
            setUsers(allUsers);
        } catch {
            console.error("Could not get users from server");
        }
    };

    useEffect(() => {
        socket.on("getUsers", (onlineUsersTemp) => {
            getChats(onlineUsersTemp);
            setOnlineUsers(onlineUsersTemp);
        });
        socket.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                message: data.text,
                isMe: false,
                createdAt: Date.now(),
            });
        });
        setSideBarHeight(dropdownRef.current?.firstChild.offsetHeight);

        const handleResize = () => {
            setWidth((window.innerWidth - 900) / 2 - 70);
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        getChats(onlineUsers);
    }, [onlineUsers])

    // Update the Conversation or the users in chat when there is new message.
    useEffect(() => {
        if (activeChat !== 'main' && arrivalMessage) {
            setConversation(conversation => [arrivalMessage,...conversation]);
        }

        else if (activeChat === 'main')
            getChats(onlineUsers);

        setArrivalMessage(null);
    }, [arrivalMessage, activeChat]);

    // When the button "message" on profile clicked it is trigger this function.
    useEffect(() => {
        async function openChat() {
            const res = await axios.get(`message/getmessages/${props.userId}/0`);
            setConversation(res.data);
            setActiveChat(props.username)
            setActiveChatId(props.userId);
            setSideBarHeight(400);
            setOpenSidebar(true);
            props.setMessaged(false);
        }

        if (props.messaged)
            openChat(onlineUsers);
    }, [props.messaged])

    // Announce of leaving of conversation.
    useEffect(async () => {
        if (activeChat === 'main' && activeChatId) {
            try {
                await axios.get(`message/leaveconversation/${activeChatId}`);
                setActiveChatId(null);
            } catch {
                console.error('Could not notify the server about leaving the chat');
            }
        }
    }, [activeChat])

    useEffect(() => {
        if (messagesRef.current?.clientHeight < 270)
            setMarginTop(messagesRef.current?.clientHeight);
        else
            setMarginTop(270);
    },[messagesRef.current?.clientHeight])

    useEffect(() => {
        setSideBarHeight(users.length * 60);
    }, [users]);

    const sendMessage = async () => {
        if (message){
            socket.emit("sendMessage", {
                senderId: localStorage.getItem('id'),
                receiverId: activeChatId,
                text: message
            });
            try {
                await axios.post('message/sendmessage', {
                    recipient: activeChatId,
                    message: message
                })
                setMessage('');
                setConversation(conversation => [{message: message, isMe: true,createdAt: Date.now()},...conversation])
            } catch {

            }
        }
    };

    const right = useMemo(() => {
        if (width > 250)
            return Math.max(((width / 2) - 50), 115);
        else return 100;
    }, [width])

    const calcHeight = () => {
        setSideBarHeight(users.length * 60);
    };

    const openSpecificChat = async (specificChat) => {
        if (specificChat === 'main') {
            setActiveChat('main');
            setConversation([])
        } else {
            const res = await axios.get(`message/getmessages/${specificChat.id}/0`);
            console.log(res.data);
            setConversation(res.data);
            if (props.userId)
                setActiveChatId(props.userId);
            else
                setActiveChatId(specificChat.id);
            setActiveChat(specificChat.displayUsername);
        }
    }

    const DropdownItem = (props) => {
        return (
            <ProfileInChat onClick={() => openSpecificChat(props.goToChat)}>
                {props.leftIcon ? <ProfileImage online={props.goToChat.online}>{props.leftIcon}</ProfileImage> : null}
                {props.goToChat.messages ? <NumberBadge>{props.goToChat.messages}</NumberBadge> : null}
                {props.children}
                {props.rightIcon ? <ProfileImage>{props.rightIcon}</ProfileImage> : null}
            </ProfileInChat>
        );
    }

    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => {
            if (marginTop === 270)
                elementRef.current.scrollIntoView()
        });
        return <div ref={elementRef} />;
    };

    return(width > 250 || openSidebar ?
            <MessengerDiv ref={sideBarRef}>
                <SideBar overflowY={marginTop===270} style={{height: sideBarHeight, width: width, right: -right}} ref={dropdownRef}>
                    <CSSTransition
                        in={activeChat === 'main'}
                        timeout={500}
                        classNames="menu-primary"
                        unmountOnExit
                        onEnter={calcHeight}>
                        <div className="menu">
                            {users.map(user => (
                                <DropdownItem
                                    key={user.id}
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
                            <NameOfChat>
                                <DropdownItem goToChat="main" rightIcon={<ArrowIcon/>}>
                                    <h2>All Chats</h2>
                                </DropdownItem>
                                <p>{activeChat}</p>
                            </NameOfChat>
                            <div ref={messagesRef}>
                                {conversation.slice(0).reverse().map(message => (
                                    <Message key={message.createdAt} isMine={message.isMe}>{message.message}</Message>
                                ))}
                                <AlwaysScrollToBottom />
                            </div>

                            <TextAreDiv marginTop={`${270-marginTop}px`}>
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
    )
}

export default Messenger;