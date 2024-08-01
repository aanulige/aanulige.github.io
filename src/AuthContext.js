import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('Decoded Token:', decoded); // 打印整个解码后的令牌
        
        // 假设 roles 是一个数组，提取第一个角色
        const userRole = decoded.roles && decoded.roles.length > 0 ? decoded.roles[0] : undefined;
  
        setUser({
          username: decoded.sub,
          role: userRole,
        });
      } catch (error) {
        console.error('Failed to decode token', error);
        setUser(null);
      }
    }
  }, []);
  
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
