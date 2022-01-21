import Menu from"./menu";
import { ImSearch,ImBell,ImUser,ImBubble2 } from "react-icons/im";
import { TopBar, TopBarLeft, TopBarCenter, TopBarRight, Logo, SearchBar, ProfileImage, TopBarIcons, TopBarIconItem } from "./Topbar.styled";
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
        function handleGeneralClick(){

        }
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

            <TopBarCenter width={search? '500px': '0'} className={`d-flex justify-content-center ${search? 'border-1' : 'border-0'}`}>
                <ImSearch onClick={toggleSearch} className="searchIcon"/>
                <SearchBar className={`searchbar ${search? '' : 'd-none'}`} placeholder="Discover creators" />
            </TopBarCenter>

            <TopBarRight  className={iconsVisible? '' : 'd-none'}>
                <Menu/>
            </TopBarRight>
        </TopBar>
    )
}