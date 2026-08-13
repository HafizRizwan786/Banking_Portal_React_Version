import { STORAGE_KEYS } from './constants';

// Safe JSON parse helper — prevents crash on corrupt localStorage data
const safeJsonParse = (str, fallback = null) => {
  try {
    return str ? JSON.parse(str) : fallback;
  } catch {
    return fallback;
  }
};

// Simple client-side password hashing using SHA-256
// NOTE: In production, hashing should be done server-side with bcrypt/argon2
export const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const storeUser = async (user) => {
  try {
    const data = safeJsonParse(localStorage.getItem(STORAGE_KEYS.USERS), []);

    const userExist = data.some(usr => usr.email === user.email);
    if (userExist) {
      return { success: false, message: 'User with this email already exists' };
    }

    // Hash password before storing
    const hashedPassword = await hashPassword(user.password);
    const userToStore = { ...user, password: hashedPassword };

    data.push(userToStore);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(data));

    return { success: true, message: 'Account created successfully!' };
  } catch (error) {
    return { success: false, message: 'Failed to create account. Please try again.' };
  }
};

export const validateLogin = async (email, password) => {
  try {
    const data = safeJsonParse(localStorage.getItem(STORAGE_KEYS.USERS), []);
    const hashedPassword = await hashPassword(password);

    const user = data.find(
      (u) => u.email === email && u.password === hashedPassword
    );

    if (!user) {
      return { success: false, message: 'Invalid email or password', user: null };
    }

    return { success: true, message: 'Login successful!', user };
  } catch (error) {
    return { success: false, message: 'Login failed. Please try again.', user: null };
  }
};

export const storeTransaction = (transaction) => {
  try {
    const data = safeJsonParse(localStorage.getItem(STORAGE_KEYS.TRANSACTIONS), []);
    data.push(transaction);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
};

export const getTransactions = (userId) => {
  const data = safeJsonParse(localStorage.getItem(STORAGE_KEYS.TRANSACTIONS), []);
  return userId ? data.filter(t => t.userId === userId) : data;
};

export const updateBalance = (id, type, amount) => {
  try {
    const data = safeJsonParse(localStorage.getItem(STORAGE_KEYS.USERS), []);

    const updatedUsers = data.map(user => {
      if (user.id === id) {
        return {
          ...user,
          balance: type === 'credit' ? user.balance + amount : user.balance - amount,
          totalDeposit: type === 'credit' ? user.totalDeposit + amount : user.totalDeposit,
          totalWithDraw: type === 'debit' ? user.totalWithDraw + amount : user.totalWithDraw,
        };
      }
      return user;
    });

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));

    // Return updated user data for context sync
    return updatedUsers.find(u => u.id === id) || null;
  } catch {
    return null;
  }
};

export const updateUserProfileImage = (userId, newImage) => {
  try {
    const data = safeJsonParse(localStorage.getItem(STORAGE_KEYS.USERS), []);

    const updatedUsers = data.map(user => {
      if (user.id === userId) {
        return { ...user, profileImage: newImage };
      }
      return user;
    });

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));
    return updatedUsers.find(u => u.id === userId) || null;
  } catch {
    return null;
  }
};