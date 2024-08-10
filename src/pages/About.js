// <!-- Created by: Ayushi Amin ; Last Edited: Aug 2, 2024 -->
import React from 'react';
import './About.css';

function About() {
  return (
    <div id="about-card">
      <h1 id="about-heading">About the Creator</h1>
      <p class="about-paragraph">
        Hi, I'm Ayushi Amin, the creator of this website. I am currently pursuing a Bachelor of
        Engineering in Software Engineering at McMaster University, where I have been developing my skills
        in various programming languages and web technologies.
      </p>
      <p class="about-paragraph">
        My passion lies in creating interactive and user-friendly web applications, and I enjoy working on projects that challenge me to learn and grow as a developer.
      </p>
      <p class="about-paragraph">
        You can connect with me on LinkedIn or follow me on Instagram to stay updated with my latest projects and activities.
      </p>
      <div id="connect-section">
        <h2 id="connect-heading">Connect with Me</h2>
        <ul id="social-links">
          <li>
            <a href="https://www.linkedin.com/in/ayushiaminn" target="_blank" rel="noopener noreferrer" aria-label="Connect with Ayushi Amin on LinkedIn">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/_ayushiaminn_/" target="_blank" rel="noopener noreferrer" aria-label="Follow Ayushi Amin on Instagram">
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default About;
