import React, {useRef, useState} from "react";

import axios from "axios";
import {MdPermMedia} from "react-icons/md";
import {BiCategory} from "react-icons/bi";

import InputDropdown from "../inputDropdown/inputDropdown"
import {ProfileImg} from "../post/Post.styled";
import ResizeTextArea from "../resizeTextArea/resizeTextArea";
import {
    Container,
    ContainerWrapepr,
    Top,
    Line,
    Bottom,
    Options,
    PostOption,
    SpanForIcon, IconMedia, PostButton, Img, InputCategory
} from "./newPost.styled";

const NewPost = () => {
    const [desc, setDesc] = useState();
    const [file, setFile] = useState(null);
    const hiddenFileInput = useRef(null);
    const [src, setSrc] = useState();
    const [category, setCategory] = useState('General');
    const [categoryInput, setCategoryInput] = useState(false);

    const SharePost = async () => {
        try{
            let imageUrl;
            if (file) {
                const url = await axios.get('s3/geturl').then(res => res.data);
                const instance = axios.create();
                instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
                await instance.put(url, file[0]);
                imageUrl = url.split('?')[0];
            }

            const data = {description: desc, url: imageUrl, category};
            await axios.post('user/addpost', data);
            window.location.reload();
        }catch{
            console.error("Couldn't upload image, try again later.")
        }
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

    return (
        <Container>
            <ContainerWrapepr>
                <Top>
                    <ProfileImg src={localStorage.getItem('profileImage')} alt="Post image" className="mb-3"/>
                    <ResizeTextArea
                        placeholder={`Have anything to share ${localStorage.getItem('username')}?`}
                        setText={setDesc}
                        text={desc}
                        borderStyle="none"
                    />
                </Top>
                {src ?
                    <div>
                        <Img src={src} alt="your image" className="mt-5"/>
                    </div>: null}
                <Line/>
                <Bottom>
                    <Options>
                        <PostOption onClick={() => hiddenFileInput.current.click()}>
                            <IconMedia><MdPermMedia/></IconMedia>
                            <SpanForIcon>Photo or Video</SpanForIcon>
                            <input className='d-none' ref={hiddenFileInput} type="file" accept="image/*,video/*" onChange={handleChooseImage}/>
                        </PostOption>
                        <PostOption onClick={() => setCategoryInput(true)}>
                            <IconMedia><BiCategory/></IconMedia>
                            <SpanForIcon onClick={() => setCategoryInput(true)}>Category: {category}</SpanForIcon>
                        </PostOption>
                    </Options>
                    <PostButton onClick={SharePost}>Share</PostButton>
                </Bottom>
                <InputDropdown
                setSelectedValue={setCategory}
                selectedValue={category}
                url={'global/getcategories'}
                visible={categoryInput}/>
            </ContainerWrapepr>
        </Container>
    );
};

export default NewPost;