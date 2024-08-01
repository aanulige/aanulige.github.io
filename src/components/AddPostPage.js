import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleAddPost = (event) => {
    event.preventDefault();

    const newPost = { title, content };
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.post('http://localhost:8080/posts', newPost, config)
      .then(response => {
        navigate('/blog');
      })
      .catch(error => {
        console.error('There was an error adding the post!', error);
      });
  };

  return (
    <div>
      <h1>Add New Post</h1>
      <form onSubmit={handleAddPost}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPostPage;