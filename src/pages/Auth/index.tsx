import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Signup from '@/pages/Auth/Signup/Signup';
import Login from '@/pages/Auth/Login/Login';

const AuthWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    background-position: center;
    display: flex;
    flex-direction: column;
`;

const ContentContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: -100px;
    padding: 16px;
`;

/**
 * LoginRoot - Page Component that handles the login and signup process
 * @description This component manages the authentication process, allowing users to either log in or sign up.
 * It uses React Router for navigation and state management to determine the current authentication mode.
 */
export default function LoginRoot() {
    const location = useLocation();
    const [isSignUp, setIsSignUp] = useState(false);

    const returnUrl = location.state?.returnUrl;
    const eventDetails = location.state?.eventDetails;

    // we check the URL parameters on mount to determine if we should show login or signup
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const authMode = searchParams.get('mode');
        if (authMode === 'signup') {
            setIsSignUp(true);
        } else {
            setIsSignUp(false);
        }
    }, [location.search]);

    const toggleAuthMode = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <AuthWrapper>
            <ContentContainer>
                {isSignUp ? (
                    <Signup toggleAuthMode={toggleAuthMode} returnUrl={returnUrl} eventDetails={eventDetails} />
                ) : (
                    <Login toggleAuthMode={toggleAuthMode} returnUrl={returnUrl} eventDetails={eventDetails} />
                )}
            </ContentContainer>
        </AuthWrapper>
    );
}
