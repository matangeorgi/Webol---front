import React, {useState} from "react";

import {ImSearch} from "react-icons/im";
import {useNavigate} from "react-router-dom";

import useOutsiderAlerter from "../../hooks/outsideAlerter";
import {ProfileImg} from "../post/Post.styled";
import {ReactComponent as BellIcon} from "./icons/bell.svg";
import {ReactComponent as CaretIcon} from "./icons/caret.svg";
import {ReactComponent as CogIcon} from "./icons/cog.svg";
import {ReactComponent as HelpIcon} from "./icons/help.svg";
import {ReactComponent as LogoutIcon} from "./icons/logout.svg";
import {Navrow, DropDownDiv, IconButton, MenuDiv, MenuItem, NavbarItem, OptionButton} from "./Menu.styled";

const Menu = props => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState();

    const ref = useOutsiderAlerter(() => {
        setVisible(false);
    });

    function NavItem(props) {
        const handleClick = () => {
            setVisible(() => !visible);
        };
        return (
            <NavbarItem>
                <IconButton onClick={handleClick}>
                    {props.icon}
                </IconButton>

                {visible && props.children}
            </NavbarItem>
        );
    }

    function DropdownMenu() {
        const Logout = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            window.location.reload();
        };

        function DropdownItem(props) {
            return (
                <MenuItem color={props.color ? props.color : 'black'}
                          onClick={() => navigate(`/${props.path}`)}>
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

        return (
            <DropDownDiv>
                <MenuDiv ref={ref}>
                    <DropdownItem path={localStorage.getItem('username')} leftIcon={<ProfileImg src={"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"} alt="Profile image"/>}>
                        {localStorage.getItem('username')}
                    </DropdownItem>

                    <DropdownItem leftIcon={<CogIcon/>} path={'settings'}>Settings</DropdownItem>
                    <DropdownItem leftIcon={<HelpIcon/>} path={'help'}>Contact us</DropdownItem>
                    <ColoredLine color="red"/>
                    <DropdownItem function={Logout} leftIcon={<LogoutIcon/>} height={'20px'} color="red">Log
                        out</DropdownItem>

                </MenuDiv>
            </DropDownDiv>
        );
    }

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

            <NavItem icon={<BellIcon/>}/>
            <NavItem icon={<CaretIcon/>}>
                <DropdownMenu/>
            </NavItem>

        </Navrow>
    );
};

export default Menu;