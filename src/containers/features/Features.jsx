import React from 'react';
import Feature from '../../components/feature/Feature';
import './features.css';

const featuresData = [
  {
    title: 'Text-Based Generation',
    text: 'The system can generate questions from a passage of text, article, or document by analyzing key points or summaries.',
  },
  {
    title: 'Language Support',
    text: 'Generate questions in multiple languages, catering to global users and educational institutions.',
  },
  {
    title: 'Adaptive Learning Support',
    text: "Generate personalized questions based on the learner's previous responses or performance (useful for revision or practice tests).",
  },
  {
    title: 'Shareable Question Sets',
    text: 'Allows users to share generated question sets with others via links, email, or export options.',
  },
];

const Features = () => (
  <div className="gpt3__features section__padding" id="features">
    <div className="gpt3__features-heading">
      <h1 className="gradient__text">The Future is Now and You Just Need to Realize It. Step into Future Today. & Make it Happen.</h1>
    </div>
    <div className="gpt3__features-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
  </div>
);

export default Features;