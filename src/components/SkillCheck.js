import React, { useState } from 'react';
import { SKILL_LIST } from '../consts';

function SkillCheck({ characterSkills }) {
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const [dc, setDc] = useState(10);
  const [roll, setRoll] = useState(null);
  const [result, setResult] = useState(null);

  const handleRoll = () => {
    const randomRoll = Math.floor(Math.random() * 20) + 1;
    const skillValue = characterSkills[selectedSkill] || 0;
    const total = randomRoll + skillValue;
    setRoll(randomRoll);
    setResult(total >= dc ? 'Success' : 'Failure');
  };

  return (
    <div>
      <select onChange={(e) => setSelectedSkill(e.target.value)}>
        {SKILL_LIST.map(skill => (
          <option key={skill.name} value={skill.name}>{skill.name}</option>
        ))}
      </select>
      <input
        type="number"
        value={dc}
        onChange={(e) => setDc(Number(e.target.value))}
        placeholder="Enter DC"
      />
      <button onClick={handleRoll}>Roll</button>
      {roll && <p>Roll: {roll}, Result: {result}</p>}
    </div>
  );
}

export default SkillCheck;
