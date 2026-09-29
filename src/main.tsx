/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
import { DisciplinaPage } from './pages/DisciplinaPage';
import { ProtecaoPage } from './pages/ProtecaoPage';
import { FormacaoPage } from './pages/FormacaoPage';
import { GalleryPage } from './components/GalleryPage';
import './index.css';

registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/disciplina" element={<DisciplinaPage />} />
        <Route path="/protecao" element={<ProtecaoPage />} />
        <Route path="/formacao" element={<FormacaoPage />} />
        <Route path="/galeria" element={<GalleryPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
