import { PASSWORD_MIN_LENGTH } from './constants';

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !email.trim()) {
    return { valid: false, message: 'Email is required' };
  }
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'Please enter a valid email address' };
  }
  return { valid: true, message: '' };
};

export const validatePassword = (password) => {
  if (!password) {
    return { valid: false, message: 'Password is required' };
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    return { valid: false, message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters` };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  return { valid: true, message: '' };
};

export const validateName = (name) => {
  if (!name || !name.trim()) {
    return { valid: false, message: 'Name is required' };
  }
  if (name.trim().length < 2) {
    return { valid: false, message: 'Name must be at least 2 characters' };
  }
  return { valid: true, message: '' };
};

export const validateAmount = (amount) => {
  const numAmount = Number(amount);
  if (!amount || isNaN(numAmount)) {
    return { valid: false, message: 'Please enter a valid amount' };
  }
  if (numAmount <= 0) {
    return { valid: false, message: 'Amount must be greater than 0' };
  }
  return { valid: true, message: '' };
};


export const validateBank = (bank)=>{
  if(!bank || bank==='no'){
    return {valid: false, message: 'Please select a bank'}
  }
  return {valid: true, message: ''}
}