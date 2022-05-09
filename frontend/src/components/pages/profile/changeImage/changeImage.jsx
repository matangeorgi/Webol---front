
import React, {useRef} from "react";

import axios from "axios";

import {ReactComponent as CameraIcon} from "../../../common/Topbar/icons/camera.svg";
import {ReactComponent as CloseIcon} from "../../../common/Topbar/icons/close.svg";
import {ProfileImg, ThemeImage} from "../Profile.styled";
import {ModalBody, OverlayDiv, IconButton, CloseButton, ButtonDiv, Button} from "./ChangeImage.styled";

const ChangeImage = (props) => {
    const hiddenFileInput = useRef(null);

    function Image() {
        if (props.data.image === 'Profile Image')
            return <ProfileImg src={props.data.url}/>;
        else
            return <ThemeImage src={props.data.url}/>;
    }

    const ColoredLine = ({color}) => (
        <hr
            style={{
                color,
                backgroundColor: color,
                height: 1.5,
                margin: 20
            }}
        />
    );

    const UploadImage = async (event) => {
        const url = await axios.get('s3/geturl').then(res => res.data);

        const instance = axios.create();
        instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        await instance.put(url, event.target.files[0]);

        const imageUrl = url.split('?')[0];
        await axios.post(`update/userimage/${props.data.serverURL}`, {imgurl: imageUrl});
        window.location.reload();
    };

    return props.open ? (
        <>
            <OverlayDiv>
            </OverlayDiv>

            <ModalBody className="mx-auto" ref={props.forwardRef}>
                <CloseButton>
                    <IconButton size={'30px'}><CloseIcon onClick={props.onClose}/></IconButton>
                </CloseButton>
                <Image/>
                <ColoredLine color={'grey'}/>
                <ButtonDiv>
                    <Button onClick={() => hiddenFileInput.current.click()}>
                        <IconButton size={'50px'}><CameraIcon/></IconButton>
                        <input ref={hiddenFileInput} type="file" accept="image/*" onChange={UploadImage}/>
                        <p>Upload Image</p>
                    </Button>
                </ButtonDiv>
            </ModalBody>
        </>
    ) : null;
};

export default ChangeImage;