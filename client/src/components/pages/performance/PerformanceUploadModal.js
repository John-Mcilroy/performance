import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hideUploadModal } from '../../../actions/uploadModal';
import ModalBackdrop from '../../layout/ModalBackdrop';
import './styles/PerformanceUploadModal.css';

const Upload = ({ upload, hideUploadModal }) => {
  const [ file, setFile ] = useState('');
  const [ fileName, setFileName ] = useState('Choose File');
  const [ uploadedFile, setUploadedFile ] = useState({});
  const [ message, setMessage ] = useState('');
  const [ partnerStats, setPartnerStats ] = useState([]);
  
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
          'Content-Type': 'multipart/form-data'
        }
      })

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
      setMessage('File Uploaded');

      console.log(res.data);
      setPartnerStats(res.data);

    } catch(err) {
      if( err.response.status === 500 ) {
        setMessage('Upload Failed');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  }

  return upload !== false && (
    <ModalBackdrop>
      <div 
        className='performance-upload' 
        onClick={() => { hideUploadModal() }}
      >
        {message}
        <form 
          className='performance-upload__form' 
          onSubmit={onSubmit}
        >
          <label for='upload-btn'>Upload</label>
          <input 
            type="file" 
            id='upload-btn' 
            onChange={onChange} 
            style={{display: 'none'}} 
          />

          <br />
          <input 
            type='submit' 
            value='upload' 
          />
        </form>
      </div>
    </ModalBackdrop>
  )
}

Upload.propTypes = {
  upload: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  upload: state.upload,
})

export default connect(mapStateToProps, { hideUploadModal })(Upload);