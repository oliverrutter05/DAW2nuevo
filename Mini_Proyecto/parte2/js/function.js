function matchesEntireValue(value, expression) {
  const match = expression.exec(value);
  return match !== null && match[0] === value;
}

function fieldError(fieldIds, errorId, message) {
  return {
    fieldIds: Array.isArray(fieldIds) ? fieldIds : [fieldIds],
    errorId,
    message
  };
}

function textLengthMessage(value, label, minimum, maximum) {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return `${label} es obligatorio.`;
  }
  if (trimmedValue.length < minimum) {
    return `${label} debe tener al menos ${minimum} caracteres.`;
  }
  if (trimmedValue.length > maximum) {
    return `${label} no puede superar los ${maximum} caracteres.`;
  }
  return "";
}

function fileMessage(file, label) {
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

export function normalizeSpaces(value) {
  return value
    .replace(/^\s+|\s+$/g, "")
    .replace(/ {2,}/g, " ");
}

export function isValidMemberName(value) {
  const normalized = normalizeSpaces(value);
  return (
    normalized.length >= 4 &&
    normalized.length <= 50 &&
    matchesEntireValue(
      normalized,
      /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?: [A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/
    )
  );
}

export function isValidMemberUsername(value) {
  return (
    value.length >= 5 &&
    value.length <= 20 &&
    matchesEntireValue(value, /^[A-Za-z][A-Za-z0-9]{4,19}$/)
  );
}

export function isValidMemberPassword(value) {
  return (
    value.length >= 8 &&
    value.length <= 16 &&
    matchesEntireValue(value, /^[A-Za-z][A-Za-z0-9_]{7,15}$/)
  );
}

export function isValidPhone(value) {
  return matchesEntireValue(value, /^\+34 [6789][0-9]{2} [0-9]{3} [0-9]{3}$/);
}

export function isValidServiceCode(value) {
  return matchesEntireValue(value, /^DEP-[0-9]{3}$/);
}

export function isValidAppointmentReference(value) {
  return matchesEntireValue(value, /^(?:CITA|RES)-[0-9]{4}$/);
}

export function extractDigitSequences(value) {
  return value.match(/[0-9]+/g) || [];
}

export function splitNewsTags(value) {
  return value
    .split(/\s*,\s*/)
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
}

export function validateMemberForm(data) {
  const name = normalizeSpaces(data.name);
  let nameMessage = "";
  if (!name) {
    nameMessage = "El nombre completo es obligatorio.";
  } else if (!isValidMemberName(name)) {
    nameMessage =
      "El nombre debe tener entre 4 y 50 caracteres y contener solo letras y palabras separadas por un espacio.";
  }

  let usernameMessage = "";
  if (!data.username) {
    usernameMessage = "El usuario es obligatorio.";
  } else if (!isValidMemberUsername(data.username)) {
    usernameMessage =
      "El usuario debe tener entre 5 y 20 caracteres, empezar por una letra ASCII y contener solo letras ASCII o cifras.";
  }

  let emailMessage = "";
  if (!data.email.trim()) {
    emailMessage = "El correo electrónico es obligatorio.";
  } else if (data.emailTypeMismatch) {
    emailMessage = "Introduce un correo electrónico válido.";
  }

  let ageMessage = "";
  if (data.age === "") {
    ageMessage = "La edad es obligatoria.";
  } else if (!Number.isFinite(data.ageNumber)) {
    ageMessage = "Introduce una edad válida.";
  } else if (!Number.isInteger(data.ageNumber)) {
    ageMessage = "La edad debe ser un número entero.";
  } else if (data.ageNumber < 18 || data.ageNumber > 100) {
    ageMessage = "La edad debe estar entre 18 y 100 años.";
  }

  let phoneMessage = "";
  if (!data.phone) {
    phoneMessage = "El número de teléfono es obligatorio.";
  } else if (!isValidPhone(data.phone)) {
    phoneMessage =
      "El teléfono debe tener el formato +34 612 345 678 y empezar por 6, 7, 8 o 9.";
  }

  let passwordMessage = "";
  if (!data.password) {
    passwordMessage = "La contraseña es obligatoria.";
  } else if (!isValidMemberPassword(data.password)) {
    passwordMessage =
      "La contraseña debe tener entre 8 y 16 caracteres, empezar por una letra ASCII y contener solo letras ASCII, cifras o guion bajo.";
  }

  let confirmationMessage = "";
  if (!data.passwordConfirmation) {
    confirmationMessage = "Confirma la contraseña.";
  } else if (data.passwordConfirmation !== data.password) {
    confirmationMessage = "Las contraseñas no coinciden.";
  }

  return [
    fieldError("socio-nombre", "err-socio-nombre", nameMessage),
    fieldError("socio-usuario", "err-socio-usuario", usernameMessage),
    fieldError("socio-correo", "err-socio-correo", emailMessage),
    fieldError("socio-edad", "err-socio-edad", ageMessage),
    fieldError("socio-telefono", "err-socio-telefono", phoneMessage),
    fieldError("socio-pass", "err-socio-pass", passwordMessage),
    fieldError(
      "socio-pass-confirm",
      "err-socio-pass-confirm",
      confirmationMessage
    ),
    fieldError(
      "socio-foto",
      "err-socio-foto",
      fileMessage(data.photo, "La foto de perfil")
    ),
    fieldError(
      ["mod-mensual", "mod-anual"],
      "err-socio-modalidad",
      data.modality ? "" : "Selecciona una modalidad de suscripción."
    ),
    fieldError(
      "socio-condiciones",
      "err-socio-condiciones",
      data.conditions ? "" : "Debes aceptar las condiciones del club."
    )
  ];
}

export function validateServiceForm(data) {
  let codeMessage = "";
  if (!data.code) {
    codeMessage = "El código de servicio es obligatorio.";
  } else if (!isValidServiceCode(data.code)) {
    codeMessage = "El código debe tener el formato DEP- seguido de tres cifras.";
  }

  let durationMessage = "";
  if (data.duration === "") {
    durationMessage = "La duración es obligatoria.";
  } else if (!Number.isFinite(data.durationNumber)) {
    durationMessage = "Introduce una duración numérica válida.";
  } else if (!Number.isInteger(data.durationNumber)) {
    durationMessage = "La duración debe ser un número entero de minutos.";
  } else if (data.durationNumber < 15) {
    durationMessage = "La duración mínima es de 15 minutos.";
  } else if (data.durationNumber % 15 !== 0) {
    durationMessage = "La duración debe ser múltiplo de 15 minutos.";
  }

  let priceMessage = "";
  if (data.price === "") {
    priceMessage = "El precio es obligatorio.";
  } else if (!Number.isFinite(data.priceNumber)) {
    priceMessage = "Introduce un precio numérico válido.";
  } else if (data.priceNumber < 0 || data.priceNumber > 9999.99) {
    priceMessage = "El precio debe estar entre 0 y 9.999,99 €.";
  } else if (data.priceStepMismatch) {
    priceMessage = "El precio debe tener como máximo dos decimales.";
  }

  return [
    fieldError("serv-codigo", "err-serv-codigo", codeMessage),
    fieldError(
      "serv-nombre",
      "err-serv-nombre",
      textLengthMessage(data.name, "El nombre del servicio", 3, 50)
    ),
    fieldError("serv-duracion", "err-serv-duracion", durationMessage),
    fieldError("serv-precio", "err-serv-precio", priceMessage),
    fieldError(
      "serv-categoria",
      "err-serv-categoria",
      data.category ? "" : "Selecciona una categoría."
    )
  ];
}

export function validateTestimonialForm(data) {
  return [
    fieldError(
      "test-autor",
      "err-test-autor",
      textLengthMessage(data.author, "El autor", 2, 50)
    ),
    fieldError(
      "test-texto",
      "err-test-texto",
      textLengthMessage(data.text, "El testimonio", 10, 500)
    )
  ];
}

export function validateNewsForm(data) {
  let dateMessage = "";
  if (!data.date) {
    dateMessage = "La fecha de publicación es obligatoria.";
  } else if (data.date <= data.today) {
    dateMessage = "La fecha de publicación debe ser posterior a hoy.";
  }

  return [
    fieldError(
      "not-titulo",
      "err-not-titulo",
      textLengthMessage(data.title, "El título", 3, 100)
    ),
    fieldError(
      "not-contenido",
      "err-not-contenido",
      textLengthMessage(data.content, "El contenido", 20, 2000)
    ),
    fieldError("not-fecha", "err-not-fecha", dateMessage),
    fieldError(
      "not-imagen",
      "err-not-imagen",
      fileMessage(data.image, "La imagen de portada")
    )
  ];
}

export function validateAppointmentForm(data) {
  let referenceMessage = "";
  if (!data.reference) {
    referenceMessage = "La referencia de cita es obligatoria.";
  } else if (!isValidAppointmentReference(data.reference)) {
    referenceMessage =
      "La referencia debe tener el formato CITA-0001 o RES-0001.";
  }

  let dateTimeMessage = "";
  if (!data.dateTime) {
    dateTimeMessage = "La fecha y hora de la cita son obligatorias.";
  } else if (
    !Number.isFinite(data.dateTimeNumber) ||
    data.dateTimeNumber <= data.now
  ) {
    dateTimeMessage = "La fecha y hora de la cita deben ser futuras.";
  }

  return [
    fieldError("cita-referencia", "err-cita-referencia", referenceMessage),
    fieldError(
      "cita-socio",
      "err-cita-socio",
      data.member ? "" : "Selecciona un socio."
    ),
    fieldError(
      "cita-servicio",
      "err-cita-servicio",
      data.service ? "" : "Selecciona un servicio."
    ),
    fieldError(
      "cita-fecha-hora",
      "err-cita-fecha-hora",
      dateTimeMessage
    ),
    fieldError(
      "cita-confirmacion",
      "err-cita-confirmacion",
      data.confirmation ? "" : "Confirma que has revisado los datos."
    )
  ];
}
