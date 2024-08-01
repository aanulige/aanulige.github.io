import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../AuthContext';

const BlogPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('User:', user);
    if (user) {
      console.log('User Role:', user.role);
    }
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.sub);
    }

    console.log('User:', user);
    if (user) {
      console.log('User Role:', user.role);
    }

    axios.get('http://localhost:8080/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the posts!', error);
      });
  }, []);

  const handleAddPost = () => {
    navigate('/add-post');  // 假设有一个添加博客的页面
  };

  return (
    <div>
      <header>
        <Link to="/" className="back-button">Back to Home</Link>
        <div className="auth-links">
          {user ? (
            <>
              <span>Welcome, {user.username}</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Please log in</Link>
          )}
        </div>
      </header>
      <h1>Haoyu Chen’s Blog</h1>
      {user && user.role && user.role.authority === 'ADMIN' && (
            <button onClick={() => navigate('/add-post')}>Add New Blog</button>
      )}

      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </h2>
            <p>{post.date ? new Date(post.date).toLocaleString() : 'No date provided'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
