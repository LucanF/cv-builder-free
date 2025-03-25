
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SectionTitle from './SectionTitle';
import FormField from './FormField';

const WorkExperienceForm = ({ workExperience, updateWorkExperience }) => {
  const [currentJob, setCurrentJob] = useState({
    id: '',
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentJob({
      ...currentJob,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // Update existing job
      updateWorkExperience(
        workExperience.map((job) =>
          job.id === currentJob.id ? currentJob : job
        )
      );
    } else {
      // Add new job
      updateWorkExperience([...workExperience, { ...currentJob, id: uuidv4() }]);
    }
    
    // Reset form
    setCurrentJob({
      id: '',
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    setIsEditing(false);
  };

  const handleEdit = (id) => {
    const jobToEdit = workExperience.find((job) => job.id === id);
    setCurrentJob(jobToEdit);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    updateWorkExperience(workExperience.filter((job) => job.id !== id));
  };

  const handleCancel = () => {
    setCurrentJob({
      id: '',
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    setIsEditing(false);
  };

  return (
    <div className="cv-form-section">
      <SectionTitle title="Work Experience" />

      <div className="item-list">
        {workExperience.map((job) => (
          <div key={job.id} className="item">
            <div className="item-content">
              <h3>{job.position}</h3>
              <h4>{job.company}{job.location && `, ${job.location}`}</h4>
              <p>
                {job.startDate && job.startDate} - {job.endDate ? job.endDate : 'Present'}
              </p>
              {job.description && <p>{job.description}</p>}
            </div>
            <div className="item-actions">
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={() => handleEdit(job.id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(job.id)}
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
            label="Company"
            name="company"
            value={currentJob.company}
            onChange={handleChange}
            placeholder="Google Inc."
            required
          />
          <FormField
            label="Position"
            name="position"
            value={currentJob.position}
            onChange={handleChange}
            placeholder="Senior Software Engineer"
            required
          />
        </div>

        <div className="form-group">
          <FormField
            label="Location"
            name="location"
            value={currentJob.location}
            onChange={handleChange}
            placeholder="Mountain View, CA"
          />
        </div>

        <div className="form-row">
          <FormField
            label="Start Date"
            name="startDate"
            value={currentJob.startDate}
            onChange={handleChange}
            placeholder="Jan 2018"
          />
          <FormField
            label="End Date (leave empty for 'Present')"
            name="endDate"
            value={currentJob.endDate}
            onChange={handleChange}
            placeholder="Dec 2020"
          />
        </div>

        <div className="form-group">
          <FormField
            label="Description"
            name="description"
            value={currentJob.description}
            onChange={handleChange}
            placeholder="Describe your responsibilities, achievements, and technologies used..."
            component="textarea"
            rows={4}
          />
        </div>

        <div className="actions">
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update Experience' : 'Add Experience'}
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

export default WorkExperienceForm;