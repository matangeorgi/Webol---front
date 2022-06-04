import React, {useEffect, useState} from "react";

import loadingGif from "../icons/android-spinner.gif"
import UseInfiniteScroll from "../../../../hooks/useInfiniteScroll";
import ProfileInList from "../../profileInList/profileInList";
import {NoMatchesDiv, SearchModal, TopDiv, Ul} from "./searchResults.styled";
import axios from "axios";
import {P} from "../../../pages/login/Forms.styled";

const SearchResults = props => {
    const [results, setResults] = useState([]);
    const [searchType, setSearchType] = useState('users');
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        if(loading){
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
            setLoading(false);
        }
    }, [loading])

    useEffect(() =>{
        setLoading(true);
    }, [props.search, searchType])

    const scrollRef = UseInfiniteScroll(false, setResults, results, `/topbar/findusers/${props.search}`);

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
                        {!loading && !results.length ? <P color='grey' className='d-flex justify-content-center'>No matches found...</P> : null}
                        {loading?
                            <div className='d-flex justify-content-center'>
                                <img width={80} src={loadingGif} alt="loading"/>
                            </div>
                            : null}
                    </NoMatchesDiv>
                }
            </SearchModal>
        )
        : null;
}

export default SearchResults;