import { cacheWeatherData, getCachedWeatherData } from '../helpers/cache.js';

export async function fetchGeocodingData(city) {
    const cachedData = getCachedWeatherData(city);
    if (cachedData) {
        return cachedData;
    }

    const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=fr&format=json`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    cacheWeatherData(city, data);
    return data;
}
