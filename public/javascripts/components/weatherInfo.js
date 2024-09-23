import { fetchWeatherData } from '../services/fetchWeatherData.js';
import { getWeatherIcon } from '../helpers/weatherIcons.js';
import { getWeatherDescription } from '../helpers/weatherDescriptions.js';
import { generateWeatherLayout } from '../templates/generateWeatherLayout.js';

export class WeatherInfo {
    constructor(city) {
        this.city = city;
        this.resultContainer = document.querySelector('.accordion');
    }

    async displayWeatherForCity() {
        const { id, latitude, longitude, name, country, elevation } = this.city;

        try {
            const weatherData = await fetchWeatherData(latitude, longitude);

            const weatherCode = weatherData?.current_weather?.weathercode || 'default';
            const formatTime = (dateTimeString) => {
                const date = new Date(dateTimeString);
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            };

            // Fetching the correct current weather humidity
            const currentWeather = {
                temperature: weatherData?.current_weather?.temperature || 'N/A',
                humidity: weatherData?.current_weather?.relative_humidity_2m_max || 'N/A',
                windspeed: weatherData?.current_weather?.windspeed || 'N/A',
                winddirection: weatherData?.current_weather?.winddirection || 'N/A',
                // Trimming the sunrise and sunset times
                sunrise: weatherData?.daily?.sunrise?.[0] ? formatTime(weatherData.daily.sunrise[0]) : 'N/A',
                sunset: weatherData?.daily?.sunset?.[0] ? formatTime(weatherData.daily.sunset[0]) : 'N/A',
                timezone: weatherData?.timezone || 'N/A',
                elevation: elevation || 'N/A',
                description: getWeatherDescription(weatherCode),
                icon: getWeatherIcon(weatherCode),
            };

            const dailyForecast = weatherData?.daily?.time?.map((date, index) => {
                const dailyWeatherCode = weatherData?.daily?.weathercode?.[index] || 'default';
                return {
                    date: new Date(date).toLocaleDateString(),
                    temperature: weatherData?.daily?.temperature_2m_max?.[index] || 'N/A',
                    humidity: weatherData?.daily?.relative_humidity_2m_max?.[index] || 'N/A',
                    windspeed: weatherData?.daily?.windspeed_10m_max?.[index] || 'N/A',
                    description: getWeatherDescription(dailyWeatherCode),
                    icon: getWeatherIcon(dailyWeatherCode),
                };
            }) || [];

            const formatDateTime = (dateTimeString) => {
                const date = new Date(dateTimeString);
                const formattedDate = date.toLocaleDateString(); // Get the date
                const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Get time without seconds
                return { formattedDate, formattedTime };
            };

            // Extract formatted date and time
            const { formattedDate, formattedTime } = formatDateTime(weatherData?.current_weather?.time);
            
            // Pass all data including formattedDate and formattedTime
            const cityItem = generateWeatherLayout(
                id, 
                name, 
                country, 
                formattedDate, 
                formattedTime, 
                currentWeather, 
                dailyForecast,
                currentWeather.timezone,
                currentWeather.elevation
            );
            
            // Insert the generated weather layout
            this.resultContainer.insertAdjacentHTML('beforeend', cityItem);
        } catch (error) {
            console.error(`Error fetching weather data for ${name}:`, error);
        }
    }
}
