import React, {useEffect, useState} from "react";

import loadingGif from "../icons/android-spinner.gif"
import UseInfiniteScroll from "../../../../hooks/useInfiniteScroll";
import ProfileInList from "../../profileInList/profileInList";
import {NoMatchesDiv, SearchModal, TopDiv, Ul} from "./searchResults.styled";
import axios from "axios";
import {P} from "../../../pages/login/Forms.styled";

const SearchResults = props => {
    const [offset, setOffset] = useState(0);
    const [results, setResults] = useState([]);
    const [searchType, setSearchType] = useState('users');

    useEffect(async () => {
        try {
            if (props.search) {
                const res = await axios.get(`/topbar/find${searchType}/${props.search}/0`);
                setResults(res.data);
                props.setVisible(true)
            } else
                props.setVisible(false);
        } catch {
            console.error('Could not retrieve users from server.');
        }
    }, [props.search, searchType])

    const scrollRef = UseInfiniteScroll(false, offset, setOffset, setResults, results, `/topbar/findusers/${props.search}/${offset}`);

    const DisplayResults = () => {
        if (searchType === 'users')
            return (
                results.map(user => (
                    <ProfileInList key={user.displayUsername} route={user.displayUsername} src={user.profileImage}>
                        {user.displayUsername}
                    </ProfileInList>
                ))
            )
        else if (searchType === 'posts')
            return (
                results.map(post => (
                    <ProfileInList key={post.id} route={`post/${post.id}`} src={post.user?.profileImage}>
                        <b>{post.user?.displayUsername}</b><br/>
                        {post.description}
                    </ProfileInList>
                ))
            )
        else if (searchType === 'roles')
            return (
                results.map(user => (
                    <ProfileInList key={user.displayUsername} route={user.displayUsername} src={user.profileImage}>
                        <b>{user.displayUsername}</b><br/>
                        {user.role}
                    </ProfileInList>
                ))
            )
    }

    return props.search && props.visible ?
        (
            <SearchModal>
                <TopDiv>
                    <div>
                        <P onClick={() => setSearchType('users')}>Users</P>
                    </div>
                    <div>
                        <P onClick={() => setSearchType('posts')}>Posts</P>
                    </div>
                    <div>
                        <P onClick={() => setSearchType('roles')}>Roles</P>
                    </div>
                </TopDiv>
                {results.length ?
                    <Ul ref={scrollRef} className="mt-3">
                        <DisplayResults/>
                    </Ul> :
                    <NoMatchesDiv>
                        <P color='grey' className='d-flex justify-content-center'>No matches found...</P>
                        {/*<img width={80} src={loadingGif} alt="wait until the page loads" />*/}
                    </NoMatchesDiv>
                }
            </SearchModal>
        )
        : null;
}

export default SearchResults;