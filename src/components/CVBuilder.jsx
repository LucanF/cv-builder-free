
import React, { useState } from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import EducationForm from './EducationForm';
import WorkExperienceForm from './WorkExperienceForm';
import SkillsForm from './SkillsForm';
import CVPreview from './CVPreview';
import PDFExport from './PDFExport';

const CVBuilder = () => {
  const [cvData, setCvData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      title: '',
      email: '',
      phone: '',
      address: '',
      website: '',
      summary: ''
    },
    education: [],
    workExperience: [],
    skills: []
  });

  const updatePersonalInfo = (personalInfo) => {
    setCvData({
      ...cvData,
      personalInfo
    });
  };

  const updateEducation = (education) => {
    setCvData({
      ...cvData,
      education
    });
  };

  const updateWorkExperience = (workExperience) => {
    setCvData({
      ...cvData,
      workExperience
    });
  };

  const updateSkills = (skills) => {
    setCvData({
      ...cvData,
      skills
    });
  };

  return (
    <div className="cv-builder">
      <div className="cv-form">
        <PersonalInfoForm 
          personalInfo={cvData.personalInfo} 
          updatePersonalInfo={updatePersonalInfo}
        />
        <EducationForm 
          education={cvData.education} 
          updateEducation={updateEducation}
        />
        <WorkExperienceForm 
          workExperience={cvData.workExperience} 
          updateWorkExperience={updateWorkExperience}
        />
        <SkillsForm 
          skills={cvData.skills} 
          updateSkills={updateSkills}
        />
        <div className="export-buttons">
          <PDFExport cvData={cvData} />
        </div>
      </div>
      <div>
        <CVPreview cvData={cvData} />
      </div>
    </div>
  );
};

export default CVBuilder;