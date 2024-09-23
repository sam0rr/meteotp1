export function clearSearchInput() {
    const searchInput = document.getElementById('search-bar-input');
    const resultContainer = document.querySelector('.accordion');
    const clearButton = document.getElementById('clear-search');

    if (clearButton) {
        clearButton.addEventListener('click', () => {

            searchInput.value = '';
            resultContainer.innerHTML = '';

            const event = new Event('input', { bubbles: true });
            searchInput.dispatchEvent(event);

            searchInput.focus();
        });
    }
}
