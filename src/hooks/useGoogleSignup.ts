import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { CredentialResponse } from '@react-oauth/google';

/**
 * Custom Hook to manage Google signup flow
 * Handles the first step of Google authentication
 * and navigation to complete account registration
 */
export default function useGoogleSignupFlow() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const handleGoogleSignupSuccess = (credentialResponse: CredentialResponse) => {
        if (!credentialResponse.credential) {
            messageApi.error('No credential received from Google');
            return;
        }

        setIsLoading(true);

        try {
            navigate('/completeAccount', {
                state: {
                    credential: credentialResponse.credential,
                },
            });
        } catch (error) {
            console.error('Google signup error:', error);
            messageApi.error('Failed to process Google sign up');
            setIsLoading(false);
        }
    };

    const handleGoogleSignupError = () => {
        console.error('Google signup failed');
        messageApi.error('Google signup failed. Please try again.');
    };

    return {
        contextHolder,
        isLoading,
        handleGoogleSignupSuccess,
        handleGoogleSignupError,
    };
}
