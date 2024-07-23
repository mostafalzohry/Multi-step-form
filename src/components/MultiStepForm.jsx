import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    businessEmail: '',
    country: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const onSubmitForm = () => {
    console.log('Form submitted:', formData);
  };

  switch (step) {
    case 1:
      return <Step1 nextStep={nextStep} formData={formData} setFormData={setFormData} />;
    case 2:
      return <Step2 nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} />;
    case 3:
      return <Step3 prevStep={prevStep} formData={formData} setFormData={setFormData} onSubmitForm={onSubmitForm} />;
    default:
      return null;
  }
};

export default MultiStepForm;
