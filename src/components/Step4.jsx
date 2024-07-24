import React from "react";
import { Box, Button, Typography } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import buttonStyles from "../styles/buttonStyles";

const Step4 = ({ prevStep, formData, onSubmitForm, loading }) => {
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

      <Box display="flex" justifyContent="flex-end" mt={2}>
        {!loading && (
          <Button
            onClick={prevStep}
            variant="contained"
            sx={buttonStyles.backButton}
          >
            Back
          </Button>
        )}
        <Button
          onClick={onSubmitForm}
          variant="contained"
          color="primary"
          sx={buttonStyles.nextButton}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Confirm'}
        </Button>
      </Box>
    </Box>
  );
};

export default Step4;
