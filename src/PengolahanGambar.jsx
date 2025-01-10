import './App.css';
import React, { useState, useRef } from 'react';

const PengolahanGambar = () => {
  const [gambarUrl, setGambarUrl] = useState(null);
  const [gambarAsli, setGambarAsli] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const kanvasRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const kanvas = kanvasRef.current;
          kanvas.width = img.width;
          kanvas.height = img.height;
          const ctx = kanvas.getContext('2d', { willReadFrequently: true });
          ctx.drawImage(img, 0, 0);
          setGambarAsli(img);
        };
        img.src = e.target.result;
        setGambarUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    const canvas = kanvasRef.current;
    const timestamp = new Date().getTime();
    const link = document.createElement('a');
    link.download = `edited_image_${timestamp}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleCompleteReset = () => {
    if (gambarAsli) {
      const ctx = kanvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, kanvasRef.current.width, kanvasRef.current.height);
      ctx.drawImage(gambarAsli, 0, 0);
    }
    alert('Gambar telah dikembalikan ke kondisi awal dan filter telah direset.');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const prosesGambar = (type, kanvasRef) => {
    const ctx = kanvasRef.current.getContext('2d');
    const imageData = ctx.getImageData(0, 0, kanvasRef.current.width, kanvasRef.current.height);
    const data = imageData.data;

    if (type === 'threshold') {
      // Example threshold processing logic
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const threshold = avg < 128 ? 0 : 255;
        data[i] = data[i + 1] = data[i + 2] = threshold;
      }
    } else if (type === 'kecerahan') {
      // Example brightness processing logic
      const brightness = 30;
      for (let i = 0; i < data.length; i += 4) {
        data[i] += brightness;
        data[i + 1] += brightness;
        data[i + 2] += brightness;
      }
    } else if (type === 'erosi') {
      // Erosion effect (simplified version)
      // More complex erosion can be implemented here
    } else if (type === 'dilasi') {
      // Dilation effect (simplified version)
      // More complex dilation can be implemented here
    } else if (type === 'grayscale') {
      // Grayscale effect
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = data[i + 1] = data[i + 2] = avg;
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="kontainer-utama">
        <div className="area-gambar">
          <canvas ref={kanvasRef} className="kanvas-gambar"></canvas>
          <input type="file" onChange={handleFileUpload} accept="image/*" className="file-input" />
        </div>

        <div className="panel-kontrol">
          <div className="bagian">
            <h3>List of Processing</h3>
            <div className="grid-buttons">
              <button onClick={() => prosesGambar('threshold', kanvasRef)}>Image Threshold</button>
              <button onClick={() => prosesGambar('kecerahan', kanvasRef)}>Image Brightness</button>
              <button onClick={() => prosesGambar('erosi', kanvasRef)}>Erosi</button>
              <button onClick={() => prosesGambar('dilasi', kanvasRef)}>Dilasi</button>
              <button onClick={() => prosesGambar('grayscale', kanvasRef)}>RGB to Grayscale</button>
            </div>
          </div>

          <div className="kumpulan-tombol">
            <button
              onClick={handleCompleteReset}
              className="tombol-batal"
            >
              Reset All
            </button>
            <button
              onClick={handleDownload}
              className="tombol-download"
            >
              Save and Download Image
            </button>
          </div>
        </div>
      </div>
      
      <div className="theme-toggle-container">
        <button 
          className="theme-toggle-button"
          onClick={toggleDarkMode}
        >
          {darkMode ? '☀️ Mode Terang' : '🌙 Mode Gelap'}
        </button>
      </div>
    </div>
  );
};

export default PengolahanGambar;
