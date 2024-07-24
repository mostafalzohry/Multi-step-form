import React from 'react';
import { Box, Typography, Link, Button } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const Congratulations = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
      sx={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}
    >
      <MailOutlineIcon style={{ fontSize: '100px', color: '#3f51b5' }} />
      <Typography variant="h6" sx={{ marginTop: '20px' }}>
        Congratz, you successfully created your account.
      </Typography>
      <Typography variant="body1" sx={{ marginTop: '10px' }}>
        We just sent you a confirmation email
        <br />
        Please check your E-mail
      </Typography>
      <Typography variant="body2" sx={{ marginTop: '20px' }}>
        Didn’t receive it? <br />
        Check your Spam folder or{' '}
        <Link href="#" color="primary">
          Resend Email
        </Link>
      </Typography>
    </Box>
  );
};

export default Congratulations;
