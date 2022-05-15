import React, {useEffect, useState} from "react";
import UseInfiniteScroll from "../../../../hooks/useInfiniteScroll";
import ProfileInList from "../../profileInList/profileInList";
import useClickOutside from "../../../../hooks/useClickOutside";
import {SearchModal,Ul,NoMatchesDiv} from "./searchResults.styled";
import axios from "axios";
import {P} from "../../../pages/login/Forms.styled";

const SearchResults = props => {
    const [offset, setOffset] = useState(0);
    const [users, setUsers] = useState([]);

    useEffect(async () => {
        if (props.search) {
            const res = await axios.get(`/topbar/findusers/${props.search}/0`);
            setUsers(res.data);
            props.setVisible(true)
        } else
            props.setVisible(false);
    }, [props.search])

    const scrollRef = UseInfiniteScroll(false, offset, setOffset, setUsers, users, `/topbar/findusers/${props.search}/${offset}`);

    return props.search && props.visible ?
        (
            <SearchModal>
                {users.length?
                    <Ul ref={scrollRef} className="mt-3">
                    {users.map(user => (
                        <ProfileInList key={user.displayUsername} username={user.displayUsername} src={user.profileImage}/>
                    ))}
                </Ul>:
                    <NoMatchesDiv>
                        <P color='grey' className='d-flex justify-content-center'>No matches found...</P>
                    </NoMatchesDiv>
                }
            </SearchModal>
        )
        :null;
}

export default SearchResults;