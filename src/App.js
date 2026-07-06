import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [health, setHealth] = useState(null);
  const [testData, setTestData] = useState(null);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setHealth(data))
      .catch(error => console.error('Error fetching health:', error));

    fetch('/api/test_data')
      .then(res => res.json())
      .then(data => setTestData(data))
      .catch(error => console.error('Error fetching test data:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>TestApp</h1>
        <h2>Health Check</h2>
        {health ? <p>{health.status}</p> : <p>Loading health...</p>}

        <h2>Sample Test Data</h2>
        {testData ? (
          <ul>
            {testData.data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>Loading test data...</p>
        )}
      </header>
    </div>
  );
}

export default App;
