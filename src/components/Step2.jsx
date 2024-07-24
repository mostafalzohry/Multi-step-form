import React, { useState, useEffect } from "react";
import { TextField, Button, Box, InputAdornment, Grid, MenuItem, FormControl, Select } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fetchCountriesAndCities } from "./apiService";
import buttonStyles from "../styles/buttonStyles";

const Step2 = ({ prevStep, formData, setFormData, nextStep }) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  const schema = yup.object().shape({
    companyName: yup.string().required("Please enter your company name."),
    lang: yup.string().required("Please select a language."),
    address: yup.string().required("Please enter your address."),
    companyBusinessEmail: yup
      .string()
      .email("Please enter a valid business email address.")
      .required("Business email is required."),
    companyCountry: yup.string().required("Please select the company's country."),
    city: yup.string().required("Please enter the city."),
    companyPhoneNumber: yup
      .number("Primary phone number must be a valid number.")
      .required("Please enter the company's primary phone number."),
    companyPhoneNumber2: yup
      .number("Secondary phone number must be a valid number.")
      .required("Please enter the company's secondary phone number."),
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

  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
    const selectedCountryData = countries.find(country => country.code === countryCode);
    setCities(selectedCountryData ? selectedCountryData.cities : []);
    setFormData({ ...formData, companyCountry: countryCode, city: "" });
  };

  const onSubmit = (data) => {
    setFormData({ ...formData, ...data });
    nextStep();
  };

  const loadCountries = async () => {
    const countriesList = await fetchCountriesAndCities();
    setCountries(countriesList);
  };

  useEffect(() => {
    if (!formData.lang) {
      setFormData({ ...formData, lang: 'ar' });
    }
  }, [formData, setFormData]);

  useEffect(() => {
    loadCountries();
  }, []);

  return (
    <Box sx={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
          {...register('companyName')}
          name='companyName'
          label='Company Name'
          variant='outlined'
          value={formData.companyName}
          onChange={handleChange('companyName')}
          error={!!errors.companyName}
          helperText={errors.companyName?.message}
          fullWidth
          margin='normal'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <FormControl>
                  <Select
                    {...register('lang')}
                    name='lang'
                    value={formData.lang}
                    onChange={handleChange('lang')}
                    error={!!errors.lang}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value='en'>English</MenuItem>
                    <MenuItem value='ar'>Arabic</MenuItem>
                  </Select>
                </FormControl>
              </InputAdornment>
            ),
          }}
        />
          </Grid>
                 <Grid item xs={12}>
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
            />
          </Grid>
          <Grid item xs={12}>
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
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("companyCountry")}
              name="companyCountry"
              label="Country"
              variant="outlined"
              value={formData.companyCountry}
              onChange={handleCountryChange}
              error={!!errors.companyCountry}
              helperText={errors.companyCountry?.message}
              select
              fullWidth
            >
              {countries.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.name}
                </MenuItem>
              ))}
            </TextField>
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
              select
              fullWidth
            >
              {cities.map((city, index) => (
                <MenuItem key={index} value={city}>
                  {city}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
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
            />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            onClick={prevStep}
            variant="contained"
            sx={buttonStyles.backButton}
          >
            Back
          </Button>
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

export default Step2;
