import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPostPage = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.get(`http://localhost:8080/posts/${postId}`, config)
      .then(response => {
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch(error => {
        console.error('There was an error fetching the post!', error);
      });
  }, [postId]);

  const handleEditPost = (event) => {
    event.preventDefault();

    const updatedPost = { title, content };
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.put(`http://localhost:8080/posts/${postId}`, updatedPost, config)
      .then(response => {
        navigate('/blog');
      })
      .catch(error => {
        console.error('There was an error updating the post!', error);
      });
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleEditPost}>
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
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPostPage;
