import React from 'react';
import Feature from '../../components/feature/Feature';
import './whatGPT3.css';

const WhatGPT3 = () => (
  <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
    <div className="gpt3__whatgpt3-feature">
      <Feature title="What is AutoQuestAI" text="Imagine being able to transform the way you gather information, train your teams, or engage your customers with minimal effort. That's the power of an Automated Question Builder. This tool revolutionizes how we generate surveys, quizzes, and assessments by using AI to create high-quality, relevant questions—fast. No more time spent manually writing each question or worrying about gaps in content. With automated question building, you ensure comprehensive coverage, tailored difficulty levels, and adaptive learning experiences." />
    </div>
    <div className="gpt3__whatgpt3-heading">
      <h1 className="gradient__text">The possibilities are beyond your imagination</h1>
    </div>
    <div className="gpt3__whatgpt3-container">
      <Feature title="Customizable Question Types" text="Autoquest supports multiple question types such as mcq,true or false,etc" />
      <Feature title="Difficulty Levels" text="Allow users to select or adjust the difficulty level (e.g., beginner, intermediate, advanced) to generate more challenging or simpler questions." />
      <Feature title="Collaboration and Sharing" text="Multiple users (e.g., teachers, students) can collaborate on creating a question set in real-time." />
    </div>
  </div>
);

export default WhatGPT3;