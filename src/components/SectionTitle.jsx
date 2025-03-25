
import React from 'react';

const SectionTitle = ({ title, action }) => {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {action && action}
    </div>
  );
};

export default SectionTitle;