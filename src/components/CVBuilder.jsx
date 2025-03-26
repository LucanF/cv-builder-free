import React, { useState, useEffect } from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import EducationForm from './EducationForm';
import WorkExperienceForm from './WorkExperienceForm';
import SkillsForm from './SkillsForm';
import CVPreview from './CVPreview';
import PDFExport from './PDFExport';
import TemplateSelector from './TemplateSelector';

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
  
  const [activeTemplate, setActiveTemplate] = useState('classic');
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  
  // Auto-save CV data to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('cvData');
    const savedTemplate = localStorage.getItem('cvTemplate');
    
    if (savedData) {
      try {
        setCvData(JSON.parse(savedData));
      } catch (e) {
        console.error("Error parsing saved CV data", e);
      }
    }
    
    if (savedTemplate) {
      setActiveTemplate(savedTemplate);
    }
  }, []);
  
  useEffect(() => {
    try {
      localStorage.setItem('cvData', JSON.stringify(cvData));
      localStorage.setItem('cvTemplate', activeTemplate);
      setIsSaved(true);
      const timer = setTimeout(() => setIsSaved(false), 2000);
      return () => clearTimeout(timer);
    } catch (e) {
      console.error("Error saving CV data", e);
    }
  }, [cvData, activeTemplate]);

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
  
  const changeTemplate = (templateId) => {
    setActiveTemplate(templateId);
  };
  
  const clearCVData = () => {
    if (window.confirm('Are you sure you want to clear all CV data? This cannot be undone.')) {
      setCvData({
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
      localStorage.removeItem('cvData');
    }
  };

  // Active tab navigation
  const changeTab = (tabId) => {
    setActiveTab(tabId);
    document.getElementById(tabId).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="cv-builder">
      <div className="cv-sidebar">
        <div className="cv-form">
          <div className="form-nav">
            <button 
              className={`nav-btn ${activeTab === 'personal-info' ? 'active' : ''}`} 
              onClick={() => changeTab('personal-info')}
            >
              Personal
            </button>
            <button 
              className={`nav-btn ${activeTab === 'education' ? 'active' : ''}`} 
              onClick={() => changeTab('education')}
            >
              Education
            </button>
            <button 
              className={`nav-btn ${activeTab === 'work-experience' ? 'active' : ''}`} 
              onClick={() => changeTab('work-experience')}
            >
              Experience
            </button>
            <button 
              className={`nav-btn ${activeTab === 'skills' ? 'active' : ''}`} 
              onClick={() => changeTab('skills')}
            >
              Skills
            </button>
            <button 
              className={`nav-btn ${activeTab === 'templates' ? 'active' : ''}`} 
              onClick={() => changeTab('templates')}
            >
              Templates
            </button>
          </div>
          
          <div className="form-container">
            <div id="personal-info" className={activeTab === 'personal-info' ? '' : 'hidden-section'}>
              <PersonalInfoForm 
                personalInfo={cvData.personalInfo} 
                updatePersonalInfo={updatePersonalInfo}
              />
            </div>
            
            <div id="education" className={activeTab === 'education' ? '' : 'hidden-section'}>
              <EducationForm 
                education={cvData.education} 
                updateEducation={updateEducation}
              />
            </div>
            
            <div id="work-experience" className={activeTab === 'work-experience' ? '' : 'hidden-section'}>
              <WorkExperienceForm 
                workExperience={cvData.workExperience} 
                updateWorkExperience={updateWorkExperience}
              />
            </div>
            
            <div id="skills" className={activeTab === 'skills' ? '' : 'hidden-section'}>
              <SkillsForm 
                skills={cvData.skills} 
                updateSkills={updateSkills}
              />
            </div>
            
            <div id="templates" className={activeTab === 'templates' ? '' : 'hidden-section'}>
              <div className="cv-form-section">
                <div className="section-title">
                  <h2>CV Templates</h2>
                </div>
                <TemplateSelector 
                  activeTemplate={activeTemplate} 
                  onChange={changeTemplate} 
                />
                
                <div className="template-description">
                  <h3>Current Template: {activeTemplate.charAt(0).toUpperCase() + activeTemplate.slice(1)}</h3>
                  <p>Choose from various professional templates to make your CV stand out.</p>
                </div>
              </div>
            </div>
            
            <div className="actions-panel">
              <div className="save-status">
                {isSaved && <span className="saved-indicator">Changes saved 💾</span>}
              </div>
              
              <div className="action-buttons">
                <PDFExport cvData={cvData} template={activeTemplate} />
                <button className="btn btn-danger btn-sm" onClick={clearCVData}>
                  Clear All Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="cv-preview-container">
        <CVPreview cvData={cvData} template={activeTemplate} />
      </div>
    </div>
  );
};

export default CVBuilder;