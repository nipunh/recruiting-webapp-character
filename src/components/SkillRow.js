import React from 'react';

const SkillRow = ({ skill, points, modifier, updateSkillPoints }) => {
    return (
        <span>
            {skill.name}: {points} (Modifier: {modifier})
            <button onClick={() => updateSkillPoints(skill.name, 1)}>+</button>
            <button onClick={() => updateSkillPoints(skill.name, -1)}>-</button>
            &nbsp;
        </span>
    );
};

export default SkillRow;
