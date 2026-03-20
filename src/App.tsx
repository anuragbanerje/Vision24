import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import PublishNews from './pages/PublishNews';
import ManageRSS from './pages/ManageRSS';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/publish" element={<PublishNews />} />
          <Route path="/manage-rss" element={<ManageRSS />} />
          <Route path="/videos" element={<div className="flex items-center justify-center min-h-[60vh] text-gray-400 font-bold uppercase tracking-widest">Video Section Coming Soon</div>} />
          <Route path="/podcasts" element={<div className="flex items-center justify-center min-h-[60vh] text-gray-400 font-bold uppercase tracking-widest">Podcasts Section Coming Soon</div>} />
          <Route path="/profile" element={<div className="flex items-center justify-center min-h-[60vh] text-gray-400 font-bold uppercase tracking-widest">Profile Section Coming Soon</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

