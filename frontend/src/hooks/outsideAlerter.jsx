import {useEffect, useRef, useState} from "react";

const useOutsiderAlerter = () => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    const handleClickOutside = e => {
        if (!ref.current?.contains(e.target))
            setVisible(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    },[ref]);

    return {visible, setVisible, ref};
};

export default useOutsiderAlerter;
