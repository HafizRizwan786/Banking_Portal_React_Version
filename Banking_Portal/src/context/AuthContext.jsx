import { createContext, useContext, useState, useCallback } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import { hashPassword } from '../utils/storage';

const AuthContext = createContext(null);

// Safe JSON parse to prevent crashes on corrupt localStorage data
const getStoredUser = () => {
  try {
    const user = localStorage.getItem(STORAGE_KEYS.LOGGED_IN_USER);
    return user ? JSON.parse(user) : null;
  } catch {
    localStorage.removeItem(STORAGE_KEYS.LOGGED_IN_USER);
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);

  const login = useCallback((userData) => {
    localStorage.setItem(STORAGE_KEYS.LOGGED_IN_USER, JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.LOGGED_IN_USER);
    setUser(null);
  }, []);


  const updateUser = useCallback(async (updatedData, passwordChanged = false) => {
    const users = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.USERS)
    ) || [];

    let finalUser = { ...updatedData };

    // Sirf tab hash karo jab NEW password diya gaya ho
    if (passwordChanged) {
        finalUser.password = await hashPassword(updatedData.password);
    }

    const updatedUsers = users.map((usr) => {
        if (usr.id === finalUser.id) {
            return finalUser;
        }

        return usr;
    });

    localStorage.setItem(
        STORAGE_KEYS.USERS,
        JSON.stringify(updatedUsers)
    );

    localStorage.setItem(
        STORAGE_KEYS.LOGGED_IN_USER,
        JSON.stringify(finalUser)
    );

    setUser(finalUser);

    return true;
  }, []);

  
  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
