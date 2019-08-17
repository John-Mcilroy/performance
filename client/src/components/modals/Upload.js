import React, { useState } from 'react';
import axios from 'axios';

const Upload = () => {
  const [ file, setFile ] = useState('');
  const [ fileName, setFileName ] = useState('Choose File');
  const [ uploadedFile, setUploadedFile ] = useState({});
  const [ message, setMessage ] = useState('');
  
  const onChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }

  const onSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/from-data'
        }
      })

      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });

      console.log(res.data);
      setMessage('File Uploaded');

    } catch(err) {
      if( err.response.status === 500 ) {
        setMessage('Threre was a problem with the Server');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  }

  return (
    <div>
      {message}
      <form onSubmit={onSubmit}>
        <input type="file" id="customFile" onChange={onChange} />
        <br />
        <input type="submit" value="Upload" />
      </form>
    </div>
  )
}

export default Upload;