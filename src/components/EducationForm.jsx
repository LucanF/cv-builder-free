
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SectionTitle from './SectionTitle';
import FormField from './FormField';

const EducationForm = ({ education, updateEducation }) => {
  const [currentEducation, setCurrentEducation] = useState({
    id: '',
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEducation({
      ...currentEducation,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // Update existing education entry
      updateEducation(
        education.map((edu) =>
          edu.id === currentEducation.id ? currentEducation : edu
        )
      );
    } else {
      // Add new education entry
      updateEducation([...education, { ...currentEducation, id: uuidv4() }]);
    }
    
    // Reset form
    setCurrentEducation({
      id: '',
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    setIsEditing(false);
  };

  const handleEdit = (id) => {
    const eduToEdit = education.find((edu) => edu.id === id);
    setCurrentEducation(eduToEdit);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    updateEducation(education.filter((edu) => edu.id !== id));
  };

  const handleCancel = () => {
    setCurrentEducation({
      id: '',
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    setIsEditing(false);
  };

  return (
    <div className="cv-form-section">
      <SectionTitle title="Education" />

      <div className="item-list">
        {education.map((edu) => (
          <div key={edu.id} className="item">
            <div className="item-content">
              <h3>{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</h3>
              <h4>{edu.institution}</h4>
              <p>
                {edu.startDate && edu.startDate} - {edu.endDate ? edu.endDate : 'Present'}
              </p>
              {edu.description && <p>{edu.description}</p>}
            </div>
            <div className="item-actions">
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => handleEdit(edu.id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(edu.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <FormField
            label="Institution"
            name="institution"
            value={currentEducation.institution}
            onChange={handleChange}
            placeholder="Harvard University"
            required
          />
          <FormField
            label="Degree"
            name="degree"
            value={currentEducation.degree}
            onChange={handleChange}
            placeholder="Bachelor of Science"
            required
          />
        </div>

        <div className="form-group">
          <FormField
            label="Field of Study"
            name="fieldOfStudy"
            value={currentEducation.fieldOfStudy}
            onChange={handleChange}
            placeholder="Computer Science"
          />
        </div>

        <div className="form-row">
          <FormField
            label="Start Date"
            name="startDate"
            value={currentEducation.startDate}
            onChange={handleChange}
            placeholder="Sept 2015"
          />
          <FormField
            label="End Date (leave empty for 'Present')"
            name="endDate"
            value={currentEducation.endDate}
            onChange={handleChange}
            placeholder="May 2019"
          />
        </div>

        <div className="form-group">
          <FormField
            label="Description"
            name="description"
            value={currentEducation.description}
            onChange={handleChange}
            placeholder="Relevant coursework, achievements, activities..."
            component="textarea"
            rows={3}
          />
        </div>

        <div className="actions">
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update Education' : 'Add Education'}
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

export default EducationForm;