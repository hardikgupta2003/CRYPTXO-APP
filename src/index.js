import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import CryptoContext from './CryptoContext';
import "react-alice-carousel/lib/alice-carousel.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CryptoContext>
        <BrowserRouter>
            <App />
        </BrowserRouter>

    </CryptoContext>


);

