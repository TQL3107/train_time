'use client'

import React from "react";
import { useRef } from "react";
import { Button, Container } from "react-bootstrap";

const FileUploadButton = () => {
    const fileInputRef = useRef(null);
    
    const handleClick = () => {
        fileInputRef.current.click();
    }
    
    const handleFileChange = (event : any) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {

        }
    }

    return (
        <Container className="justify-content-end d-flex mt-3">
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <Button className="mt-2" onClick={handleClick}>Import</Button>
        </Container>
    )
}

export default FileUploadButton;