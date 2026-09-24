import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../services/firebase";

// Contexto de autenticación
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true mientras se valida la sesión inicial

  // Sincroniza el estado con Firebase Auth (persiste sesión al recargar)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // limpieza del listener al desmontar
  }, []);

  // Registro de nuevo usuario
  const register = async (email, password) => {
    const credentials = await createUserWithEmailAndPassword(auth, email, password);
    return credentials.user;
  };

  // Inicio de sesión
  const login = async (email, password) => {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return credentials.user;
  };

  // Cierre de sesión
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para consumir el contexto fácilmente
export const useAuth = () => useContext(AuthContext);
