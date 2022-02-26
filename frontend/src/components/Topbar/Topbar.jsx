import {useState, useEffect} from "react";

import {ImSearch} from "react-icons/im";
import {useNavigate} from "react-router-dom";

import Menu from "./menu";
import {
    TopBar,
    TopBarLeft,
    TopBarCenter,
    TopBarRight,
    Logo,
    SearchBar
} from "./Topbar.styled";


export default function Topbar() {
    const navigate = useNavigate();
    const [search, setSearch] = useState(window.innerWidth >= 610);
    const [iconsVisible, setIconsVisible] = useState(true);

    const toggleSearch = () => {
        if (window.innerWidth < 610) {// consttttttttt!
            setSearch(!search);
            setIconsVisible(search);
        }
    };

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 610)
                setSearch(false);
            else
                setSearch(true);

            setIconsVisible(true);
        }

        window.addEventListener('resize', handleResize);
    });

    return (
        <TopBar>
            <TopBarLeft>
                <Logo onClick={() => {
                    navigate('/');
                }}>Webol</Logo>
            </TopBarLeft>

            <TopBarCenter width={search ? '500px' : '0'}
                          className={`d-flex justify-content-center ${search ? 'border-1' : 'border-0'}`}>
                <ImSearch onClick={toggleSearch} className="searchIcon"/>
                <SearchBar className={`searchbar ${search ? '' : 'd-none'}`} placeholder="Discover creators"/>
            </TopBarCenter>

            <TopBarRight className={iconsVisible ? '' : 'd-none'}>
                <Menu/>
            </TopBarRight>
        </TopBar>
    );
}