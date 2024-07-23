import React from 'react';
import { TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';



const Step3 = ({ prevStep, formData, setFormData, onSubmitForm }) => {

  const schema = yup.object().shape({
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: formData,
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const onSubmit = (data) => {
    setFormData({ ...formData, ...data });
    onSubmitForm();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('password')}
        name="password"
        type="password"
        label="Password"
        variant="outlined"
        value={formData.password}
        onChange={handleChange('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        fullWidth
        margin="normal"
      />
      <TextField
        {...register('confirmPassword')}
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        variant="outlined"
        value={formData.confirmPassword}
        onChange={handleChange('confirmPassword')}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        fullWidth
        margin="normal"
      />
      <Button onClick={prevStep} variant="contained">Back</Button>
      <Button type="submit" variant="contained" color="primary">Submit</Button>
    </form>
  );
};

export default Step3;
