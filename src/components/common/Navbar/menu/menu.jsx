import React, {useContext, useEffect, useRef, useState} from "react";

import axios from "axios";
import {ImSearch} from "react-icons/im";
import {useNavigate} from "react-router-dom";

import {SocketContext} from "../../../../socket/socket";
import useClickOutside from "../../../../hooks/useClickOutside";
import {P} from "../../../pages/login/Forms.styled";
import {ProfileImg} from "../../post/Post.styled";
import ProfileInList from "../../profileInList/profileInList";
import {ReactComponent as BellIcon} from "../icons/bell.svg";
import {ReactComponent as CaretIcon} from "../icons/caret.svg";
import {ReactComponent as CogIcon} from "../icons/cog.svg";
import {ReactComponent as HelpIcon} from "../icons/help.svg";
import {ReactComponent as LogoutIcon} from "../icons/logout.svg";
import {
    Navrow,
    DropDownDiv,
    IconButton,
    MenuDiv,
    MenuItem,
    NavbarItem,
    OptionButton,
    Ul,
    NumberBadge, NotificationDiv
} from "./Menu.styled";

const Menu = props => {
    const navigate = useNavigate();
    const [menuVisible, setMenuVisible] = useState(false);
    const [notificationsVisible, setNotificationsVisible] = useState(false);
    const [notificationsNum, setNotificationsNum] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.emit("connected",localStorage.getItem('id'));
        async function getNotificationsNum() {
            try{
                const res = await axios.get('topbar/getcountnotification');
                setNotificationsNum(res.data);
            }catch{
                console.error('Could not retrieve notifications from server');
            }
        }
        getNotificationsNum();

        socket.on("getNotification", (notifications) => {
            setNotificationsNum(notifications);
        });
    },[]);

    const menuRef = useClickOutside(() => {
        setMenuVisible(false);
    });

    const notificationsRef = useClickOutside(() => {
        setNotificationsVisible(false);
    });


    function DropdownMenu() {

        const Logout = () => {
            localStorage.clear();
            window.location.reload();
        };

        function DropdownItem(props) {

            const handleClick = () => {
                navigate(`/${props.path}`)
                setMenuVisible(false);
            };

            return (
                <MenuItem color={props.color ? props.color : 'black'}
                          onClick={props.logout ? Logout : handleClick}>
                    <OptionButton>{props.leftIcon}</OptionButton>
                    {props.children}
                </MenuItem>
            );
        }

        const ColoredLine = ({color}) => (
            <hr
                style={{
                    color,
                    backgroundColor: color,
                    height: 1.5,
                    margin: 2
                }}
            />
        );

        return menuVisible? (
            <DropDownDiv>
                <MenuDiv>
                    <DropdownItem
                        path={localStorage.getItem('username')}
                        leftIcon={<ProfileImg src={localStorage.getItem('profileImage')} alt="Profile image"/>}>
                        {localStorage.getItem('username')}
                    </DropdownItem>

                    <DropdownItem leftIcon={<CogIcon/>} path={'settings'}>Settings</DropdownItem>
                    <DropdownItem leftIcon={<HelpIcon/>} path={'help'}>Contact us</DropdownItem>
                    <ColoredLine color="red"/>
                    <DropdownItem logout={true} function={Logout} leftIcon={<LogoutIcon/>} height={'20px'}
                                  color="red">Log out</DropdownItem>
                </MenuDiv>
            </DropDownDiv>
        ) : null;
    }

    function DropdownNotifications() {
        return notificationsVisible ? (
            <DropDownDiv>
                <MenuDiv>
                    {notifications.length ?
                        <Ul>
                            {notifications?.map((notification,index) => (
                                <NotificationDiv
                                    key={index}
                                    background={notification.read}
                                    onClick={() => setNotificationsVisible(false)}>
                                    <ProfileInList
                                        username={notification.user.displayUsername}
                                        src={notification.user.profileImage}
                                        message={notification.message}/>
                                </NotificationDiv>
                            ))}
                        </Ul>
                    :
                    <P>Nothing to show yet...</P>}

                </MenuDiv>
            </DropDownDiv>
        ):null;
    }

    const showNotifications = async() => {
        try{
            const res = await axios.get('topbar/getnotification');
            setNotificationsVisible(!notificationsVisible);
            setNotifications(res.data);
            setNotificationsNum(0);
            socket.emit("eraseNotification",localStorage.getItem('id'));
        }catch{
            console.error('Could not retrieve notifications from server.');
        }
    };

    return (
        <Navrow>
            {props.wideMode ? null :
                <NavbarItem onClick={() => {
                    props.openSearch();
                }}>
                    <IconButton>
                        <ImSearch/>
                    </IconButton>
                </NavbarItem>}

            <NavbarItem ref={notificationsRef}>
                <IconButton onClick={showNotifications}>
                    <BellIcon/>
                </IconButton>
                <DropdownNotifications/>
            </NavbarItem>

            <NavbarItem ref={menuRef}>
                <IconButton onClick={() => setMenuVisible(!menuVisible)}>
                    <CaretIcon/>
                </IconButton>
                <DropdownMenu/>
            </NavbarItem>

            {notificationsNum ? <NumberBadge>{notificationsNum}</NumberBadge> : null}
        </Navrow>
    );
};

export default Menu;