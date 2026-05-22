import React, { useState } from 'react';
import './DerivAnalysisTool.css';

export default function DerivAnalysisTool() {
  // Sample data - users can modify this
  const [data, setData] = useState([2, 5, 8, 1, 6, 9, 3, 4, 7, 0]);
  const [inputValue, setInputValue] = useState('');
  
  // Even / Odd analysis
  const evenCount = data.filter(n => n % 2 === 0).length;
  const oddCount = data.filter(n => n % 2 !== 0).length;
  
  // Over / Under analysis (threshold 5)
  const overFive = data.filter(n => n > 5).length;
  const underFive = data.filter(n => n < 5).length;
  const equalFive = data.filter(n => n === 5).length;
  
  // Matches / Differs analysis
  const matches = data.filter((n, i, arr) => i > 0 && n === arr[i - 1]).length;
  const differs = data.filter((n, i, arr) => i > 0 && n !== arr[i - 1]).length;
  
  // Rise / Fall analysis
  let rise = 0;
  let fall = 0;
  data.forEach((n, i, arr) => {
    if (i === 0) return;
    if (n > arr[i - 1]) {
      rise++;
    } else if (n < arr[i - 1]) {
      fall++;
    }
  });
  
  // Additional stats
  const totalNumbers = data.length;
  const minValue = data.length > 0 ? Math.min(...data) : 0;
  const maxValue = data.length > 0 ? Math.max(...data) : 0;
  const average = data.length > 0 ? (data.reduce((a, b) => a + b, 0) / data.length).toFixed(2) : 0;
  
  // Handle data update
  const handleAddNumber = () => {
    const num = parseInt(inputValue);
    if (!isNaN(num)) {
      setData([...data, num]);
      setInputValue('');
    }
  };
  
  const handleRemoveLast = () => {
    if (data.length > 0) {
      setData(data.slice(0, -1));
    }
  };
  
  const handleReset = () => {
    setData([2, 5, 8, 1, 6, 9, 3, 4, 7, 0]);
  };
  
  const handleClear = () => {
    setData([]);
  };
  
  return (
    <div className="container">
      <div className="header">
        <h1>📊 Deriv Analysis Tool</h1>
        <p>Analyze Even/Odd • Over/Under • Matches/Differs • Rise/Fall</p>
      </div>
      
      <div className="data-section">
        <h2>📋 Current Data Set</h2>
        <div className="data-bubbles">
          {data.length > 0 ? (
            data.map((num, idx) => (
              <span key={idx} className="data-bubble">{num}</span>
            ))
          ) : (
            <p className="empty-message">No data. Add numbers below!</p>
          )}
        </div>
        
        <div className="controls">
          <input
            type="number"
            placeholder="Enter a number..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddNumber()}
            className="input-field"
          />
          <button onClick={handleAddNumber} className="btn btn-primary">➕ Add</button>
          <button onClick={handleRemoveLast} className="btn btn-warning">🗑️ Remove Last</button>
          <button onClick={handleClear} className="btn btn-danger">❌ Clear All</button>
          <button onClick={handleReset} className="btn btn-secondary">🔄 Reset</button>
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>📈 Basic Stats</h3>
          <p><strong>Total Numbers:</strong> {totalNumbers}</p>
          <p><strong>Min / Max:</strong> {minValue} / {maxValue}</p>
          <p><strong>Average:</strong> {average}</p>
        </div>
        
        <div className="stat-card">
          <h3>🔢 Even / Odd</h3>
          <div className="progress-container">
            <div className="progress-bar even" style={{width: `${totalNumbers ? (evenCount/totalNumbers)*100 : 0}%`}}>
              {evenCount}
            </div>
            <div className="progress-bar odd" style={{width: `${totalNumbers ? (oddCount/totalNumbers)*100 : 0}%`}}>
              {oddCount}
            </div>
          </div>
          <p><span className="even-badge">Even:</span> {evenCount}</p>
          <p><span className="odd-badge">Odd:</span> {oddCount}</p>
        </div>
        
        <div className="stat-card">
          <h3>⬆️⬇️ Over / Under (5)</h3>
          <div className="progress-container">
            <div className="progress-bar over" style={{width: `${totalNumbers ? (overFive/totalNumbers)*100 : 0}%`}}>
              {overFive}
            </div>
            <div className="progress-bar under" style={{width: `${totalNumbers ? (underFive/totalNumbers)*100 : 0}%`}}>
              {underFive}
            </div>
          </div>
          <p><span className="over-badge">&gt; 5:</span> {overFive}</p>
          <p><span className="under-badge">&lt; 5:</span> {underFive}</p>
          <p><span className="equal-badge">= 5:</span> {equalFive}</p>
        </div>
        
        <div className="stat-card">
          <h3>🔄 Matches / Differs</h3>
          <p><span className="match-badge">✓ Matches:</span> {matches}</p>
          <p><span className="differ-badge">✗ Differs:</span> {differs}</p>
          <small>(Consecutive numbers)</small>
        </div>
        
        <div className="stat-card">
          <h3>📈 Rise / Fall</h3>
          <p><span className="rise-badge">▲ Rise:</span> {rise}</p>
          <p><span className="fall-badge">▼ Fall:</span> {fall}</p>
          <small>(Changes between numbers)</small>
        </div>
      </div>
    </div>
  );
}