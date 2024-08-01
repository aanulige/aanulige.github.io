import React, { useContext } from 'react';
import yourPhoto from '../assets/IMG_0177.png';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { AuthContext } from '../AuthContext'; // 导入AuthContext

const HomePage = () => {
  const { user, logout } = useContext(AuthContext); // 使用AuthContext获取用户信息

  return (
    <div className="homepage">
      <header>
        <h1>Welcome to My Personal Blog</h1>
        <div className="auth-links">
          <Link to="/blog" className="blog-button">Go to Blog</Link> {/* 调整按钮位置 */}
          {user ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <Link to="/login">Please log in</Link>
          )}
        </div>
      </header>
      
      <div className="content">
        <aside className="sidebar">
        <div className="profile-picture">
          <img src={yourPhoto} alt="Your Name" /> {/* 使用缩小后的图片 */}
        </div>
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>Email: chen192022@outlook.com</p>
            <p>Phone: +1(647)534-5347</p>
            <p>Location: Ottawa, ON</p>
          </div>
          <div className="skills">
            <h3>Skills</h3>
            <ul>
              <li>React</li>
              <li>JavaScript</li>
              <li>Java</li>
              <li>Spring Boot</li>
              <li>MongoDB</li>
              <li>AWS</li>
            </ul>
          </div>
        </aside>

        <main className="main-content">
          <section className="personal-info">
            <h2>About Me</h2>
            <p>Hello! My name is Haoyu Chen. I am a software developer with a passion for programming. I have experience in various technologies including Java, Spring Boot, SQL, React, and more.</p>
          </section>

          <section className="resume">
            <div className="resume-content">
              <h3>Experience</h3>
              <ul>
                <li>
                  <strong>Software Developer at Eth Tech</strong> (Jan 2024 - June 2024)
                  <p>Developed and maintained web applications using React and Spring Boot. Collaborated with cross-functional teams to design and implement new features.</p>
                </li>
                <li>
                  <strong>Software Engineer Intern at Brix</strong> (Sep 2023 - Dec 2023)
                  <p>Worked on the front-end development of e-commerce applications using React. Assisted in integrating RESTful APIs with front-end components.</p>
                </li>
              </ul>

              <h3>Education</h3>
              <ul>
                <li>
                  <strong>MEng in Software Engineering, University of Western Ontario</strong> 
                  <span>(2022 - Present)</span>
                  <p>Specialized in software engineering and web development. Completed a thesis on scalable web architectures using microservices.</p>
                </li>
                <li>
                  <strong>BEng in Electrical Engineering, Carleton University</strong> 
                  <span>(2021 - 2022)</span>
                  <p>Focused on software development and algorithms. Participated in several hackathons and coding competitions.</p>
                </li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
