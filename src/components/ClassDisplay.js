import React from 'react';
import { CLASS_LIST } from '../consts.js';

const ClassDisplay = ({ attributes, onSelectClass }) => {
  return (
    <div>
      {Object.entries(CLASS_LIST).map(([className, requirements]) => {
        // Check if the character meets the minimum requirements for this class
        const requirementsMet = Object.keys(requirements).every(attr => {
          return attributes[attr] >= requirements[attr];
        });

        return (
          <div
            key={className}
            className={`class-option ${requirementsMet ? 'highlight' : ''}`}
            onClick={() => onSelectClass(className)}
            style={{ cursor: 'pointer', padding: '10px', margin: '5px', border: '1px solid black' }}
          >
            {className}
          </div>
        );
      })}
    </div>
  );
};

export default ClassDisplay;
