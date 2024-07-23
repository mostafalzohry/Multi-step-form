import { TextField, Button, Box, InputAdornment, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Step2 = ({ prevStep, formData, setFormData, nextStep }) => {
  const schema = yup.object().shape({
    companyName: yup.string().required("Company Name is required"),
    address: yup.string().required("Address is required"),
    companyBusinessEmail: yup
      .string()
      .email("Invalid email")
      .required("Business Email is required"),
    companyCountry: yup.string().required("Country is required"),
    city: yup.string().required("City is required"),
    companyPhoneNumber: yup.string().required("Phone Number is required"),
    companyPhoneNumber2: yup.string().required("Phone Number is required"),
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
    <Box sx={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("companyName")}
          name="companyName"
          label="Company Name"
          variant="outlined"
          value={formData.companyName}
          onChange={handleChange("companyName")}
          error={!!errors.companyName}
          helperText={errors.companyName?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          {...register("address")}
          name="address"
          label="Address"
          variant="outlined"
          value={formData.address}
          onChange={handleChange("address")}
          error={!!errors.address}
          helperText={errors.address?.message}
          fullWidth
          margin="normal"
        />
        <TextField
          {...register("companyBusinessEmail")}
          name="companyBusinessEmail"
          label="Business Email"
          variant="outlined"
          value={formData.companyBusinessEmail}
          onChange={handleChange("companyBusinessEmail")}
          error={!!errors.companyBusinessEmail}
          helperText={errors.companyBusinessEmail?.message}
          fullWidth
          margin="normal"
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("companyCountry")}
              name="companyCountry"
              label="Country"
              variant="outlined"
              value={formData.companyCountry}
              onChange={handleChange("companyCountry")}
              error={!!errors.companyCountry}
              helperText={errors.companyCountry?.message}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("city")}
              name="city"
              label="City"
              variant="outlined"
              value={formData.city}
              onChange={handleChange("city")}
              error={!!errors.city}
              helperText={errors.city?.message}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("companyPhoneNumber")}
              name="companyPhoneNumber"
              label="Company Phone Number"
              variant="outlined"
              value={formData.companyPhoneNumber}
              onChange={handleChange("companyPhoneNumber")}
              error={!!errors.companyPhoneNumber}
              helperText={errors.companyPhoneNumber?.message}
              InputProps={{
                startAdornment: <InputAdornment position="start">+20</InputAdornment>,
              }}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("companyPhoneNumber2")}
              name="companyPhoneNumber2"
              label="Company Phone Number 2"
              variant="outlined"
              value={formData.companyPhoneNumber2}
              onChange={handleChange("companyPhoneNumber2")}
              error={!!errors.companyPhoneNumber2}
              helperText={errors.companyPhoneNumber2?.message}
              InputProps={{
                startAdornment: <InputAdornment position="start">+20</InputAdornment>,
              }}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button onClick={prevStep} variant="contained">
            Back
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Step2;
