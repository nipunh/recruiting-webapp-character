import React from 'react';

function AttributeControl({ attribute, value, updateAttribute }) {
    
    const calculateAbilityModifier = (value) => {
        return Math.floor((value - 10) / 2);
      };

      const modifier = calculateAbilityModifier(value);

  
    return (
      <div className="attribute-row">
        <span>{attribute}: {value} (Modifier: {modifier})</span>
        <button onClick={() => updateAttribute(attribute, -1)} disabled={value <= 0}>-</button>
        <button onClick={() => updateAttribute(attribute, 1)}>+</button>
      </div>
    );
  }
  
  
export default AttributeControl;