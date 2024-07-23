import { useState } from 'react';
import { TextField, Button, Box, InputAdornment, Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
    phoneNumber: yup.string().required('Phone Number is required'),
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

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const onSubmit = (data) => {
    setFormData({ ...formData, ...data });
    nextStep();
  };

  return (
    <Box sx={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('fullName')}
          name='fullName'
          label='Full Name'
          variant='outlined'
          value={formData.fullName}
          onChange={handleChange('fullName')}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          fullWidth
          margin='normal'
        />
        <TextField
          {...register('businessEmail')}
          name='businessEmail'
          label='Business Email'
          variant='outlined'
          value={formData.businessEmail}
          onChange={handleChange('businessEmail')}
          error={!!errors.businessEmail}
          helperText={errors.businessEmail?.message}
          fullWidth
          margin='normal'
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('country')}
              name='country'
              label='Country'
              variant='outlined'
              value={formData.country}
              onChange={handleChange('country')}
              error={!!errors.country}
              helperText={errors.country?.message}
              fullWidth
              margin='normal'
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('phoneNumber')}
              name='phoneNumber'
              label='Phone Number'
              variant='outlined'
              value={formData.phoneNumber}
              onChange={handleChange('phoneNumber')}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>+20</InputAdornment>
                ),
              }}
              fullWidth
              margin='normal'
            />
          </Grid>
        </Grid>
        <TextField
          {...register('password')}
          name='password'
          type={showPassword ? 'text' : 'password'}
          label='Password'
          variant='outlined'
          value={formData.password}
          onChange={handleChange('password')}
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
          margin='normal'
        />
        <TextField
          {...register('confirmPassword')}
          name='confirmPassword'
          type={showConfirmPassword ? 'text' : 'password'}
          label='Confirm Password'
          variant='outlined'
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
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
          margin='normal'
        />
        <Box display='flex' justifyContent='flex-end' mt={2}>
          <Button type='submit' variant='contained' color='primary'>
            Next
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Step1;
