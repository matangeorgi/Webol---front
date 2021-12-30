import { ImHome,ImSearch,ImBell,ImUser,ImBubble2 } from "react-icons/im";
import { TopBar, TopBarLeft, TopBarCenter, TopBarRight, Logo, Input } from "./Topbar.styled";

export default function Topbar(){
    const Logout = () => {
        localStorage.removeItem('token')
        window.location.reload();
    };

    return (
        <TopBar>
            <TopBarLeft className="col-5">
                <Logo>Webol</Logo>
            </TopBarLeft>
            <TopBarCenter className="col-2 d-flex justify-content-center">
                <ImSearch className="searchIcon"></ImSearch>
                <Input placeholder="Discover creators" />
            </TopBarCenter>
            <TopBarRight className="col-5">
                <div className="topbarLinks">
                    <span className="topbarLink" onClick={Logout}><ImHome size='25px'/></span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <ImUser size='25px'></ImUser>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <ImBell size='25px'></ImBell>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <ImBubble2 size='25px'></ImBubble2>
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
            </TopBarRight>
        </TopBar>
    )
}