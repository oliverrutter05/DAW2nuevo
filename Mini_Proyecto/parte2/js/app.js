import {
  extractDigitSequences,
  normalizeSpaces,
  splitNewsTags,
  validateAppointmentForm,
  validateMemberForm,
  validateNewsForm,
  validateServiceForm,
  validateTestimonialForm
} from "./function.js";

function getElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`No se encontró el elemento con id "${id}".`);
  }
  return element;
}

function setFieldResult(fields, errorId, message) {
  const errorElement = getElement(errorId);
  const invalid = message.length > 0;

  fields.forEach((field) => {
    field.setCustomValidity(message);
    field.setAttribute("aria-invalid", String(invalid));
    field.classList.toggle("invalid", invalid);
    field.classList.toggle("valid", !invalid);
  });
  errorElement.textContent = message;
  return !invalid;
}

function applyValidationResults(form, results) {
  const checks = results.map((result) => {
    const fields = result.fieldIds.map((id) => getElement(id));
    return setFieldResult(fields, result.errorId, result.message);
  });
  return checks.every(Boolean);
}

function validateSocios() {
  const email = getElement("socio-correo");
  const age = getElement("socio-edad");
  const name = getElement("socio-nombre");
  const photo = getElement("socio-foto");

  return applyValidationResults(
    getElement("form-socios"),
    validateMemberForm({
      name: name.value,
      username: getElement("socio-usuario").value,
      email: email.value,
      emailTypeMismatch: email.validity.typeMismatch,
      age: age.value,
      ageNumber: age.valueAsNumber,
      phone: getElement("socio-telefono").value,
      password: getElement("socio-pass").value,
      passwordConfirmation: getElement("socio-pass-confirm").value,
      photo: photo.files[0] || null,
      modality:
        getElement("mod-mensual").checked || getElement("mod-anual").checked,
      conditions: getElement("socio-condiciones").checked
    })
  );
}

function validateServicios() {
  const duration = getElement("serv-duracion");
  const price = getElement("serv-precio");

  return applyValidationResults(
    getElement("form-servicios"),
    validateServiceForm({
      code: getElement("serv-codigo").value,
      name: getElement("serv-nombre").value,
      duration: duration.value,
      durationNumber: duration.valueAsNumber,
      price: price.value,
      priceNumber: price.valueAsNumber,
      priceStepMismatch: price.validity.stepMismatch,
      category: getElement("serv-categoria").value
    })
  );
}

function validateTestimonios() {
  return applyValidationResults(
    getElement("form-testimonios"),
    validateTestimonialForm({
      author: getElement("test-autor").value,
      text: getElement("test-texto").value
    })
  );
}

function localCalendarDateKey(date) {
  const year = String(date.getFullYear()).padStart(4, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function validateNoticias() {
  const image = getElement("not-imagen");

  return applyValidationResults(
    getElement("form-noticias"),
    validateNewsForm({
      title: getElement("not-titulo").value,
      content: getElement("not-contenido").value,
      date: getElement("not-fecha").value,
      today: localCalendarDateKey(new Date()),
      image: image.files[0] || null
    })
  );
}

function validateCitas() {
  const dateTime = getElement("cita-fecha-hora");

  return applyValidationResults(
    getElement("form-citas"),
    validateAppointmentForm({
      reference: getElement("cita-referencia").value,
      member: getElement("cita-socio").value,
      service: getElement("cita-servicio").value,
      dateTime: dateTime.value,
      dateTimeNumber: dateTime.valueAsNumber,
      now: Date.now(),
      confirmation: getElement("cita-confirmacion").checked
    })
  );
}

function updateTestimonialCounter() {
  const text = getElement("test-texto");
  getElement("contador-testimonio").textContent =
    `${text.value.length} / 500 caracteres`;
}

function initializeNavigation() {
  const buttons = Array.from(
    document.querySelectorAll("header nav button[aria-controls]")
  );
  const sections = Array.from(document.querySelectorAll("main > section"));

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("aria-controls");
      const targetSection = sections.find((section) => section.id === targetId);
      if (!targetSection) {
        throw new Error(`No se encontró la sección "${targetId}".`);
      }

      sections.forEach((section) => {
        section.hidden = section !== targetSection;
      });
      buttons.forEach((navigationButton) => {
        navigationButton.setAttribute(
          "aria-pressed",
          String(navigationButton === button)
        );
      });
    });
  });
}

function initializeApp() {
  const configurations = [
    {
      id: "form-socios",
      summaryId: "resumen-socios",
      validate: validateSocios,
      summarize(data) {
        return `Socio ${data.get("nombre")} (${data.get("usuario")}) registrado correctamente. Operación simulada.`;
      }
    },
    {
      id: "form-servicios",
      summaryId: "resumen-servicios",
      validate: validateServicios,
      summarize(data) {
        return `Servicio ${data.get("nombre")} (${data.get("codigo")}) guardado con duración de ${data.get("duracion")} minutos y precio de ${data.get("precio")} €. Operación simulada.`;
      }
    },
    {
      id: "form-testimonios",
      summaryId: "resumen-testimonios",
      validate: validateTestimonios,
      summarize(data) {
        return data.get("publicacion")
          ? `Testimonio de ${data.get("autor")} validado y autorizado para su publicación. Operación simulada.`
          : `Testimonio de ${data.get("autor")} validado. Al no autorizar la publicación, queda privado.`;
      }
    },
    {
      id: "form-noticias",
      summaryId: "resumen-noticias",
      validate: validateNoticias,
      summarize(data) {
        const tags = splitNewsTags(String(data.get("etiquetas") || ""));
        const tagSummary = tags.length ? tags.join(", ") : "ninguna";
        return `Noticia "${data.get("titulo")}" programada para ${data.get("fechaPublicacion")}. Etiquetas: ${tagSummary}. Operación simulada.`;
      }
    },
    {
      id: "form-citas",
      summaryId: "resumen-citas",
      validate: validateCitas,
      summarize(data) {
        return `Cita ${data.get("referencia")} reservada para ${data.get("fechaHora")}. Operación simulada.`;
      }
    }
  ];

  configurations.forEach((configuration) => {
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

      if (configuration.id === "form-socios") {
        const name = getElement("socio-nombre");
        name.value = normalizeSpaces(name.value);
      }

      if (!configuration.validate()) {
        const firstInvalidField = form.querySelector('[aria-invalid="true"]');
        if (firstInvalidField) {
          firstInvalidField.focus();
        }
        return;
      }

      const formData = new FormData(form);
      summary.textContent = configuration.summarize(formData);
      summary.classList.add("activo");
    });
  });

  const testimonialText = getElement("test-texto");
  testimonialText.addEventListener("input", updateTestimonialCounter);
  updateTestimonialCounter();

  getElement("btn-buscar-cifras").addEventListener("click", () => {
    const sequences = extractDigitSequences(testimonialText.value);
    getElement("resultado-cifras").textContent = sequences.length
      ? `Cifras encontradas: ${sequences.join(", ")}`
      : "No se encontraron cifras.";
  });
}

initializeNavigation();
initializeApp();
