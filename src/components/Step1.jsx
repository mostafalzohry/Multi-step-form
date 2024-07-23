import React from "react";
import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Step1 = ({ nextStep, formData, setFormData }) => {
  const schema = yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
    businessEmail: yup
      .string()
      .email("Invalid email")
      .required("Business Email is required"),
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
        {...register("fullName")}
        name="fullName"
        label="Full Name"
        variant="outlined"
        value={formData.fullName}
        onChange={handleChange("fullName")}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
        fullWidth
        margin="normal"
      />
      <TextField
        {...register("businessEmail")}
        name="businessEmail"
        label="Business Email"
        variant="outlined"
        value={formData.businessEmail}
        onChange={handleChange("businessEmail")}
        error={!!errors.businessEmail}
        helperText={errors.businessEmail?.message}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Next
      </Button>
    </form>
  );
};

export default Step1;
