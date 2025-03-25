
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SectionTitle from './SectionTitle';
import FormField from './FormField';

const SkillsForm = ({ skills, updateSkills }) => {
  const [currentSkill, setCurrentSkill] = useState({
    id: '',
    name: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentSkill({
      ...currentSkill,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentSkill.name.trim()) return;
    
    if (isEditing) {
      // Update existing skill
      updateSkills(
        skills.map((skill) =>
          skill.id === currentSkill.id ? currentSkill : skill
        )
      );
    } else {
      // Add new skill
      updateSkills([...skills, { ...currentSkill, id: uuidv4() }]);
    }
    
    // Reset form
    setCurrentSkill({
      id: '',
      name: ''
    });
    setIsEditing(false);
  };

  const handleEdit = (id) => {
    const skillToEdit = skills.find((skill) => skill.id === id);
    setCurrentSkill(skillToEdit);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    updateSkills(skills.filter((skill) => skill.id !== id));
  };

  const handleCancel = () => {
    setCurrentSkill({
      id: '',
      name: ''
    });
    setIsEditing(false);
  };

  return (
    <div className="cv-form-section">
      <SectionTitle title="Skills" />

      <div className="cv-skills item-list">
        {skills.map((skill) => (
          <div key={skill.id} className="cv-skill item">
            {skill.name}
            <div className="item-actions">
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => handleEdit(skill.id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(skill.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="form-row">
        <div className="form-group" style={{ flex: 1 }}>
          <FormField
            label="Skill"
            name="name"
            value={currentSkill.name}
            onChange={handleChange}
            placeholder="JavaScript, React, Project Management, etc."
            required
          />
        </div>

        <div className="actions" style={{ alignSelf: 'end', marginBottom: '1rem' }}>
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update Skill' : 'Add Skill'}
          </button>
          {isEditing && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SkillsForm;