// Import file CSS untuk styling aplikasi
import './App.css';
import { prosesGambar, resetUsedFunctions } from './ImageProcessingFunctions';

// Import React, serta hooks `useState` dan `useRef` untuk mengelola state dan referensi DOM
import React, { useState, useRef } from 'react';

const PengolahanGambar = () => {
  const [setGambarUrl] = useState(null);
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
    const kanvas = kanvasRef.current;
    if (!kanvas) return;
    const timestamp = new Date().getTime();
    const link = document.createElement('a');
    link.download = `edited_image_${timestamp}.png`;
    link.href = kanvas.toDataURL('image/png');
    link.click();
  };

  const handleCompleteReset = () => {
    if (gambarAsli) {
      const ctx = kanvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, kanvasRef.current.width, kanvasRef.current.height);
      ctx.drawImage(gambarAsli, 0, 0);
    }
    resetUsedFunctions();
    alert('Gambar telah dikembalikan ke kondisi awal dan filter telah direset.');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="kontainer-utama">
        {/* Area untuk memuat gambar */}
        <div className="area-gambar">
          <canvas ref={kanvasRef} className="kanvas-gambar"></canvas>
          <input type="file" onChange={handleFileUpload} accept="image/*" className="file-input" />
        </div>

        {/* Panel kontrol untuk memilih filter dan aksi */}
        <div className="panel-kontrol">
          <div className="bagian">
            <h3>List of Processing</h3>
            <div className="grid-buttons">
              {/* Tombol untuk masing-masing filter */}
              <button onClick={() => prosesGambar('threshold', kanvasRef)}>Image Threshold</button>
              <button onClick={() => prosesGambar('kecerahan', kanvasRef)}>Image Brightness</button>
              <button onClick={() => prosesGambar('erosi', kanvasRef)}>Erosi</button>
              <button onClick={() => prosesGambar('dilasi', kanvasRef)}>Dilasi</button>
              <button onClick={() => prosesGambar('grayscale', kanvasRef)}>RGB to Grayscale</button>
            </div>
          </div>

          {/* Tombol reset dan download */}
          <div className="kumpulan-tombol">
            <button onClick={handleCompleteReset} className="tombol-batal">Reset All</button>
            <button onClick={handleDownload} className="tombol-download">Save and Download Image</button>
          </div>
        </div>
      </div>
      
      {/* Tombol untuk mengaktifkan mode gelap */}
      <div className="theme-toggle-container">
        <button className="theme-toggle-button" onClick={toggleDarkMode}>
          {darkMode ? '☀️ Mode Terang' : '🌙 Mode Gelap'}
        </button>
      </div>
    </div>
  );
};

// Ekspor komponen utama
export default PengolahanGambar;
