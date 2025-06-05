import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css'; 
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS styles
import 'lucide-react'; // Import Lucide icons if needed

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);