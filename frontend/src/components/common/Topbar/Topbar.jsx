import {useState, useEffect} from "react";

import {ImSearch} from "react-icons/im";
import {useNavigate} from "react-router-dom";

import useClickOutside from "../../../hooks/useClickOutside";
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
    const [isWide, setWide] = useState(window.innerWidth > 610);
    const [search, setSearch] = useState(isWide);
    const [input, setInput] = useState();

    useEffect(() => {
        window.addEventListener('resize', () => setWide(window.innerWidth > 610));

        return () => {
            window.removeEventListener('resize', () => setWide(window.innerWidth > 610));
        };
    }, []);

    const clickedSearch = () => {
        if (input)
            console.log("test");
        //     Preform search.
        else if (!isWide)
            setSearch(!search);

    };

    const ref = useClickOutside(() => {
        if (!isWide)
            setSearch(false);
    });

    return (
        <TopBar>
            <TopBarLeft>
                <Logo onClick={() => navigate('/')}>Webol</Logo>
            </TopBarLeft>

            <TopBarCenter ref={ref} className={search || isWide ? 'border-1' : 'border-0'}>
                {isWide || search ? <ImSearch onClick={clickedSearch} className="searchIcon"/> : null}
                {search || isWide ? <SearchBar placeholder="Discover creators" onChange={e => {setInput(e.target.value);}}/> : null}
            </TopBarCenter>

            {isWide || !search ?
                <TopBarRight>
                    <Menu wideMode={isWide} openSearch={() => setSearch(true)}/>
                </TopBarRight> : null}
        </TopBar>
    );
}