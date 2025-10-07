import React, { useState, useEffect } from 'react';
import './Dad.scss';

function Dad() {
  const [joke, setJoke] = useState('// Joke goes here');
  const [loading, setLoading] = useState(false);

  const generateJoke = async () => {
    setLoading(true);
    try {
      const config = {
        headers: { Accept: "application/json" },
      };
      const res = await fetch("https://icanhazdadjoke.com/", config);
      const data = await res.json();
      setJoke(data.joke);
    } catch (error) {
      console.error('Error fetching joke:', error);
      setJoke('Oops! Failed to fetch a joke. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  // Load initial joke when component mounts
  useEffect(() => {
    generateJoke();
  }, []);

  // Add keyboard listener
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && !loading) {
        generateJoke();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [loading]);

  return (
    <div className="container">
      <h3>Don't Laugh Challenge</h3>
      <div className="joke">
        {loading ? 'Loading...' : joke}
      </div>
      <button 
        className="btn" 
        onClick={generateJoke}
        disabled={loading}
        title="Press Enter or click for a new joke"
      >
        {loading ? 'Loading...' : 'Get Another Joke'}
      </button>
      <div className="hint">
        Press <strong>Enter</strong> for another joke
      </div>
    </div>
  );
}

export default Dad;
