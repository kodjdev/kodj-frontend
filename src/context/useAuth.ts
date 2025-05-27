import { useContext } from 'react';
import { AuthContext } from './authProvider';

/**
 * Custom Hook to access the authentication context
 * @returns {AuthContextType} The authentication context
 * @throws {Error} If used outside of an AuthProvider
 * @description This hook provides access to the authentication
 * context, which includes user information and authentication methods.
 */
export default function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
