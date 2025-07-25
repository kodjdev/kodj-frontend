export class AppRoutes {
    static LOGIN = '/login';
    static REGISTER = '/REGISTER';
    static HOME = '/';
    static _401 = '/401';
    static _404 = '*';
}

/* 20 minute millisekundda session timeout */
export const SESSION_TIMEOUT_MS = 20 * 60 * 1000;

/* 10 minutda auto-clear qilamiz */
export const INACTIVE_TIMEOUT_MS = 10 * 60 * 1000;
export const CHECK_INTERVAL_MS = 60 * 1000;

export const STATUS_MESSAGES = {
    200: { type: 'success' as const, message: 'Operation completed successfully' },
    400: { type: 'error' as const, message: 'Bad request. Please check your input and try again.' },
    401: { type: 'error' as const, message: 'Authentication required. Please log in again.' },
    403: { type: 'error' as const, message: "Access denied. You don't have permission for this action." },
    404: { type: 'error' as const, message: 'Resource not found. Please try again later.' },
    409: { type: 'error' as const, message: 'Email already exists. Please use a different email address.' },
    500: { type: 'error' as const, message: 'Server error. Please try again later.' },
    0: { type: 'error' as const, message: 'Network error. Please check your connection.' },
} as const;
