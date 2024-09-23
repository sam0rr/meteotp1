import { cacheWeatherData, getCachedWeatherData } from '../helpers/cache.js';

export async function fetchWeatherData(latitude, longitude) {
    const cacheKey = `weather_${latitude}_${longitude}`;
    const cachedData = getCachedWeatherData(cacheKey);

    if (cachedData) {
        return cachedData;
    }

    const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&forecast_days=8&timezone=auto&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset,windspeed_10m_max,winddirection_10m_dominant,relative_humidity_2m_max,relative_humidity_2m_min`;
    const response = await fetch(weatherApiUrl);
    const data = await response.json();

    cacheWeatherData(cacheKey, data);
    return data;
}
