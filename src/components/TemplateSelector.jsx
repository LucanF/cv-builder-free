import React from 'react';

const TemplateSelector = ({ activeTemplate, onChange }) => {
  const templates = [
    { id: 'classic', name: 'Classic', color: '#3b82f6' },
    { id: 'modern', name: 'Modern', color: '#2563eb' },
    { id: 'minimal', name: 'Minimal', color: '#1e293b' },
    { id: 'creative', name: 'Creative', color: '#6366f1' },
    { id: 'bold', name: 'Bold', color: '#0f172a' },
    { id: 'nature', name: 'Nature', color: '#65a30d' },
    { id: 'tech', name: 'Tech', color: '#38bdf8' }
  ];
  
  return (
    <div className="template-selector">
      <div className="template-selector-title">Choose Template</div>
      <div className="template-options">
        {templates.map(template => (
          <button
            key={template.id}
            className={`template-option ${activeTemplate === template.id ? 'active' : ''}`}
            onClick={() => onChange(template.id)}
            style={{ 
              '--template-color': template.color,
              '--border-color': activeTemplate === template.id ? template.color : 'transparent'
            }}
          >
            <span className="template-color" style={{ backgroundColor: template.color }}></span>
            <span className="template-name">{template.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;