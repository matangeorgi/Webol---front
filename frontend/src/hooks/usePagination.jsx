import {useEffect, useRef} from "react";

const UsePagination = (handler) => {
    const ref = useRef();

    useEffect(() => {
        const handleScroll = e => {
            if (window.innerHeight + e.target.documentElement.scrollTop + 1 >=
                e.target.documentElement.scrollHeight) {
                handler();
            }
        };

        window.addEventListener('scroll',handleScroll,true);
        return () => {
            window.removeEventListener('scroll',handleScroll,true);
        };
    },[]);

    return ref;
};

export default UsePagination;