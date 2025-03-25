
import React from 'react';
import SectionTitle from './SectionTitle';
import FormField from './FormField';

const PersonalInfoForm = ({ personalInfo, updatePersonalInfo }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updatePersonalInfo({
      ...personalInfo,
      [name]: value
    });
  };

  return (
    <div className="cv-form-section">
      <SectionTitle title="Personal Information" />
      <div className="form-row">
        <FormField
          label="First Name"
          name="firstName"
          value={personalInfo.firstName}
          onChange={handleChange}
          placeholder="John"
        />
        <FormField
          label="Last Name"
          name="lastName"
          value={personalInfo.lastName}
          onChange={handleChange}
          placeholder="Doe"
        />
      </div>
      <div className="form-group">
        <FormField
          label="Professional Title"
          name="title"
          value={personalInfo.title}
          onChange={handleChange}
          placeholder="Software Developer"
        />
      </div>
      <div className="form-row">
        <FormField
          label="Email"
          name="email"
          type="email"
          value={personalInfo.email}
          onChange={handleChange}
          placeholder="john.doe@example.com"
        />
        <FormField
          label="Phone"
          name="phone"
          value={personalInfo.phone}
          onChange={handleChange}
          placeholder="+1 123 456 7890"
        />
      </div>
      <div className="form-group">
        <FormField
          label="Address"
          name="address"
          value={personalInfo.address}
          onChange={handleChange}
          placeholder="New York, NY"
        />
      </div>
      <div className="form-group">
        <FormField
          label="Website"
          name="website"
          value={personalInfo.website}
          onChange={handleChange}
          placeholder="www.johndoe.com"
        />
      </div>
      <div className="form-group">
        <FormField
          label="Professional Summary"
          name="summary"
          value={personalInfo.summary}
          onChange={handleChange}
          placeholder="Experienced software developer with a passion for creating innovative solutions..."
          component="textarea"
          rows={4}
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;