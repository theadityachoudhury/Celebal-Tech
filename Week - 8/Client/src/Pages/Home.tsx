import React, { useState } from 'react';
import axios from 'axios';
import instance from '../Axios';

const Home: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await instance.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus('File uploaded successfully');
      console.log('Upload response:', response.data);
    } catch (error) {
      setUploadStatus('File upload failed');
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="container">
      <div className="flex justify-center items-center text-center h-screen">
        <div className="space-y-10">
          <h3 className="text-3xl">Upload your image</h3>
          <div className="flex flex-col space-y-3">
            <input
              type="file"
              onChange={handleFileChange}
              className="bg-white text-black p-10 rounded-md max-w-96 hover:bg-black hover:text-white duration-300 border border-white"
            />
            <button
              onClick={handleUpload}
              className="bg-black text-white hover:text-black max-w-96 text-center text-xl p-2 duration-300 ease-linear hover:bg-white border border-white"
            >
              Upload
            </button>
          </div>
          {uploadStatus && <p>{uploadStatus}</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;
