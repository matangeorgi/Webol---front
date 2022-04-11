import React, {useEffect, useRef, useState} from "react";

import {TextArea} from "../newPost/newPost.styled";

const ResizeTextArea = props => {

    const textAreaRef = useRef();
    const [text, setText] = useState("");
    const [textAreaHeight, setTextAreaHeight] = useState("auto");

    useEffect(() => {
        setTextAreaHeight(`${textAreaRef.current?.scrollHeight}px`);
    }, [text]);

    return (
        <div>
            {/*<TextArea*/}
            {/*    placeholder={`Have anything to share ${localStorage.getItem('username')}?`}*/}
            {/*    onChange={handleDescChange}*/}
            {/*    height={textAreaHeight}*/}
            {/*    ref={textAreaRef}*/}
            {/*/>*/}
        </div>
    );
};

export default ResizeTextArea;