import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  // 确保导入 jwtDecode
import { AuthContext } from '../AuthContext';

const BlogDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      console.log('Decoded Token:', decoded);
    }

    if (postId) {
      axios.get(`http://localhost:8080/posts/${postId}`)
        .then(response => {
          const fetchedPost = response.data;
          if (fetchedPost && fetchedPost.title) {
            setPost(fetchedPost);
          } else {
            console.error('Post data is not as expected', fetchedPost);
          }
        })
        .catch(error => {
          console.error('There was an error fetching the post!', error);
        });
    }
  }, [postId]);

  useEffect(() => {
    console.log('User:', user);
    if (user) {
      console.log('User Role:', user.role);
    }
  }, [user]);

  const handleEdit = () => {
    navigate(`/edit-post/${postId}`);  // 假设 EditPostPage 的路由是 /edit-post/:postId
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to="/blog" className="back-button">Back to Blogs</Link>
      <h1>{post.title}</h1>
      <p>{post.date ? new Date(post.date).toLocaleString() : 'No date provided'}</p>
      <p>{post.content}</p>
      {user && user.role && user.role.authority === 'ADMIN' && (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
};

export default BlogDetailPage;
