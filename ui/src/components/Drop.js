import React from "react";
import { useDropzone } from "react-dropzone";

const Drop = (props) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: ".xml",
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div className='dropContainer'>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag XML file here...</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </div>
  );
};

export default Drop;
