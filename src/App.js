import './App.css';
import { ATTRIBUTE_LIST, SKILL_LIST } from './consts.js';
import SkillCheck from './components/SkillCheck.js';
import AttributeControl from './components/AttributeControl.js';
import ClassDisplay from './components/ClassDisplay.js';
import MinimumRequirements from './components/MinimumRequirements.js';
import useCharacterData from './hooks/useCharacterData';
import { useState } from 'react';

function App() {
  const { characters, setCharacters, saveCharacters } = useCharacterData();
  const [skillCheckResults, setSkillCheckResults] = useState({});

  const addNewCharacter = () => {
    const newCharacter = {
      attributes: ATTRIBUTE_LIST.reduce((acc, attr) => ({ ...acc, [attr]: 10 }), {}),
      selectedClass: '',
      skills: SKILL_LIST.reduce((acc, skill) => ({ ...acc, [skill.name]: 0 }), {}),
    };
    setCharacters(prev => [...prev, newCharacter]);
  };

  const resetAllCharacters = () => {
    setCharacters([]);
  };

  const updateCharacterAttributes = (index, attrName, delta) => {
    const updatedCharacters = [...characters];
    const currentAttributes = updatedCharacters[index].attributes;
    const newValue = Math.max(currentAttributes[attrName] + delta, 0); // Ensure the value does not go below 0
  
    const totalAttributes = Object.values({
      ...currentAttributes,
      [attrName]: newValue,
    }).reduce((sum, value) => sum + value, 0);
  
    if (totalAttributes > 70) {
      alert('The total of all attributes cannot exceed 70. Please adjust your values.');
      return;
    }
  
    currentAttributes[attrName] = newValue;
    setCharacters(updatedCharacters);
  };
  

  const updateCharacterSkills = (index, skillName, delta) => {
    const updatedCharacters = [...characters];
    const currentPoints = updatedCharacters[index].skills[skillName];
    const totalPointsSpent = Object.values(updatedCharacters[index].skills).reduce((acc, val) => acc + val, 0);
    const availablePoints = 10 + (4 * Math.floor((updatedCharacters[index].attributes.Intelligence - 10) / 2));

    if (delta > 0 && totalPointsSpent < availablePoints) {
      updatedCharacters[index].skills[skillName] += 1;
    } else if (delta < 0 && currentPoints > 0) {
      updatedCharacters[index].skills[skillName] -= 1;
    }
    setCharacters(updatedCharacters);
  };

  const performSkillCheck = (characterIndex) => {
    const checkResults = {}; // Store results of each skill check
    SKILL_LIST.forEach(skill => {
      const skillValue = characters[characterIndex].skills[skill.name];
      // Example skill check logic: Randomly determine success or failure
      checkResults[skill.name] = Math.random() < skillValue / 10; // Adjust based on your logic
    });
    setSkillCheckResults(prev => ({
      ...prev,
      [characterIndex]: checkResults,
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>

      {/* Buttons Section */}
      <div className="button-section">
        <button onClick={addNewCharacter}>Add New Character</button>
        <button onClick={resetAllCharacters}>Reset All Characters</button>
        <button onClick={saveCharacters}>Save All Characters</button>
      </div>

      <section className="App-section">
        {characters.length > 0 ? 
        characters.map((character, index) => (
          <div key={index} className="character-section">
            <h2>Character {index + 1}</h2>
            <div className="character-content">
              {/* Attributes Section */}
              <div className="section-card">
                <h3>Attributes</h3>
                {ATTRIBUTE_LIST.map(attribute => (
                  <AttributeControl 
                    key={attribute} 
                    attribute={attribute} 
                    value={character.attributes[attribute]} 
                    updateAttribute={(attrName, delta) => updateCharacterAttributes(index, attrName, delta)} 
                  />
                ))}
              </div>

              {/* Class Selection Section */}
              <div className="section-card">
                <h3>Classes</h3>
                <ClassDisplay 
                  attributes={character.attributes} 
                  onSelectClass={(selectedClass) => {
                    const updatedCharacters = [...characters];
                    updatedCharacters[index].selectedClass = selectedClass;
                    setCharacters(updatedCharacters);
                  }} 
                />
              </div>

              {/* Minimum Requirements Section */}
              {character.selectedClass && (
                <div className="section-card">
                  <h3>Minimum Requirements for {character.selectedClass}</h3>
                  <MinimumRequirements attributes={character.attributes} selectedClass={character.selectedClass} />
                </div>
              )}

              {/* Skills Section */}
              <div className="section-card">
                <h3>Skills</h3>
                <p>Total skill points available: {10 + (4 * Math.floor((character.attributes.Intelligence - 10) / 2))}</p>
                {SKILL_LIST.map(skill => {
                  const points = character.skills[skill.name];
                  const attributeName = skill.attributeModifier;
                  const attributeValue = character.attributes[attributeName];
                  const attributeModifier = Math.floor((attributeValue - 10) / 2);
                  const total = points + attributeModifier;

                  return (
                    <div key={skill.name} className="skill-row">
                      {skill.name} - points: {points} 
                      <button onClick={() => updateCharacterSkills(index, skill.name, 1)}>+</button>
                      <button onClick={() => updateCharacterSkills(index, skill.name, -1)}>-</button>
                      (Modifier: {attributeName}: {attributeModifier}) total: {total}
                    </div>
                  );
                })}
              </div>

              {/* Skill Check Section */}
              <div className="section-card">
                <h3>Skill Check</h3>
                <SkillCheck 
                  characterSkills={character.skills} 
                  onPerformCheck={() => performSkillCheck(index)} // Pass the function
                />
                {skillCheckResults[index] && (
                  <div className="skill-check-results">
                    <h4>Skill Check Results:</h4>
                    <ul>
                      {SKILL_LIST.map(skill => (
                        <li key={skill.name}>
                          {skill.name}: {skillCheckResults[index][skill.name] ? "Success" : "Failure"}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )) : "No Character Found, Add New"}
      </section>
    </div>
  );
}

export default App;
