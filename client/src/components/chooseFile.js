import React, { useCallback } from 'react';
import {useDropzone} from 'react-dropzone';
import '../App.css';

function Basic(props) {
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
    props.handleFileSelected(acceptedFiles);
  }, [])
  const { getRootProps, getInputProps } = useDropzone({onDrop});


  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p className='drag-n-drop-text'>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  );
}

export default Basic;