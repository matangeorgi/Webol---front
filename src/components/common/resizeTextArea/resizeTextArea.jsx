import React, {useEffect, useRef, useState} from "react";

import {TextArea} from "./resizeTextArea.styled";

const ResizeTextArea = props => {

    const textAreaRef = useRef();
    const [textAreaHeight, setTextAreaHeight] = useState("auto");

    useEffect(() => {
        if (props.ForwardRef)
            setTextAreaHeight(`${props.ForwardRef.current?.scrollHeight}px`);
        else
            setTextAreaHeight(`${textAreaRef.current?.scrollHeight}px`);

    }, [props.text]);

    const onChangeHandler = e => {
        setTextAreaHeight("auto");
        props.setText(e.target.value);
    };

    return (
        <TextArea
            placeholder={props.placeholder}
            onChange={onChangeHandler}
            height={textAreaHeight}
            ref={props.ForwardRef ? props.ForwardRef : textAreaRef}
            value={props.text}
            borderStyle={props.borderStyle}
            maxLength="150"
            rows={1}
        />
    );
};

export default ResizeTextArea;