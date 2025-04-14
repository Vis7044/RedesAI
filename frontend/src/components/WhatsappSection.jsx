import React, { useEffect, useState } from 'react';
import { UploadCloud, Sparkles } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaWhatsapp } from "react-icons/fa";
import axios from 'axios';

const WhatsappSection = () => {
  const inputref = React.useRef(null);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [sentimentResult, setSentimentResult] = useState(null);  // Store sentiment analysis result

  // Handle file input change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.txt')) {
      setFile(selectedFile);
    } else {
      alert('Please select a valid .txt file.');
    }
  };

  const apiUrl = import.meta.env.VITE_API_URL;
  // Handle form submission
  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setStatus('Uploading...');

    try {
      // Upload the file to the backend
      const uploadResponse = await fetch(`${apiUrl}/whatsapp/chats`, {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();
      if (uploadData.status === 'success') {
        setStatus(`Successfully uploaded ${uploadData.saved_messages} messages.`);
        
        // Once upload is successful, call the analyze API
        const analyzeResponse = await axios.post(`${apiUrl}/analyze`);
        const analyzeData = await analyzeResponse.data;

        if (analyzeData.status === 'success') {
          setSentimentResult(analyzeData); // Save the sentiment analysis result
          setStatus('Sentiment analysis completed successfully.');
        } else {
          setStatus(`Error in sentiment analysis: ${analyzeData.error}`);
        }
      } else {
        setStatus(`Error in upload: ${uploadData.error}`);
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);


  return (
    <div className="min-h-screen rounded-3xl shadow-2xl p-8 text-white"
    style={{
        backgroundImage:
          'radial-gradient(circle at center, #091D0E 0%,#0c0c0b 40%,  #0f0f0f 100%)',
      }}
    >
      
      {/* Centered Wrapper with Framing */}
      <div className="max-w-6xl mx-auto">
        
        {/* Row: 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Column 1: Header + Instructions */}
          <div className="space-y-6 p-6 border-cyan-500 border-2 rounded-xl shadow-lg" data-aos="fade-down">
            <h2 className="text-xl font-extrabold text-white drop-shadow-xl flex items-center gap-3">
                <FaWhatsapp size={32} fill='green' />
              WhatsApp Chat Analyzer
            </h2>

            <div className="bg-gray-700 border border-cyan-500/50 rounded-xl p-5 text-sm text-gray-300 space-y-3 shadow-inner leading-relaxed">
            <h4 className="text-cyan-400 text-lg font-semibold mb-2">📌 How to Export Your WhatsApp Chat:</h4>

            <ol className="list-decimal list-inside space-y-1">
                <li>Open WhatsApp on your phone.</li>
                <li>Go to the chat you want to analyze.</li>
                <li>Tap the three dots menu (<span className="text-cyan-300">⋮</span>) on the top right corner.</li>
                <li>Select <span className="text-white font-medium">More</span> → <span className="text-white font-medium">Export Chat</span>.</li>
                <li>Choose <span className="text-white font-medium">Without Media</span> for a faster upload.</li>
            </ol>

            <h4 className="text-cyan-400 text-lg font-semibold mt-4">📤 Upload the exported file below and wait for the results</h4>
            </div>

          </div>

          {/* Column 2: Upload Section */}
          <div  className="flex flex-col items-center justify-center space-y-4 p-6 bg-gray-800 rounded-xl shadow-lg" data-aos="zoom-in">
            <div onClick={() => inputref.current.click()} className="border-2 cursor-pointer border-dashed border-cyan-500/50 rounded-xl p-12 w-full flex flex-col items-center justify-center hover:border-cyan-300 transition-all duration-300 bg-gray-700/60 shadow-lg">
              <UploadCloud className="w-12 h-12 text-cyan-400 animate-bounce" />
              <p className="text-gray-300">Drag & drop your WhatsApp chat file here or click to upload</p>
              <input
                type="file"
                accept=".txt"
                className="hidden"
                ref={inputref}
                onChange={handleFileChange}
                
              />
              {file && (
                <p className="text-gray-300 mt-4">{file.name}</p>
              )}

              <button
                className="px-6 py-3 bg-cyan-600/50 text-white rounded-full text-sm font-semibold opacity-60 "
              >
                Upload Chat (.txt)
              </button>
            </div>
            <button  
                className="px-6 py-3 bg-cyan-600/50 text-white rounded-full text-sm font-semibold opacity-60 "
                onClick={handleUpload}
                disabled={!file}
              >
                analyze
              </button>
          </div>
          {/* Column 3: Sentiment Results */}
          <div className="flex flex-col justify-center space-y-4 p-6 border-2 border-cyan-400 rounded-xl shadow-lg" data-aos="fade-up">
            <div className="border-gray-700/50 flex flex-col items-center rounded-xl p-6 shadow-inner">
              <FaWhatsapp size={200} fill="#16a34a" />
              <h2 className="text-3xl font-semibold text-white drop-shadow-xl">WhatsApp</h2>
            </div>
          </div>

        </div>
        

      </div>
    </div>
  );
};

export default WhatsappSection;
