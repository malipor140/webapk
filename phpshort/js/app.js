'use strict'

window.addEventListener('DOMContentLoaded', function () {
  // Get all menu triggers
  document.querySelectorAll('[data-trigger="menu"]').forEach(function (button) {
    // On menu click
    button.addEventListener('click', function (e) {
      e.preventDefault();

      // For each menu icons
      button.querySelectorAll('svg').forEach(function (icon) {
        // Toggle the icons states
        icon.classList.toggle('hidden');
      });

      // Toggle the menu target state
      document.querySelector(button.dataset.target).classList.toggle('hidden');
    });
  });

  window.addEventListener('scroll', updateDocsMenu);
  window.addEventListener('resize', updateDocsMenu);
});

let updateDocsMenu = () => {
  // Get all the docs elements with an id attribute
  let elements = document.querySelectorAll('#documentation-content [id]');

  // Set the default target element to the first docs element
  let target = elements[0];

  for (let i = 0; i < elements.length; i++) {
    // If there's a next docs element available
    if (elements[i + 1] !== undefined) {
      // Check if the current docs element is in focus, or past scrolled, and the next element is still out of focus
      if (elements[i].getBoundingClientRect().top <= 96 && elements[i + 1].getBoundingClientRect().top > 96) {
        target = elements[i];
        break;
      }
    } else {
      // If the current docs element is in focus, or past scrolled
      if (elements[i].getBoundingClientRect().top <= 96) {
        target = elements[i];
        break;
      }
    }
  }

  // Get the menu anchor elements not matching the current docs section
  document.querySelectorAll('#documentation-menu a:not([href="#' + target.getAttribute('id') + '"])').forEach(function (element) {
    // Unset previous active states on the menu anchor
    element.classList.remove(...element.dataset.active.trim().split(' '));
  });

  // Get the menu anchor element matching the current docs section
  let menuElement = document.querySelector('#documentation-menu a[href="#' + target.getAttribute('id') + '"]');

  // If there's a menu anchor element exists
  if (menuElement) {
    // Set the active state to the menu anchor element
    menuElement.classList.add(...menuElement.dataset.active.trim().split(' '));
  }
}