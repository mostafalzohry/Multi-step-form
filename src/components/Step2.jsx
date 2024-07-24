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
  const [selectedCountry, setSelectedCountry] = useState(formData.companyCountry || "");
  const [selectedCity, setSelectedCity] = useState(formData.city || "");

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
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      ...formData,
      lang: formData.lang || 'ar',
      companyCountry: formData.companyCountry || "",
      city: formData.city || ""
    },
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const lang = watch('lang');

  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
    setValue('companyCountry', countryCode);
    const selectedCountryData = countries.find(country => country.code === countryCode);
    setCities(selectedCountryData ? selectedCountryData.cities : []);
    setSelectedCity(""); 
    setValue('city', ""); 
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
    loadCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const selectedCountryData = countries.find(country => country.code === selectedCountry);
      if (selectedCountryData) {
        setCities(selectedCountryData.cities);
      }
    }
  }, [selectedCountry, countries]);

  useEffect(() => {
    setSelectedCountry(formData.companyCountry || "");
    setSelectedCity(formData.city || "");
  }, [formData]);

  return (
    <Box sx={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
          {...register('companyName')}
          label='Company Name'
          variant='outlined'
          error={!!errors.companyName}
          helperText={errors.companyName?.message}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
               <TextField
              select
              {...register("lang")}
              label="Language"
              variant="outlined"
              error={!!errors.lang}
              helperText={errors.lang?.message}
              fullWidth
              value={lang} 
            >
              <MenuItem value='en'>English</MenuItem>
              <MenuItem value='ar'>Arabic</MenuItem>
            </TextField>
              </InputAdornment>
            ),
          }}
        />
                  </Grid>


          <Grid item xs={12}>
            <TextField
              {...register("address")}
              label="Address"
              variant="outlined"
              error={!!errors.address}
              helperText={errors.address?.message}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("companyBusinessEmail")}
              label="Business Email"
              variant="outlined"
              error={!!errors.companyBusinessEmail}
              helperText={errors.companyBusinessEmail?.message}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              select
              {...register("companyCountry")}
              label="Country"
              variant="outlined"
              value={selectedCountry}
              onChange={handleCountryChange}
              error={!!errors.companyCountry}
              helperText={errors.companyCountry?.message}
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
              select
              {...register("city")}
              label="City"
              variant="outlined"
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setValue('city', e.target.value);
              }}
              error={!!errors.city}
              helperText={errors.city?.message}
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
              label="Company Phone Number"
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start">+20</InputAdornment>,
              }}
              error={!!errors.companyPhoneNumber}
              helperText={errors.companyPhoneNumber?.message}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("companyPhoneNumber2")}
              label="Company Phone Number 2"
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start">+20</InputAdornment>,
              }}
              error={!!errors.companyPhoneNumber2}
              helperText={errors.companyPhoneNumber2?.message}
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
