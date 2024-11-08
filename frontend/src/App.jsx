import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';
import { toast, Toaster } from "react-hot-toast"

const App = () => {
  const [inputImage, setInputImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000"

  // Handle file change (drag and drop or click to upload)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInputImage(file);
      setImagePreview(URL.createObjectURL(file));
      setExtractedData(null); // Reset extracted data
    }
  };

  // Handle drag-and-drop
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setInputImage(file);
      setImagePreview(URL.createObjectURL(file));
      setExtractedData(null);
    }
  };

  const handleUpload = async () => {
    if (!inputImage) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("document", inputImage);

    try {
      const response = await axios.post(`${apiUrl}/api/v1/images/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setExtractedData(response.data?.data || "No text extracted");
    } catch (error) {
      console.error("Error uploading file:", error);
      setExtractedData("Error uploading file.");
    } finally {
      setLoading(false);
    }
  };

  const hanldeCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Data copied successfully")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-50 p-8">
      {/* Heading */}
      <h1 className="text-center text-4xl font-serif mb-12 text-indigo-800 tracking-wide">
        Convert Documents to Text
      </h1>

      {/* Main Container */}
      <div className="w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Container for Drag-and-Drop and Preview Sections */}
        <div className="w-full flex flex-col md:flex-row justify-evenly p-5 items-center gap-5">
          {/* Drag and Drop Area */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="relative flex flex-col items-center justify-center cursor-pointer border-3 border-dashed border-indigo-300 p-8 rounded-xl transition-all duration-300 hover:border-indigo-500 hover:shadow-lg"
            style={{
              width: '500px',
              height: '400px',
            }}
          >
            <div
              style={{
                width: '200px',
                height: '200px',
                backgroundImage: `url('/upload.png')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                marginBottom: '20px'
              }}
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept="image/*"
            />
            {!inputImage ? (
              <Typography variant="h6" className="text-indigo-600 font-medium text-center">
                Drag & Drop or Click to Upload
              </Typography>
            ) : <Typography variant="h6" className="text-indigo-600 font-medium text-center">
              Change Input File
            </Typography>}
          </div>

          {/* Image Preview Section */}
          <div className="flex flex-col items-center space-y-6">
            <div className="bg-gray-50 p-4 rounded-xl shadow-lg">
              {imagePreview ? (
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Uploaded Preview"
                  className="rounded-lg"
                  style={{ width: '350px', height: '350px', objectFit: 'contain' }}
                />
              ) : (
                <Box
                  component="img"
                  src="/no-image.png"
                  alt="No Image"
                  className="rounded-lg opacity-50"
                  style={{ width: '350px', height: '350px', objectFit: 'contain' }}
                />
              )}
            </div>

            {/* Extract Text Button */}
            {inputImage && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={loading}
                className="w-full py-3 text-lg font-medium rounded-lg transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: '#4F46E5' }}
              >
                {loading ? "Processing..." : "Extract Text"}
              </Button>
            )}
          </div>
        </div>

        {/* Extracted Text Output Section */}
        {extractedData && (
          <div className="mt-12 mx-auto p-8 max-w-2xl bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl shadow-lg">
            <Typography variant="h5" className="text-indigo-700 font-semibold mb-6">
              Extracted Data
            </Typography>
            <div className="space-y-4">
              <div className="flex flex-col space-y-3 text-gray-700">
                <p className="flex justify-between border-b pb-2">
                  <strong className="text-indigo-900">Document Type:</strong>
                  <span>{extractedData.documentType || "N/A"}</span>
                </p>
                <p className="flex justify-between border-b pb-2">
                  <strong className="text-indigo-900">Name:</strong>
                  <span>{extractedData.name || "N/A"}</span>
                </p>
                <p className="flex justify-between border-b pb-2">
                  <strong className="text-indigo-900">Expiry Date:</strong>
                  <span>{extractedData.expiryDate || "N/A"}</span>
                </p>
                <p className="flex justify-between border-b pb-2">
                  <strong className="text-indigo-900">Document Number:</strong>
                  <span>{extractedData.documentNumber || "N/A"}</span>
                </p>
              </div>
            </div>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => hanldeCopy(JSON.stringify(extractedData))}
              className="mt-6 w-full py-2 rounded-lg transition-all duration-300 hover:bg-indigo-50"
            >
              Copy Text
            </Button>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default App;
