import {useEffect, useRef} from "react";

const UsePagination = (isFullPage,offset,endOfData,handler) => {
    const ref = useRef();

    useEffect(() => {
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

export default UsePagination;