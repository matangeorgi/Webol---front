import {useState} from "react";

import {ImSearch} from "react-icons/im";

import useOutsiderAlerter from "../../hooks/outsideAlerter";
import {ReactComponent as BellIcon} from "./icons/bell.svg";
import {ReactComponent as CaretIcon} from "./icons/caret.svg";
import {ReactComponent as CogIcon} from "./icons/cog.svg";
import {ReactComponent as HelpIcon} from "./icons/help.svg";
import {ReactComponent as LogoutIcon} from "./icons/logout.svg";
import {Navrow, DropDownDiv, IconButton, IconRight, MenuDiv, MenuItem, NavbarItem} from "./Menu.styled";

const Menu = props => {
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
                <IconButton href="#" onClick={handleClick}>
                    {props.icon}
                </IconButton>

                {visible && props.children}
            </NavbarItem>
        );
    }

    function DropdownMenu() {
        const Logout = () => {
            localStorage.removeItem('token');
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
                    <DropdownItem profile={true}> My Profile</DropdownItem>
                    <DropdownItem leftIcon={<CogIcon/>}>Settings</DropdownItem>
                    <DropdownItem leftIcon={<HelpIcon/>}>Contact us</DropdownItem>
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
                <NavbarItem onClick={() => {props.openSearch();}}>
                    <IconButton>
                        <ImSearch />
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