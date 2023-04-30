import React, { useState } from 'react';

const UploadFile = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    
    fetch('http://127.0.0.1:8000/api/upload_image', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      // Handle response data
    })
    .catch(error => {
      // Handle errors
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send the file to the server
    console.log(file);
  }

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
    </div>
    // <form onSubmit={handleSubmit}>
    //   <input type="file" onChange={handleFileUpload} />
    //   <button type="submit">Upload</button>
    // </form>
  );
};

export default UploadFile;