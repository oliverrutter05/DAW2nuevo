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

function getElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`No se encontró el elemento con id "${id}".`);
  }
  return element;
}

function setFieldResult(fieldIds, errorId, message) {
  const errorElement = getElement(errorId);
  const fields = Array.isArray(fieldIds) ? fieldIds : [getElement(fieldIds)];
  const invalid = message.length > 0;

  fields.forEach((field) => {
    field.classList.toggle("invalid", invalid);
    field.classList.toggle("valid", !invalid);
    field.setAttribute("aria-invalid", String(invalid));
  });
  errorElement.textContent = message;

  return !invalid;
}

function trimmedLengthMessage(field, label, minimum, maximum) {
  const value = field.value.trim();

  if (!value) {
    return `${label} es obligatorio.`;
  }
  if (value.length < minimum) {
    return `${label} debe tener al menos ${minimum} caracteres.`;
  }
  if (value.length > maximum) {
    return `${label} no puede superar los ${maximum} caracteres.`;
  }
  return "";
}

function fileMessage(field, label) {
  const file = field.files[0];

  if (!file) {
    return `${label} es obligatoria.`;
  }
  if (file.type !== "image/jpeg") {
    return `${label} debe ser un archivo JPEG.`;
  }
  if (file.size > 5000000) {
    return `${label} no puede superar los 5.000.000 bytes.`;
  }
  return "";
}

function validateSocios() {
  const checks = [];
  const name = getElement("socio-nombre");
  const username = getElement("socio-usuario");
  const email = getElement("socio-correo");
  const age = getElement("socio-edad");
  const phone = getElement("socio-telefono");
  const password = getElement("socio-pass");
  const passwordConfirmation = getElement("socio-pass-confirm");
  const photo = getElement("socio-foto");
  const conditions = getElement("socio-condiciones");
  const modalityRadios = [
    getElement("mod-mensual"),
    getElement("mod-anual")
  ];

  checks.push(
    setFieldResult(
      "socio-nombre",
      "err-socio-nombre",
      trimmedLengthMessage(name, "El nombre completo", 4, 50)
    ),
    setFieldResult(
      "socio-usuario",
      "err-socio-usuario",
      trimmedLengthMessage(username, "El usuario", 5, 20)
    )
  );

  let emailMessage = "";
  if (!email.value.trim()) {
    emailMessage = "El correo electrónico es obligatorio.";
  } else if (email.validity.typeMismatch) {
    emailMessage = "Introduce un correo electrónico válido.";
  }
  checks.push(setFieldResult("socio-correo", "err-socio-correo", emailMessage));

  let ageMessage = "";
  if (age.value === "") {
    ageMessage = "La edad es obligatoria.";
  } else if (Number.isNaN(age.valueAsNumber)) {
    ageMessage = "Introduce una edad válida.";
  } else if (!Number.isInteger(age.valueAsNumber)) {
    ageMessage = "La edad debe ser un número entero.";
  } else if (age.valueAsNumber < 18 || age.valueAsNumber > 100) {
    ageMessage = "La edad debe estar entre 18 y 100 años.";
  }
  checks.push(setFieldResult("socio-edad", "err-socio-edad", ageMessage));

  checks.push(
    setFieldResult(
      "socio-telefono",
      "err-socio-telefono",
      phone.value.trim() ? "" : "El número de teléfono es obligatorio."
    )
  );

  let passwordMessage = "";
  if (!password.value) {
    passwordMessage = "La contraseña es obligatoria.";
  } else if (password.value.length < 8 || password.value.length > 16) {
    passwordMessage = "La contraseña debe tener entre 8 y 16 caracteres.";
  }
  checks.push(setFieldResult("socio-pass", "err-socio-pass", passwordMessage));

  let confirmationMessage = "";
  if (!passwordConfirmation.value) {
    confirmationMessage = "Confirma la contraseña.";
  } else if (passwordConfirmation.value !== password.value) {
    confirmationMessage = "Las contraseñas no coinciden.";
  }
  checks.push(
    setFieldResult(
      "socio-pass-confirm",
      "err-socio-pass-confirm",
      confirmationMessage
    )
  );

  checks.push(
    setFieldResult(
      "socio-foto",
      "err-socio-foto",
      fileMessage(photo, "La foto de perfil")
    )
  );
  checks.push(
    setFieldResult(
      modalityRadios,
      "err-socio-modalidad",
      modalityRadios.some((radio) => radio.checked)
        ? ""
        : "Selecciona una modalidad de suscripción."
    )
  );
  checks.push(
    setFieldResult(
      "socio-condiciones",
      "err-socio-condiciones",
      conditions.checked ? "" : "Debes aceptar las condiciones del club."
    )
  );

  return checks.every(Boolean);
}

function validateServicios() {
  const checks = [];
  const name = getElement("serv-nombre");
  const duration = getElement("serv-duracion");
  const price = getElement("serv-precio");
  const category = getElement("serv-categoria");

  checks.push(
    setFieldResult(
      "serv-nombre",
      "err-serv-nombre",
      trimmedLengthMessage(name, "El nombre del servicio", 3, 50)
    )
  );

  let durationMessage = "";
  if (duration.value === "") {
    durationMessage = "La duración es obligatoria.";
  } else if (Number.isNaN(duration.valueAsNumber) || !Number.isFinite(duration.valueAsNumber)) {
    durationMessage = "Introduce una duración numérica válida.";
  } else if (duration.valueAsNumber === 0) {
    durationMessage = "La duración no puede ser cero; el mínimo es 15 minutos.";
  } else if (!Number.isInteger(duration.valueAsNumber)) {
    durationMessage = "La duración debe ser un número entero de minutos.";
  } else if (duration.valueAsNumber < 15) {
    durationMessage = "La duración mínima es de 15 minutos.";
  } else if (duration.valueAsNumber % 15 !== 0) {
    durationMessage = "La duración debe ser múltiplo de 15 minutos.";
  }
  checks.push(
    setFieldResult("serv-duracion", "err-serv-duracion", durationMessage)
  );

  let priceMessage = "";
  if (price.value === "") {
    priceMessage = "El precio es obligatorio.";
  } else if (!Number.isFinite(price.valueAsNumber)) {
    priceMessage = "Introduce un precio numérico válido.";
  } else if (price.valueAsNumber < 0 || price.valueAsNumber > 9999.99) {
    priceMessage = "El precio debe estar entre 0 y 9.999,99 €.";
  } else if (price.validity.stepMismatch) {
    priceMessage = "El precio debe tener como máximo dos decimales.";
  }
  checks.push(setFieldResult("serv-precio", "err-serv-precio", priceMessage));

  checks.push(
    setFieldResult(
      "serv-categoria",
      "err-serv-categoria",
      category.value ? "" : "Selecciona una categoría."
    )
  );

  return checks.every(Boolean);
}

function updateTestimonialCounter() {
  const text = getElement("test-texto");
  const counter = getElement("contador-testimonio");
  counter.textContent = `${text.value.length} / 500 caracteres`;
}

function validateTestimonios() {
  const author = getElement("test-autor");
  const text = getElement("test-texto");
  const checks = [
    setFieldResult(
      "test-autor",
      "err-test-autor",
      trimmedLengthMessage(author, "El autor", 2, 50)
    ),
    setFieldResult(
      "test-texto",
      "err-test-texto",
      trimmedLengthMessage(text, "El testimonio", 10, 500)
    )
  ];

  return checks.every(Boolean);
}

function localCalendarDateKey(date) {
  const year = String(date.getFullYear()).padStart(4, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function validateNoticias() {
  const title = getElement("not-titulo");
  const content = getElement("not-contenido");
  const publicationDate = getElement("not-fecha");
  const image = getElement("not-imagen");
  const checks = [
    setFieldResult(
      "not-titulo",
      "err-not-titulo",
      trimmedLengthMessage(title, "El título", 3, 100)
    ),
    setFieldResult(
      "not-contenido",
      "err-not-contenido",
      trimmedLengthMessage(content, "El contenido", 20, 2000)
    )
  ];

  let dateMessage = "";
  if (!publicationDate.value) {
    dateMessage = "La fecha de publicación es obligatoria.";
  } else if (publicationDate.value <= localCalendarDateKey(new Date())) {
    dateMessage = "La fecha de publicación debe ser posterior a hoy.";
  }
  checks.push(
    setFieldResult("not-fecha", "err-not-fecha", dateMessage)
  );
  checks.push(
    setFieldResult(
      "not-imagen",
      "err-not-imagen",
      fileMessage(image, "La imagen de portada")
    )
  );

  return checks.every(Boolean);
}

function validateCitas() {
  const member = getElement("cita-socio");
  const service = getElement("cita-servicio");
  const dateTime = getElement("cita-fecha-hora");
  const confirmation = getElement("cita-confirmacion");

  return [
    setFieldResult(
      "cita-socio",
      "err-cita-socio",
      member.value ? "" : "Selecciona un socio."
    ),
    setFieldResult(
      "cita-servicio",
      "err-cita-servicio",
      service.value ? "" : "Selecciona un servicio."
    ),
    setFieldResult(
      "cita-fecha-hora",
      "err-cita-fecha-hora",
      dateTime.value ? "" : "La fecha y hora de la cita son obligatorias."
    ),
    setFieldResult(
      "cita-confirmacion",
      "err-cita-confirmacion",
      confirmation.checked ? "" : "Confirma que has revisado los datos."
    )
  ].every(Boolean);
}

const formConfigurations = [
  {
    id: "form-socios",
    validate: validateSocios,
    summaryId: "resumen-socios",
    successMessage: "Socio validado correctamente. Operación simulada."
  },
  {
    id: "form-servicios",
    validate: validateServicios,
    summaryId: "resumen-servicios",
    successMessage: "Servicio validado correctamente. Operación simulada."
  },
  {
    id: "form-testimonios",
    validate: validateTestimonios,
    summaryId: "resumen-testimonios",
    successMessage() {
      return getElement("test-publicacion").checked
        ? "Testimonio validado y autorizado para su publicación. Operación simulada."
        : "Testimonio validado. Al no autorizar la publicación, queda privado.";
    }
  },
  {
    id: "form-noticias",
    validate: validateNoticias,
    summaryId: "resumen-noticias",
    successMessage: "Noticia validada correctamente. Operación simulada."
  },
  {
    id: "form-citas",
    validate: validateCitas,
    summaryId: "resumen-citas",
    successMessage: "Cita validada correctamente. Operación simulada."
  }
];

formConfigurations.forEach((configuration) => {
  const form = getElement(configuration.id);
  const summary = getElement(configuration.summaryId);
  let submissionAttempted = false;

  function clearSummary() {
    summary.textContent = "";
    summary.classList.remove("activo");
  }

  function revalidateAfterAttempt() {
    if (!submissionAttempted) {
      return;
    }
    configuration.validate();
    clearSummary();
  }

  form.addEventListener("input", revalidateAfterAttempt);
  form.addEventListener("change", revalidateAfterAttempt);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submissionAttempted = true;
    clearSummary();

    if (!configuration.validate()) {
      const firstInvalidField = form.querySelector('[aria-invalid="true"]');
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
      return;
    }

    summary.textContent =
      typeof configuration.successMessage === "function"
        ? configuration.successMessage()
        : configuration.successMessage;
    summary.classList.add("activo");
  });
});

const testimonialText = getElement("test-texto");
testimonialText.addEventListener("input", updateTestimonialCounter);
updateTestimonialCounter();
