import axios from 'axios';

const COUNTRIES_NOW_API_URL = 'https://countriesnow.space/api/v0.1/countries';

export const fetchCountriesAndCities = async () => {
  const response = await axios.get(`${COUNTRIES_NOW_API_URL}`);
  return response.data.data.map((country) => ({
    name: country.country,
    code: country.iso2,
    cities: country.cities,
  }));
};
