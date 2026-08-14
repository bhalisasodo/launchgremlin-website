import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { initPerformanceTelemetry } from './utils/analytics';

// Initialize Core Web Vitals and scroll telemetry
if (typeof window !== 'undefined') {
  initPerformanceTelemetry();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
