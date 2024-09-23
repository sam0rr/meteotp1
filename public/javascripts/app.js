import { debounce } from './helpers/debounce.js';
import { CitySearch } from './components/citySearch.js';
import { showLoader, hideLoader } from './helpers/loader.js';
import { clearSearchInput } from './components/clearSearch.js';

const citySearch = new CitySearch(); 

const handleCitySearch = debounce(async (city) => {
    if (!city.trim()) {
        citySearch.clearResults();
        return;
    }

    showLoader();
    try {
        await citySearch.fetchAndDisplaySearchResults(city); 
    } catch (error) {
        console.error('Error fetching city data:', error);
        document.querySelector('.accordion').innerHTML = `<div class="alert alert-danger">No results found!</div>`;
    } finally {
        hideLoader();
    }
}, 300);

const searchInput = document.getElementById('search-bar-input');
searchInput.addEventListener('input', (e) => {
    const city = e.target.value;
    handleCitySearch(city);
});

clearSearchInput();
