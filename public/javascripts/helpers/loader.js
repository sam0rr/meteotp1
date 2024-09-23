export function showLoader() {
    const loader = document.querySelector('.alert-info');
    if (loader) {
        loader.style.display = 'block';
        loader.style.setProperty('display', 'block', 'important');
    }
}

export function hideLoader() {
    const loader = document.querySelector('.alert-info');
    if (loader) {
        setTimeout(() => {
            loader.style.setProperty('display', 'none', 'important');
        }, 500);
    }
}
