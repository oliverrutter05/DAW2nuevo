const navigationButtons = document.querySelectorAll(".nav-formulario");
const formSections = document.querySelectorAll("main > section");

navigationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const sectionId = button.getAttribute("aria-controls");

    formSections.forEach((section) => {
      section.hidden = section.id !== sectionId;
    });

    navigationButtons.forEach((navigationButton) => {
      navigationButton.setAttribute(
        "aria-pressed",
        String(navigationButton === button)
      );
    });
  });
});

import("./function.js")
  .then(({ initializeFormValidation }) => initializeFormValidation())
  .catch((error) => {
    console.error("No se pudieron inicializar las validaciones.", error);
  });
