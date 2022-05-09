import {useEffect, useRef} from "react";

const useClickOutside = (handler) => {
    const ref = useRef();

    useEffect(() => {
        const handleClickOutside = e => {
            if (!ref.current?.contains(e.target)) {
                handler();
            }
        };

        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return ref;
};

export default useClickOutside;
