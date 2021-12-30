import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState(null);

    const submitFile = async (e) => {
        e.preventDefault();
        try {
            if (!file) {
                throw new Error('Select a file first!');
            }
            const formData = new FormData();
            formData.append('file', file[0]);
            await axios.post(`upload`, formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });
            // handle success
        } catch (error) {
            // handle error
        }
    };

    return (
        <form onSubmit={submitFile}>
            <label>Upload file</label>
            <input type="file" onChange={event => setFile(event.target.files)} />
            <button type="submit">Send</button>
        </form>
    );
};

export default FileUpload;