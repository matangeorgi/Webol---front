import { ImSearch,ImBell,ImUser,ImBubble2 } from "react-icons/im";
import { TopBar, TopBarLeft, TopBarCenter, TopBarRight, Logo, SearchBar, ProfileImage, TopBarIcons } from "./Topbar.styled";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function Topbar(){
    const navigate = useNavigate();
    const [search, setSearch] = useState(window.innerWidth >= 610);
    const [iconsVisible, setIconsVisible] = useState(true);

    const toggleSearch = () => {
        if (window.innerWidth < 610) {// consttttttttt!
            setSearch(!search);
            setIconsVisible(search);
        }
    }

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 610)
                setSearch(false);
            else
                setSearch(true);

            setIconsVisible(true);
        }
        window.addEventListener('resize', handleResize)
    })

    const Logout = () => {
        localStorage.removeItem('token')
        window.location.reload();
    };

    return (
        <TopBar>
            <TopBarLeft>
                <Logo onClick={()=> {navigate('/')}}>Webol</Logo>
            </TopBarLeft>

            <TopBarCenter className={`d-flex justify-content-center ${search? 'border-1' : 'border-0'}`}>
                <ImSearch onClick={toggleSearch} className="searchIcon"/>
                <SearchBar className={`searchbar ${search? '' : 'd-none'}`} placeholder="Discover creators" />
            </TopBarCenter>

            <TopBarRight>
                <TopBarIcons className={iconsVisible? '' : 'd-none'}>
                    <div className="topbarIconItem">
                        <ImUser size='25px'/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <ImBell size='25px'/>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <ImBubble2 size='25px'/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <ProfileImage src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Profile image"/>
                </TopBarIcons>
            </TopBarRight>
        </TopBar>
    )
}