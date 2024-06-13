import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageUpload = ({ onChange }) => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedImage(URL.createObjectURL(file));
    onChange(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop,
  });

  return (
    <div {...getRootProps()} style={dropzoneStyle}>
      <input {...getInputProps()} />
      {uploadedImage ? (
        <img src={uploadedImage} alt="Uploaded" style={imageStyle} />
      ) : (
        <p>Drag &amp; drop an image here, or click to select one</p>
      )}
    </div>
  );
};

export default ImageUpload;

const dropzoneStyle = {
  border: "2px dashed #ccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

const imageStyle = {
  maxWidth: "100%",
  maxHeight: "200px",
  margin: "20px auto",
};
