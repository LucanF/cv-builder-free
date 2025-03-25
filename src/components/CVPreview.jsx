
import React from 'react';
import '../styles/cv-styles.css';

const CVPreview = ({ cvData }) => {
  const { personalInfo, education, workExperience, skills } = cvData;

  return (
    <div className="cv-preview" id="cv-preview">
      <div className="cv-preview-inner">
        {/* Header Section */}
        <div className="cv-header">
          <div className="cv-name">
            {personalInfo.firstName || personalInfo.lastName
              ? `${personalInfo.firstName} ${personalInfo.lastName}`
              : 'Your Name'}
          </div>
          {personalInfo.title && <div className="cv-title">{personalInfo.title}</div>}
          <div className="cv-contact">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.address && <span>{personalInfo.address}</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        </div>

        {/* Summary Section */}
        {personalInfo.summary && (
          <div className="cv-section">
            <div className="cv-section-title">Professional Summary</div>
            <div className="cv-item-description">{personalInfo.summary}</div>
          </div>
        )}

        {/* Work Experience Section */}
        {workExperience.length > 0 && (
          <div className="cv-section">
            <div className="cv-section-title">Work Experience</div>
            {workExperience.map((job) => (
              <div className="cv-item" key={job.id}>
                <div className="cv-item-header">
                  <div>
                    <div className="cv-item-title">{job.position}</div>
                    <div className="cv-item-subtitle">
                      {job.company}
                      {job.location && `, ${job.location}`}
                    </div>
                  </div>
                  <div className="cv-item-dates">
                    {job.startDate} - {job.endDate || 'Present'}
                  </div>
                </div>
                {job.description && (
                  <div className="cv-item-description">{job.description}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <div className="cv-section">
            <div className="cv-section-title">Education</div>
            {education.map((edu) => (
              <div className="cv-item" key={edu.id}>
                <div className="cv-item-header">
                  <div>
                    <div className="cv-item-title">
                      {edu.degree}
                      {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                    </div>
                    <div className="cv-item-subtitle">{edu.institution}</div>
                  </div>
                  <div className="cv-item-dates">
                    {edu.startDate} - {edu.endDate || 'Present'}
                  </div>
                </div>
                {edu.description && (
                  <div className="cv-item-description">{edu.description}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <div className="cv-section">
            <div className="cv-section-title">Skills</div>
            <div className="cv-skills">
              {skills.map((skill) => (
                <span className="cv-skill" key={skill.id}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVPreview;