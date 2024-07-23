import { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Container,
  StepConnector,
  stepConnectorClasses,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SecurityIcon from "@mui/icons-material/Security";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import { styled } from "@mui/material/styles";
import LockIcon from "@mui/icons-material/Lock";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4"; 

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#2196f3",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#2196f3",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const CustomStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: "#fff",
  zIndex: 1,
  color: "#2196f3",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  border: "2px solid #2196f3",
  ...(ownerState.active && {
    backgroundColor: "#2196f3",
    color: "#fff",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#2196f3",
    color: "#fff",
  }),
}));

function CustomStepIcon(props) {
  const { active, completed, className, icon } = props;

  const icons = {
    1: <AccountCircleIcon />,
    2: <ApartmentIcon />,
    3: <SecurityIcon />,
    4: <LockIcon /> 
  };

  return (
    <CustomStepIconRoot
      ownerState={{ active, completed }}
      className={className}
    >
      {icons[String(icon)]}
    </CustomStepIconRoot>
  );
}

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "Personal Info", icon: <AccountCircleIcon /> },
    { label: "Company Info", icon: <ApartmentIcon /> },
    { label: "Company Logo", icon: <AddPhotoAlternateIcon /> },
    { label: "Confirmation", icon: <SecurityIcon /> }, // New step
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    businessEmail: "",
    country: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    address: "",
    companyBusinessEmail: "",
    companyCountry: "",
    city: "",
    companyPhoneNumber: "",
    companyPhoneNumber2: "",
    companyLogo: "",
  });

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);
  const onSubmitForm = () => {
    console.log("Form submitted:", formData);
  };

  const renderStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Step1
            nextStep={nextStep}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 1:
        return (
          <Step2
            prevStep={prevStep}
            nextStep={nextStep}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 2:
        return (
          <Step3
            prevStep={prevStep}
            nextStep={nextStep}
            formData={formData}
            setFormData={setFormData}
            onSubmitForm={onSubmitForm}
          />
        );
      case 3:
        return (
          <Step4
            prevStep={prevStep}
            formData={formData}
            onSubmitForm={onSubmitForm}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f0f0f0", minHeight: "100vh", p: 4 }}>
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Stepper
            activeStep={step}
            alternativeLabel
            connector={<CustomConnector />}
          >
            {steps.map((stepItem, index) => (
              <Step key={index}>
                <StepLabel StepIconComponent={CustomStepIcon}>
                  {stepItem.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ p: 3, mt: 2 }}>{renderStepContent(step)}</Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MultiStepForm;
