import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Signup from '@/pages/Auth/Signup/Signup';
import Login from '@/pages/Auth/Login/Login';
import { UserData } from '@/types/user';
import { useTranslation } from 'react-i18next';
import themeColors from '@/tools/themeColors';

const AuthWrapper = styled.div`
    width: 100vw;
    height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
    background-color: ${themeColors.colors.neutral.black};
    overflow: hidden;
    position: fixed;
    top: 80px;
    left: 0;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        height: calc(100vh - 70px);
        top: 70px;
        overflow: hidden;
    }
`;

const ContentContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: 12px;
        justify-content: center;
        height: 100%;
    }
`;

const SuccessMessage = styled.div`
    color: green;
    font-size: 16px;
    margin-bottom: 16px;
    text-align: center;
    font-weight: bold;
    width: 100%;
    max-width: 400px;
    background-color: #e6ffed;
    padding: 12px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid #b2f2bb;
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: #d4f7e0;
    }
`;

/**
 * LoginRoot - Page Component that handles the login and signup process
 * @description This component manages the authentication process, allowing users to either log in or sign up.
 * It uses React Router for navigation and state management to determine the current authentication mode.
 */
export default function LoginRoot() {
    const location = useLocation();
    const { t } = useTranslation('auth');
    const [isSignUp, setIsSignUp] = useState(false);
    const [signupData, setSignupData] = useState<UserData | null>(null);

    const returnUrl = location.state?.returnUrl;
    const eventDetails =
        location.state?.eventDetails ||
        (localStorage.getItem('pendingEventRegistration')
            ? JSON.parse(localStorage.getItem('pendingEventRegistration')!)
            : null);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const authMode = searchParams.get('mode');
        if (authMode === 'signup') {
            setIsSignUp(true);
        } else {
            setIsSignUp(false);
        }
    }, [location.search]);

    useEffect(() => {
        document.body.classList.add('auth-page');

        return () => {
            document.body.classList.remove('auth-page');
        };
    }, []);

    const toggleAuthMode = () => {
        setIsSignUp(!isSignUp);
    };

    const handleSignupSuccess = (userData: UserData) => {
        setSignupData(userData);
    };

    return (
        <AuthWrapper>
            <ContentContainer>
                {signupData && <SuccessMessage>{t('loginRoot.accountCreatedSuccess')}</SuccessMessage>}

                {isSignUp && !signupData ? (
                    <Signup
                        toggleAuthMode={toggleAuthMode}
                        onSignupSuccess={handleSignupSuccess}
                        returnUrl={returnUrl}
                        eventDetails={eventDetails}
                    />
                ) : (
                    <Login toggleAuthMode={toggleAuthMode} returnUrl={returnUrl} eventDetails={eventDetails} />
                )}
            </ContentContainer>
        </AuthWrapper>
    );
}
