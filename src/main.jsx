// Import `StrictMode` dari React.
// `StrictMode` adalah komponen bawaan React yang membantu mendeteksi potensi masalah dalam aplikasi.
// Ini hanya aktif pada mode pengembangan dan tidak memengaruhi aplikasi di produksi.
import { StrictMode } from 'react';

// Import `createRoot` dari React DOM.
// `createRoot` adalah metode untuk merender komponen React ke dalam DOM menggunakan React 18.
import { createRoot } from 'react-dom/client';

// Import komponen utama `PengolahanGambar` dari file `PengolahanGambar.jsx`.
// Komponen ini akan menjadi root atau komponen utama aplikasi Anda.
import PengolahanGambar from './PengolahanGambar.jsx';

// Inisialisasi root React untuk aplikasi.
// `createRoot` mengambil elemen DOM dengan id `root` sebagai wadah utama aplikasi.
createRoot(document.getElementById('root')).render(
  // Gunakan `StrictMode` untuk membungkus komponen utama.
  // `StrictMode` memastikan kode lebih aman dengan memberikan peringatan untuk masalah tertentu.
  <StrictMode>
    {/* Render komponen `PengolahanGambar` sebagai komponen utama aplikasi */}
    <PengolahanGambar />
  </StrictMode>,
);
