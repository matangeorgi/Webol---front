import {useEffect, useRef, useState} from "react";

import axios from "axios";

const UseInfiniteScroll = (isFullPage, offset, setOffset, setData, data, apiLink) => {
    const ref = useRef();
    const [endOfData, setEndOfData] = useState(false);

    useEffect(() => {
        const handler = async() => {
            try{
                console.log("here");
                const res = await axios.get(apiLink);
                setOffset(offset + 20);
                if (res.data.length === 0)
                    setEndOfData(true);
                else
                    setData(data => [...data,...res.data]);
            }catch{
                console.error("Couldn't retrieve data from server");
            }
        };

        if (!endOfData)
        {
            const handleScroll = isFullPage?
                e => {
                    if (window.innerHeight + e.target.documentElement?.scrollTop >=
                        e.target.documentElement?.scrollHeight) {
                        handler();
                    }
                }
                :
                () => {
                    if(ref.current.clientHeight + ref.current.scrollTop >=
                        ref.current.scrollHeight)
                        handler();
                };


            window.addEventListener('scroll',handleScroll,true);
            return () => {
                window.removeEventListener('scroll',handleScroll,true);
            };
        }
    },[offset]);

    return ref;
};

export default UseInfiniteScroll;