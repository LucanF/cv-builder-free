import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faGlobe } from '@fortawesome/free-solid-svg-icons';
import '../styles/cv-styles.css';

const CVPreview = ({ cvData, template = 'classic' }) => {
  const { personalInfo, education, workExperience, skills } = cvData;
  
  const fullName = `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`.trim() || 'Your Name';
  
  // Helper function to render icons using emoji for compatibility
  const renderIcon = (iconName) => {
    switch(iconName) {
      case 'email': return '✉️ ';
      case 'phone': return '📱 ';
      case 'location': return '📍 ';
      case 'website': return '🌐 ';
      default: return '';
    }
  };
  
  return (
    <div className={`cv-preview template-${template}`} id="cv-preview">
      <div className="cv-preview-inner">
        {/* Header Section */}
        <div className="cv-header">
          <div className="cv-name">{fullName}</div>
          {personalInfo.title && <div className="cv-title">{personalInfo.title}</div>}
          <div className="cv-contact">
            {personalInfo.email && (
              <span>
                {renderIcon('email')}
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span>
                {renderIcon('phone')}
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.address && (
              <span>
                {renderIcon('location')}
                {personalInfo.address}
              </span>
            )}
            {personalInfo.website && (
              <span>
                {renderIcon('website')}
                {personalInfo.website}
              </span>
            )}
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
        
        {/* Watermark for free version */}
        <div className="cv-watermark">
          Created with CV Builder Free
        </div>
      </div>
    </div>
  );
};

export default CVPreview;