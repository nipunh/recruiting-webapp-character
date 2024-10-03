// MinimumRequirements.js
import React from 'react';
import { CLASS_LIST } from '../consts';

const MinimumRequirements = ({ attributes, selectedClass, onClose }) => {
  const requirements = CLASS_LIST[selectedClass];

  return (
    <div>
      <ul>
        {Object.entries(requirements).map(([attr, value]) => (
          <li key={attr}>
            {attr}: {value} (Your Attribute: {attributes[attr]})
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
      
    </div>
  );
};

export default MinimumRequirements;
