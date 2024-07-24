import React, { useState } from 'react';
import { TextField, Button, Box, InputAdornment, Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import buttonStyles from '../styles/buttonStyles';

const Step1 = ({ nextStep, formData, setFormData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const schema = yup.object().shape({
    fullName: yup.string().required('Full Name is required'),
    businessEmail: yup
      .string()
      .email('Invalid email')
      .required('Business Email is required'),
    country: yup.string().required('Country is required'),
    phoneNumber: yup
      .number()
      .typeError("Phone number must be a valid number.")
      .required("Phone number is required."),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
 
  } = useForm({
    defaultValues: formData,
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const onSubmit = (data) => {
    setFormData({ ...formData, ...data });
    nextStep();
  };

  return (
    <Box sx={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              {...register('fullName')}
              name='fullName'
              label='Full Name'
              variant='outlined'
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('businessEmail')}
              name='businessEmail'
              label='Business Email'
              variant='outlined'
              error={!!errors.businessEmail}
              helperText={errors.businessEmail?.message}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('country')}
              name='country'
              label='Country'
              variant='outlined'
              error={!!errors.country}
              helperText={errors.country?.message}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('phoneNumber')}
              name='phoneNumber'
              label='Phone Number'
              variant='outlined'
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>+20</InputAdornment>
                ),
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('password')}
              name='password'
              type={showPassword ? 'text' : 'password'}
              label='Password'
              variant='outlined'
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Box
                      style={{ cursor: 'pointer' }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </Box>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('confirmPassword')}
              name='confirmPassword'
              type={showConfirmPassword ? 'text' : 'password'}
              label='Confirm Password'
              variant='outlined'
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Box
                      style={{ cursor: 'pointer' }}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </Box>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={buttonStyles.nextButton}
          >
            Next
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Step1;
