import React from "react";
import { Box, Button, Typography } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const Step4 = ({ prevStep, formData, onSubmitForm }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
        <MailOutlineIcon style={{ fontSize: "80px", color: "#2196f3" }} />
      </Box>
      <Typography variant="h6" gutterBottom>
        You're all set. Ready?
      </Typography>
      <Typography variant="body1" gutterBottom>
        We will send a message to this e-mail:
      </Typography>
      <Typography variant="body1" color="primary" gutterBottom>
        {formData.businessEmail}
      </Typography>
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button onClick={prevStep} variant="contained">
          Back
        </Button>
        <Button onClick={onSubmitForm} variant="contained" color="primary">
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default Step4;
