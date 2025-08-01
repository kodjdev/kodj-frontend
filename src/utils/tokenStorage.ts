const TOKEN_PREFIX = 'kodj_';

export const TokenStorage = {
    setAccessToken: (token: string) => {
        localStorage.setItem(`${TOKEN_PREFIX}accessToken`, token);
    },

    getAccessToken: (): string | null => {
        return localStorage.getItem(`${TOKEN_PREFIX}accessToken`);
    },

    setRefreshToken: (token: string) => {
        localStorage.setItem(`${TOKEN_PREFIX}refreshToken`, token);
    },

    getRefreshToken: (): string | null => {
        return localStorage.getItem(`${TOKEN_PREFIX}refreshToken`);
    },

    clearTokens: () => {
        localStorage.removeItem(`${TOKEN_PREFIX}accessToken`);
        localStorage.removeItem(`${TOKEN_PREFIX}refreshToken`);
    },

    getAllAppTokens: () => {
        const tokens: Record<string, string | null> = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith(TOKEN_PREFIX)) {
                tokens[key] = localStorage.getItem(key);
            }
        }
        return tokens;
    },
};
