import {Navrow, DropDownDiv, IconButton, IconRight, MenuDiv, MenuItem, NavbarItem } from "./Menu.styled"
import {ReactComponent as CaretIcon} from "./icons/caret.svg";
import {ReactComponent as BellIcon} from "./icons/bell.svg";
import React, {useEffect, useRef, useState} from "react";
import {CSSTransition} from "react-transition-group";
import {ReactComponent as CogIcon} from "./icons/cog.svg";
import {ReactComponent as HelpIcon} from "./icons/help.svg";
import {ReactComponent as LogoutIcon} from "./icons/logout.svg";
import {ReactComponent as BoltIcon} from "./icons/bolt.svg";

const Menu = () => {

    function NavItem(props) {
        const [open, setOpen] = useState(false);

        return (
            <NavbarItem>
                <IconButton href="#" onClick={() => setOpen(!open)}>
                    {props.icon}
                </IconButton>

                {open && props.children}
            </NavbarItem>
        );
    }

    function DropdownMenu() {
        const [menuHeight, setMenuHeight] = useState(230);

        function calcHeight(el) {
            const height = el.offsetHeight+20;
            setMenuHeight(height);
        }

        const Logout = () => {
            localStorage.removeItem('token')
            window.location.reload();
        };

        function DropdownItem(props) {
            return (
                <MenuItem color={props.color ? props.color : 'black'}
                          href="#"
                          onClick={props.function}>
                    <IconButton>{props.leftIcon}</IconButton>
                    {props.children}
                </MenuItem>
            );
        }

        const ColoredLine = ({ color }) => (
            <hr
                style={{
                    color,
                    backgroundColor: color,
                    height: 1.5,
                    margin:2
                }}
            />
        );

        return (
            <DropDownDiv style={{ height: menuHeight }} >
                    <MenuDiv>
                        <DropdownItem profile={true}> My Profile</DropdownItem>
                        <DropdownItem leftIcon={<CogIcon />}>Settings</DropdownItem>
                        <DropdownItem leftIcon={<HelpIcon/>}>Contact us</DropdownItem>
                        <ColoredLine color="red"/>
                        <DropdownItem function={Logout} leftIcon={<LogoutIcon/>} height ={'20px'} color ="red">Log out</DropdownItem>

                    </MenuDiv>
            </DropDownDiv>
        );
    }

    return(
        <Navrow>
            <NavItem icon={<BellIcon />}>

            </NavItem>
            <NavItem icon={<CaretIcon />}>
                <DropdownMenu/>
            </NavItem>

        </Navrow>
    )
}

export default Menu;