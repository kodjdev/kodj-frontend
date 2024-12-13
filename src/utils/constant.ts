export class AppRoutes {
  static LOGIN = "/login";
  static REGISTER = "/REGISTER";
  static HOME = "/";
  static _401 = "/401";
  static _404 = "*";
}

// 20 minute millisekundda
export const SESSION_TIMEOUT_MS = 20 * 60 * 1000;
// 1 yarim minutda auto-clear qilamiz
export const INACTIVE_TIMEOUT_MS = 90 * 1000;
export const CHECK_INTERVAL_MS = 60 * 1000;
