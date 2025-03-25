
import React, { useRef } from 'react';
import { usePDF } from 'react-to-pdf';

const PDFExport = ({ cvData }) => {
  const { toPDF, targetRef } = usePDF({
    filename: `${cvData.personalInfo.firstName || 'CV'}_${cvData.personalInfo.lastName || 'Document'}.pdf`,
    page: { margin: 15 }
  });
  
  return (
    <>
      {/* Hidden div that will be converted to PDF */}
      <div style={{ display: 'none' }}>
        <div ref={targetRef} style={{ width: '210mm', padding: '15mm', fontFamily: 'Arial, sans-serif' }}>
          {/* Header Section */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h1 style={{ margin: '0 0 5px', color: '#3498db', fontSize: '28px' }}>
              {cvData.personalInfo.firstName} {cvData.personalInfo.lastName}
            </h1>
            {cvData.personalInfo.title && (
              <h2 style={{ margin: '0 0 10px', color: '#2c3e50', fontSize: '18px', fontWeight: 'normal' }}>
                {cvData.personalInfo.title}
              </h2>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', fontSize: '14px' }}>
              {cvData.personalInfo.email && <span>{cvData.personalInfo.email}</span>}
              {cvData.personalInfo.phone && <span>| {cvData.personalInfo.phone}</span>}
              {cvData.personalInfo.address && <span>| {cvData.personalInfo.address}</span>}
              {cvData.personalInfo.website && <span>| {cvData.personalInfo.website}</span>}
            </div>
          </div>

          {/* Summary Section */}
          {cvData.personalInfo.summary && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '5px', color: '#3498db' }}>
                Professional Summary
              </h3>
              <p style={{ margin: '10px 0', lineHeight: '1.5', fontSize: '14px' }}>
                {cvData.personalInfo.summary}
              </p>
            </div>
          )}

          {/* Work Experience Section */}
          {cvData.workExperience.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '5px', color: '#3498db' }}>
                Work Experience
              </h3>
              {cvData.workExperience.map((job) => (
                <div key={job.id} style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{job.position}</div>
                      <div style={{ fontStyle: 'italic', fontSize: '14px' }}>
                        {job.company}{job.location && `, ${job.location}`}
                      </div>
                    </div>
                    <div style={{ fontSize: '14px', color: '#777' }}>
                      {job.startDate} - {job.endDate || 'Present'}
                    </div>
                  </div>
                  {job.description && (
                    <p style={{ margin: '5px 0', fontSize: '14px', lineHeight: '1.5' }}>
                      {job.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education Section */}
          {cvData.education.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '5px', color: '#3498db' }}>
                Education
              </h3>
              {cvData.education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                        {edu.degree}{edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                      </div>
                      <div style={{ fontStyle: 'italic', fontSize: '14px' }}>{edu.institution}</div>
                    </div>
                    <div style={{ fontSize: '14px', color: '#777' }}>
                      {edu.startDate} - {edu.endDate || 'Present'}
                    </div>
                  </div>
                  {edu.description && (
                    <p style={{ margin: '5px 0', fontSize: '14px', lineHeight: '1.5' }}>
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Skills Section */}
          {cvData.skills.length > 0 && (
            <div>
              <h3 style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '5px', color: '#3498db' }}>
                Skills
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '10px 0' }}>
                {cvData.skills.map((skill) => (
                  <span
                    key={skill.id}
                    style={{
                      backgroundColor: '#f0f8ff',
                      color: '#3498db',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Export Button */}
      <button onClick={() => toPDF()} className="btn btn-success">
        Export as PDF
      </button>
    </>
  );
};

export default PDFExport;