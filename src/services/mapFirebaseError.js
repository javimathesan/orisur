// src/services/mapFirebaseError.js
// Traduce códigos de error de Firebase Auth a mensajes legibles para el usuario
export function mapFirebaseError(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "Ese correo ya está registrado. Probá iniciar sesión.";
    case "auth/invalid-email":
      return "El correo ingresado no es válido.";
    case "auth/weak-password":
      return "La contraseña debe tener al menos 6 caracteres.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Correo o contraseña incorrectos.";
    case "auth/too-many-requests":
      return "Demasiados intentos. Esperá unos minutos y volvé a intentar.";
    default:
      return "Ocurrió un error inesperado. Intentá nuevamente.";
  }
}
