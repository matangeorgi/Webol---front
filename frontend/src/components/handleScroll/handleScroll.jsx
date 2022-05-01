

const HandleScroll = props => {
    console.log("hey");
    if (props.scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = props.scrollRef.current;
        if (scrollTop + clientHeight === scrollHeight) {
            props.setOffset(props.offset + 1);
            console.log("here");
        }
    }
};

export default HandleScroll;