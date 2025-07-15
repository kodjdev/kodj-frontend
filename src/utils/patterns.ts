export const FREE_EMAIL_DOMAINS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];

export const EMAIL_REGEXES = {
    standard: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    business: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    strict: /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/,
};

export const PHONE_PATTERNS = {
    kr: { regex: /^010\d{8}$/, length: 11, prefix: '010' },
    uz: { regex: /^[2-9]\d{9}$/, length: 10, prefix: null },
};

export const PASSWORD_RULES = {
    uppercase: { regex: /[A-Z]/, message: 'Password must contain uppercase letter' },
    lowercase: { regex: /[a-z]/, message: 'Password must contain lowercase letter' },
    numbers: { regex: /\d/, message: 'Password must contain number' },
    specialChars: { regex: /[!@#$%^&*(),.?":{}|<>]/, message: 'Password must contain special character' },
};
