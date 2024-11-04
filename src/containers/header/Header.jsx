import React from 'react';
import ai from '../../assets/ai.png';
import './header.css';

const Header = () => (
  
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <h1 className="gradient__text">Automated Question Builder powered by GenAI</h1>
      <p>An Automated Question Builder is a tool that uses AI to quickly generate relevant and high-quality questions for surveys, quizzes, or assessments. It simplifies content creation by customizing questions to match specific topics, difficulty levels, or objectives, saving time and ensuring accuracy.</p>
    <div className="gpt3__header-btn">
    <a href='/trainer_dashboards/Adlin.html'>
      <button id="button2" type="button">Student</button>
      </a>
      <a href='/employee_dashboards/elogin.html'>
      <button id="button1" type="button">Faculty</button>
      </a>
      <a href='/admin_dashboards/adlin.html'>
      <button type="button">Admin</button>
      </a>
    </div>
    </div>

    <div className="gpt3__header-image">
      <img src={ai} alt='ai' />
    </div>
  </div>
);

export default Header;
