// This file contains the JavaScript code for the portfolio website.
// It includes functionality for interactivity, such as event listeners and dynamic content updates.

document.addEventListener('DOMContentLoaded', () => {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');

    if (navbarToggle) {
        navbarToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('is-active');
        });
    }

    // Additional interactivity can be added here
});