import { fetchGeocodingData } from '../services/fetchGeocodingData.js';
import { WeatherInfo } from './weatherInfo.js';

export class CitySearch {
    async fetchAndDisplaySearchResults(city) {
        try {
            const resultContainer = document.querySelector('.accordion');
            const data = await fetchGeocodingData(city);

            resultContainer.innerHTML = '';
            if (!data || !data.results || data.results.length === 0) {
                resultContainer.innerHTML = `<div class="alert alert-danger">No results found!</div>`;
                return;
            }

            data.results.forEach(async (cityData) => {
                const weatherInfo = new WeatherInfo(cityData);
                await weatherInfo.displayWeatherForCity();
            });
        } catch (error) {
            console.error('Error fetching city data:', error);
            document.querySelector('.accordion').innerHTML = `<div class="alert alert-danger">Error fetching city data.</div>`;
        }
    }

    clearResults() {
        const resultContainer = document.querySelector('.accordion');
        resultContainer.innerHTML = '';
    }
}
