import { useState, createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const { setItem, getItem, removeItem } = useLocalStorage();
  const [user, setUser] = useState(
    getItem("currentUserEmail") ? { email: getItem("currentUserEmail") } : null,
  );

  function signUp(email, password) {
    const users = getItem("users");

    if (users.find((user) => user.email === email)) {
      return { success: false, error: "Email already exists" };
    }
    const newUser = { email, password };
    users.push(newUser);
    setItem("users", users);
    setItem("currentUserEmail", email);

    setUser({ email });

    return { success: true };
  }

  function login(email, password) {
    const users = getItem("users");
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      return { success: false, error: "Invalid email or password" };
    }
    setItem("currentUserEmail", email)
    setUser(user)

    return { success: true }
  }

  function logout() {
    removeItem("currentUserEmail");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signUp, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
