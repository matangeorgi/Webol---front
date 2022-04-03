import {useState, useEffect} from "react";

import {ImSearch} from "react-icons/im";
import {useNavigate} from "react-router-dom";

import useOutsiderAlerter from "../../hooks/outsideAlerter";
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

    const checkWidth = () => {
        if (window.innerWidth > 610) {
            setSearch(true);
            setWide(true);
        }
        else {
            setSearch(false);
            setWide(true);
        }
    };


    useEffect(() => {
        window.addEventListener('resize', checkWidth);
    });

    const clickedSearch = () => {
        if (input)
            console.log("test");
        //     Preform search.
        else if (!isWide)
            setSearch(!search);
    };

    const ref = useOutsiderAlerter(() => {
        if(!isWide)
            setSearch(false);
    });

    return (
        <TopBar>
            <TopBarLeft>
                <Logo onClick={() => navigate('/')}>Webol</Logo>
            </TopBarLeft>

            <TopBarCenter ref={ref} width={search ? 'auto' : '0'} className={search ? 'border-1' : 'border-0'}>
                <ImSearch onClick={clickedSearch} className="searchIcon"/>

                {search ? <SearchBar placeholder="Discover creators" onChange={e => {setInput(e.target.value);}} /> : null}
            </TopBarCenter>

            <TopBarRight className={(isWide || !search) ? '': 'd-none'}>
                <Menu/>
            </TopBarRight>

        </TopBar>
    );
}