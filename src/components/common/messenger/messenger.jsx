
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

const Messenger = () => {
    const [message, setMessage] = useState('');
    const [activeChat, setActiveChat] = useState('main');
    const [sideBarHeight, setSideBarHeight] = useState(null);
    const [width, setWidth] = useState((window.innerWidth - 900)/2- 15);
    const [openSidebar, setOpenSidebar] = useState(false);
    const dropdownRef = useRef(null);

    const sideBarRef = useClickOutside(() => {
        setOpenSidebar(false);
    })

    useEffect(() => {
        const handleResize = () => {
            setWidth((window.innerWidth - 900)/2 - 15);
        }
        window.addEventListener('resize',handleResize)

        return () => {
            window.removeEventListener('resize',handleResize);
        }
    })

    const right = useMemo(() => {
        if(width > 200)
            return Math.max(( (width/2 )- 10),115);
        else return 100;
    },[width])

    useEffect(() => {
        setSideBarHeight(dropdownRef.current?.firstChild.offsetHeight);
    }, [])

    function calcHeight(el) {
        const height = el.offsetHeight;
        setSideBarHeight(height);
    }

    function DropdownItem(props) {
        return (
            <ProfileInChat onClick={() => setActiveChat(props.goToChat ||'chat')}>
                {props.leftIcon? <ProfileImage>{props.leftIcon}</ProfileImage> : null}
                {props.children}
                {props.rightIcon? <ProfileImage>{props.rightIcon}</ProfileImage> : null}
            </ProfileInChat>
        );
    }

    return (width > 200 || openSidebar?
        <MessengerDiv  ref={sideBarRef}>
            <SideBar style={{height: sideBarHeight,width: width, right:-right}} ref={dropdownRef}>
                <CSSTransition
                    in={activeChat === 'main'}
                    timeout={500}
                    classNames="menu-primary"
                    unmountOnExit
                    onEnter={calcHeight}>
                    <div className="menu">
                        <DropdownItem
                            leftIcon={<ProfileImg src={localStorage.getItem('profileImage')} alt="Profile image"/>}>
                            Matan
                        </DropdownItem>
                        <DropdownItem
                            leftIcon={<ProfileImg src={localStorage.getItem('profileImage')} alt="Profile image"/>}>
                            Or
                        </DropdownItem>
                        <DropdownItem
                            leftIcon={<ProfileImg src={localStorage.getItem('profileImage')} alt="Profile image"/>}>
                            Shir
                        </DropdownItem>
                    </div>
                </CSSTransition>

                <CSSTransition
                    in={activeChat === 'chat'}
                    timeout={500}
                    classNames="menu-secondary"
                    unmountOnExit
                    onEnter={() => setSideBarHeight(400)}>
                    <div className="menu">
                        <DropdownItem goToChat="main" rightIcon={<ArrowIcon />}>
                            <h2>All Chats</h2>
                        </DropdownItem>
                        <NameOfChat>
                            <p>Matan</p>
                        </NameOfChat>
                        <div>
                            <Message isMine={false}>Hey there</Message>
                            <Message isMine={true}>How are you?</Message>
                        </div>

                        <TextAreDiv isLoaded={true}>
                            <ResizeTextArea
                                text={message}
                                setText={setMessage}
                                placeholder="Message..."/>
                            <PostButton>Send</PostButton>
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