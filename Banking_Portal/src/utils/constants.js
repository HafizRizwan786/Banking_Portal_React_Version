// Storage Keys - centralized to avoid magic strings
export const STORAGE_KEYS = {
  USERS: 'users',
  LOGGED_IN_USER: 'isLoginUser',
  TRANSACTIONS: 'transactions',
};

// Feature data for landing page (removes hardcoding from components)
export const FEATURES = [
  {
    title: 'Secure Banking',
    description: 'Bank-grade encryption and multi-factor verification protect your funds and data from unauthorized access.',
  },
  {
    title: 'Fast Transactions',
    description: 'Move money instantly and complete repeat payments with seamless, one-click processing tools.',
  },
  {
    title: 'Account Balance',
    description: 'View your exact, up-to-the-minute available funds and pending transactions in real time.',
  },
  {
    title: 'Transaction History',
    description: 'Track, filter, and export your complete digital ledger of past spending instantly.',
  },
];

// Loan data for dashboard
export const LOAN_DATA = [
  { icon: 'fa-hand-holding-dollar', title: 'Total Loan', amount: '27,400,000', description: 'Overall Remaining Loan' },
  { icon: 'fa-house', title: 'Home Loan', amount: '22,800,000', description: 'Remaining Amount' },
  { icon: 'fa-plane', title: 'Trip Loan', amount: '17,000', description: 'Remaining Amount' },
  { icon: 'fa-car-side', title: 'Car Loan', amount: '55,000', description: 'Remaining Amount' },
];

// Navigation links
export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#feature' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const DASHBOARD_NAV_LINKS = [
  { icon: 'fa-wallet', label: 'My Loans', href: '#loan' },
  { icon: 'fa-clock-rotate-left', label: 'Transaction History', href: '#history' },
];

// Password config
export const PASSWORD_MIN_LENGTH = 8;
