import axios from 'axios';

export const openWeatherApi = axios.create({
    baseURL: "http://api.openweathermap.org/data/2.5/"
})