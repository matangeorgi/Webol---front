import React, {useEffect, useRef, useState} from "react";

import axios from "axios";
import {MdPermMedia} from "react-icons/md";

import {ProfileImg} from "../post/Post.styled";
import {
    Container,
    ContainerWrapepr,
    Top,
    TextArea,
    Line,
    Bottom,
    Options,
    PostOption,
    SpanForIcon, IconMedia, PostButton, Img
} from "./newPost.styled";

const NewPost = props => {

    const [desc, setDesc] = useState();
    const [file, setFile] = useState(null);
    const hiddenFileInput = useRef(null);
    const [src, setSrc] = useState();
    const textAreaRef = useRef();
    const [textAreaHeight, setTextAreaHeight] = useState("auto");

    useEffect(() => {
        setTextAreaHeight(`${textAreaRef.current?.scrollHeight}px`);
    }, [desc]);

    const SharePost = async () => {
        let imageUrl;
        if (file) {
            const url = await axios.get('s3/geturl').then(res => res.data);

            const instance = axios.create();
            instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
            await instance.put(url, file[0]);

            imageUrl = url.split('?')[0];
        }

        const data = {description: desc, url: imageUrl};
        await axios.post('user/addpost', data);
        window.location.reload();
    };

    const handleChooseImage = e => {
        setFile(e.target.files);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setSrc(reader.result);
        });
        if (e.target.files[0])
            reader.readAsDataURL(e.target.files[0]);
    };

    const handleDescChange = e =>{
        setTextAreaHeight("auto");
        setDesc(e.target.value);
    };


    return (
        <Container>
            <ContainerWrapepr>
                <Top>
                    <ProfileImg src={props.profileurl} alt="Post image" className="mb-3"/>
                    <TextArea
                        placeholder={`Have anything to share ${localStorage.getItem('username')}?`}
                        onChange={handleDescChange}
                        height={textAreaHeight}
                        ref={textAreaRef}
                    />
                </Top>
                {src ? <Img src={src} alt="your image" className="mt-5"/> : null}
                <Line/>
                <Bottom>
                    <Options>
                        <PostOption onClick={() => hiddenFileInput.current.click()}>
                            <IconMedia><MdPermMedia/></IconMedia>
                            <SpanForIcon>Photo or Video</SpanForIcon>
                            <input ref={hiddenFileInput} type="file" accept="image/*" onChange={handleChooseImage}/>
                        </PostOption>
                    </Options>

                    <PostButton onClick={SharePost}>Share</PostButton>
                </Bottom>
            </ContainerWrapepr>
        </Container>
    );
};

export default NewPost;