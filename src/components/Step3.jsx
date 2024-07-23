import React, { useState, useRef } from 'react';
import { Button, Box, Typography, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const Step3 = ({ prevStep, formData, setFormData, onSubmitForm , nextStep}) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const schema = yup.object().shape({
    companyLogo: yup
      .mixed()
      .required('Company logo is required')
      .test('fileSize', 'The file is too large. Please upload an image smaller than 500 KB.', (value) => {
        return value && value.size <= 500 * 1024;
      })
      .test('fileType', 'Unsupported file format. Please use JPEG, PNG, or GIF.', (value) => {
        return value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors
  } = useForm({
    defaultValues: formData,
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue('companyLogo', file);
      setFormData({ ...formData, companyLogo: file });
      setPreviewUrl(URL.createObjectURL(file));
      clearErrors('companyLogo');
    }
  };

  const handleReplaceImage = () => {
    fileInputRef.current.click();
  };

  const onSubmit = (data) => {
    setFormData({ ...formData, ...data });
    nextStep();
  };

  return (
    <Box sx={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" gutterBottom>
          Upload Company Logo
        </Typography>
        <Box
          sx={{
            border: '2px dashed #ccc',
            borderRadius: '4px',
            padding: '20px',
            textAlign: 'center',
            marginBottom: '20px',
            position: 'relative',
            height: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <input
            {...register("companyLogo")}
            accept="image/*"
            type="file"
            id="company-logo-upload"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          {!previewUrl ? (
            <label htmlFor="company-logo-upload">
              <IconButton component="span" size="large">
                <AddPhotoAlternateIcon fontSize="large" />
              </IconButton>
            </label>
          ) : (
            <Box
              component="img"
              src={previewUrl}
              alt="Company Logo Preview"
              sx={{
                maxWidth: '100%',
                maxHeight: '150px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          )}
          <Typography variant="body2" color="textSecondary">
            Only images with a size lower than 500 KB are allowed.
          </Typography>
        </Box>
        {errors.companyLogo && (
          <Box sx={{ marginBottom: '10px' }}>
            <Typography color="error" variant="body2">
              {errors.companyLogo.message}
            </Typography>
            <Button onClick={handleReplaceImage} variant="outlined" color="primary" sx={{ mt: 1 }}>
              Replace Image
            </Button>
          </Box>
        )}
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button onClick={prevStep} variant="contained">
            Back
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Step3;