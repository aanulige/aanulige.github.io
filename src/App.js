import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import BlogPage from './components/BlogPage';
import BlogDetailPage from './components/BlogDetailPage';
import LoginPage from './components/Login';
import AddPostPage from './components/AddPostPage';
import EditPostPage from './components/EditPostPage';
import { AuthProvider } from './AuthContext';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/posts/:postId" element={<BlogDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/add-post" element={<AddPostPage />} />
            <Route path="/edit-post/:postId" element={<EditPostPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;