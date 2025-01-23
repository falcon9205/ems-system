import React from 'react';
import './progress.css'; // Import CSS for styling

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar-container z-10 bg-white shadow-2xl fixed top-0 left-0 right-0">
      <div className="progress-bar h-[4px] md:h-[4px]" style={{ width: `${progress}%` }}>
        
      </div>
    </div>
  );
};

export default ProgressBar;
