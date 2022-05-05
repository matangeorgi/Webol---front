import React, {useEffect, useState} from "react";

import axios from "axios";
import {ImSearch} from "react-icons/im";
import {useNavigate} from "react-router-dom";

import useOutsiderAlerter from "../../hooks/outsideAlerter";
import {ProfileImg} from "../post/Post.styled";
import ProfileInList from "../profileInList/profileInList";
import {ReactComponent as BellIcon} from "./icons/bell.svg";
import {ReactComponent as CaretIcon} from "./icons/caret.svg";
import {ReactComponent as CogIcon} from "./icons/cog.svg";
import {ReactComponent as HelpIcon} from "./icons/help.svg";
import {ReactComponent as LogoutIcon} from "./icons/logout.svg";
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

    useEffect(() => {
        const interval = setInterval(async() => {
            try{
                const res = await axios.get('topbar/getcountnotification');
                setNotificationsNum(res.data);
            }catch{

            }
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    },[notificationsNum]);

    const menuRef = useOutsiderAlerter(() => {
        setMenuVisible(false);
    });

    const notificationsRef = useOutsiderAlerter(() => {
        setNotificationsVisible(false);
        setNotifications([]);
    });


    function DropdownMenu() {
        const Logout = () => {
            localStorage.clear();
            window.location.reload();
        };

        function DropdownItem(props) {
            return (
                <MenuItem color={props.color ? props.color : 'black'}
                          onClick={props.logout ? () => Logout() : () => navigate(`/${props.path}`)}>
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

        return (!menuVisible ? null :
                <DropDownDiv>
                    <MenuDiv>
                        <DropdownItem path={localStorage.getItem('username')}
                                      leftIcon={<ProfileImg src={localStorage.getItem('profileImage')}
                                                            alt="Profile image"/>}>
                            {localStorage.getItem('username')}
                        </DropdownItem>

                        <DropdownItem leftIcon={<CogIcon/>} path={'settings'}>Settings</DropdownItem>
                        <DropdownItem leftIcon={<HelpIcon/>} path={'help'}>Contact us</DropdownItem>
                        <ColoredLine color="red"/>
                        <DropdownItem logout={true} function={Logout} leftIcon={<LogoutIcon/>} height={'20px'}
                                      color="red">Log out</DropdownItem>

                    </MenuDiv>
                </DropDownDiv>
        );
    }

    function DropdownNotifications() {
        return notificationsVisible && notifications.length ? (
                <DropDownDiv>
                    <MenuDiv>
                        <Ul>
                            {notifications?.map((notification,index) => (
                                <NotificationDiv key={index} background={notification.read}>
                                    <ProfileInList
                                        username={'matan'}
                                        src={notification.profileImage}
                                        message={notification.message}/>
                                </NotificationDiv>
                            ))}
                        </Ul>
                    </MenuDiv>
                </DropDownDiv>
        ):null;
    }

    const showNotifications = async() => {
        setNotificationsVisible(!notificationsVisible);
        try{
            const res = await axios.get('topbar/getnotification');
            setNotifications(res.data);
            setNotificationsNum(0);
        }catch{

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