import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState(null);

    const submitFile = async (e) => {
        e.preventDefault();
        // get Secure URL
        const url = await axios.get('s3/geturl').then(res => res.data);

        //post image to s3
        // axios.put(url, {
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //     },
        //     body: file[0]
        // })
        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: file[0]
        })

        //post to server data
        const imageUrl = url.split('?')[0]

    };

    return (
        <form onSubmit={submitFile}>
            <input type="file" accept="image/*" onChange={event => setFile(event.target.files)}/>
            <button type="submit">Send</button>
        </form>
    );
};

export default FileUpload;