import React from "react";
import { TextField, Button, MenuItem, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Step2 = ({ nextStep, prevStep, formData, setFormData }) => {
  const schema = yup.object().shape({
    country: yup.string().required("Country is required"),
    phoneNumber: yup.string().required("Phone Number is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData,
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const onSubmit = (data) => {
    setFormData({ ...formData, ...data });
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("country")}
        name="country"
        select
        label="Country"
        variant="outlined"
        value={formData.country}
        onChange={handleChange("country")}
        error={!!errors.country}
        helperText={errors.country?.message}
        fullWidth
        margin="normal"
      >
        <MenuItem value="Egypt">Egypt</MenuItem>
      </TextField>
      <TextField
        {...register("phoneNumber")}
        name="phoneNumber"
        label="Phone Number"
        variant="outlined"
        value={formData.phoneNumber}
        onChange={handleChange("phoneNumber")}
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber?.message}
        fullWidth
        margin="normal"
      />
      <Box display="flex" justifyContent="flex-end">
        <Button onClick={prevStep} variant="contained">
          Back
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </Box>
    </form>
  );
};

export default Step2;
