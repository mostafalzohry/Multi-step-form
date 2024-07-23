import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { Stepper, Step, StepLabel, Box, Container } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import LockIcon from '@mui/icons-material/Lock';

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { label: 'Step 1', icon: <AccountCircleIcon /> },
    { label: 'Step 2', icon: <BusinessIcon /> },
    { label: 'Step 3', icon: <LockIcon /> },
  ];

  const [formData, setFormData] = useState({
    fullName: '',
    businessEmail: '',
    country: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);
  const onSubmitForm = () => {
    console.log('Form submitted:', formData);
  };

  const renderStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <Step1 nextStep={nextStep} formData={formData} setFormData={setFormData} />;
      case 1:
        return <Step2 nextStep={nextStep} prevStep={prevStep} formData={formData} setFormData={setFormData} />;
      case 2:
        return <Step3 prevStep={prevStep} formData={formData} setFormData={setFormData} onSubmitForm={onSubmitForm} />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
      <Box sx={{ width: '100%', textAlign: 'center' }}>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel icon={step.icon}>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ p: 3, mt: 2 }}>
          {renderStepContent(step)}
        </Box>
      </Box>
    </Container>
  );
};

export default MultiStepForm;
