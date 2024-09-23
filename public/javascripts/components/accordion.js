export function attachAccordionListeners() {
    const buttons = document.querySelectorAll('.accordion-button');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const collapseSection = this.parentElement.nextElementSibling;
            collapseSection.classList.toggle('collapse');
        });
    });
}
