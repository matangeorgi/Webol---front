import { ImHome,ImSearch,ImBell,ImUser,ImBubble2 } from "react-icons/im";
import {TopBar, TopBarLeft, TopBarCenter, TopBarRight, Logo, Input} from "../styles/Navbar.styled";

export default function Topbar(){
    const Logout = () => {
        localStorage.removeItem('token')
        window.location.reload();
    };

    return (
        <TopBar>
            <TopBarLeft>
                <Logo>Webol</Logo>
            </TopBarLeft>
            <TopBarCenter>
                <div className="searchBar">
                    <ImSearch ></ImSearch>
                    <Input placeholder="Discover creators" className="searchInput" />
                </div>
            </TopBarCenter>
            <TopBarRight>
                <div className="topbarLinks">
                    <span className="topbarLink" onClick={Logout}><ImHome size={'25px'}/></span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <ImUser></ImUser>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <ImBell></ImBell>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <ImBubble2></ImBubble2>
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
            </TopBarRight>
        </TopBar>
    )
}