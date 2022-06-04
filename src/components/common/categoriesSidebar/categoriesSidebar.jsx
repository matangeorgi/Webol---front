import {memo, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {ListDiv, SidebarDiv, TopDiv, IconButton, CategoryDiv} from "./categoriesSidebar.styled";
import {ReactComponent as ExploreIcon} from "../Navbar/icons/category.svg";
import {ReactComponent as CompassIcon} from "../Navbar/icons/explore.svg";
import {ReactComponent as ComputerIcon} from "../Navbar/icons/computer.svg";
import {ReactComponent as SportIcon} from "../Navbar/icons/sport.svg";
import {ReactComponent as MusicIcon} from "../Navbar/icons/music.svg";
import {ReactComponent as TeachingIcon} from "../Navbar/icons/teaching.svg";
import {ReactComponent as BusinessIcon} from "../Navbar/icons/business.svg";
import {ReactComponent as LifestyleIcon} from "../Navbar/icons/lifstyle.svg";
import {ReactComponent as FitnessIcon} from "../Navbar/icons/fitness.svg";
import {ReactComponent as GeneralIcon} from "../Navbar/icons/general.svg";

import {P} from "../commonStyles/General.styled";
import useClickOutside from "../../../hooks/useClickOutside";
import InputDropdown from "../inputDropdown/inputDropdown";
import {SearchDiv} from "../inputDropdown/inputDropdown.styled";

const categories = [
    {category: 'All', icon: <CompassIcon/>},
    {category: 'Computers', icon: <ComputerIcon/>},
    {category: 'Sports', icon: <SportIcon/>},
    {category: 'Music', icon: <MusicIcon/>},
    {category: 'Teaching & Academics', icon: <TeachingIcon/>},
    {category: 'Business', icon: <BusinessIcon/>},
    {category: 'Lifestyle', icon: <LifestyleIcon/>},
    {category: 'Health and Fitness', icon: <FitnessIcon/>},
    {category: 'General', icon: <GeneralIcon/>},
]

const CategoriesSidebar = props => {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            props.setWidth((window.innerWidth - 900) / 2 - 70);
            if ((window.innerWidth - 900) / 2 - 70 < 210)
                props.setOpen(false);
        }
        handleResize();
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        if (searchInput)
            navigate(`/explore/${searchInput}`);
    },[searchInput])


    const ref = useClickOutside(() => {
        props.setOpen(props.width > 210 || false);
    })

    return(
        <SidebarDiv ref={ref}>
            <ListDiv open={props.open || props.width > 210}>
                <TopDiv>
                    <ExploreIcon/>
                    <h4>Categories</h4>
                </TopDiv>
                <SearchDiv>
                    <InputDropdown
                        visible={true}
                        placeholder={"Search category..."}
                        url={'global/getcategories'}
                        setSelectedValue={setSearchInput}/>
                </SearchDiv>
                <hr/>
                {categories.map(c => (
                    <CategoryDiv key={c.category} onClick={() => navigate(`/explore/${c.category}`)}>
                        <IconButton>{c.icon}</IconButton>
                        <P>{c.category}</P>
                    </CategoryDiv>
                ))}
            </ListDiv>
        </SidebarDiv>
    )
}

export default memo(CategoriesSidebar);