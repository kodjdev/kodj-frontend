import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { EventDetails } from '@/types';
import useAuth from '@/context/useAuth';

type LoginProps = {
    toggleAuthMode: () => void;
    returnUrl?: string;
    eventDetails?: EventDetails;
};

const FormContainer = styled.div`
    width: 420px;
    max-width: 100%;
    padding: 40px;
    background-color: ${themeColors.gray_light};
    border-radius: 8px;
    box-shadow:
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        width: 100%;
        margin-top: 2rem;
        padding: 22px;
    }
`;

const EventNotification = styled.div`
    margin-bottom: 16px;
    font-size: 14px;
    color: ${themeColors.gray_text};
    text-align: center;
`;

const EventTitle = styled.span`
    color: ${themeColors.blue_text};
`;

const Heading = styled.h2`
    font-size: 1.875rem;
    font-weight: 700;
    color: ${themeColors.white};
    margin-bottom: 40px;
    text-align: left;
    margin-top: 12px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`;

const InputGroup = styled.div`
    position: relative;
`;

const PasswordVisibilityToggle = styled.div`
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: ${themeColors.gray_text};
    cursor: pointer;
    z-index: 10;
    display: flex;
    align-items: center;
`;

const ForgotPasswordLink = styled.a`
    color: ${themeColors.blue};
    font-size: 0.875rem;
    text-align: right;
    text-decoration: none;
    display: block;
    margin-top: -5px;
    margin-bottom: 0px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const Divider = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0;
    color: ${themeColors.gray_text};

    &::before,
    &::after {
        content: '';
        flex: 1;
        height: 1px;
        background-color: ${themeColors.gray_line};
    }

    span {
        padding: 0 16px;
    }
`;

const AccountPrompt = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const AccountText = styled.span`
    color: ${themeColors.gray_text};
`;

const ToggleButton = styled.button`
    background: none;
    border: none;
    color: ${themeColors.blue};
    cursor: pointer;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 14px;

    &:hover {
        background-color: rgba(5, 124, 204, 0.1);
    }
`;

const StyledButton = styled(Button)`
    font-size: 16px;
    text-transform: none;
    padding: 12px 16px;
    border-radius: 4px;
    background-color: ${themeColors.blue};
    color: ${themeColors.white};

    &:hover {
        background-color: ${themeColors.blue};
    }
`;

const GoogleLoginWrapper = styled.div`
    width: 100%;

    .google-login-button {
        width: 100% !important;
        justify-content: center !important;
    }
`;

/**
 * Login - Page component for user authentication.
 * @description This component handles user login, including email/password authentication and Google sign-in.
 * It also manages OTP verification for email login and provides a link to the password recovery page.
 * @param {Function} toggleAuthMode - Function to toggle between login and signup modes.
 * @param {string} [returnUrl] - Optional URL to redirect to after successful login.
 * @param {Object} [eventDetails] - Optional event details for redirection.
 */
export default function Login({ toggleAuthMode, returnUrl, eventDetails }: LoginProps) {
    const navigate = useNavigate();
    const { user, login, validateOTP, loginWithGoogle } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');

    const handleSuccessfulAuth = useCallback(() => {
        if (returnUrl && eventDetails) {
            localStorage.removeItem('pendingEventRegistration');
            navigate(returnUrl, { state: eventDetails });
        } else {
            navigate('/mypage');
        }
    }, [navigate, returnUrl, eventDetails]);

    useEffect(() => {
        if (user) {
            handleSuccessfulAuth();
        }
    }, [user, handleSuccessfulAuth]);

    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!otpSent) {
                await login(email, password);
                setOtpSent(true);
                messageApi.success('OTP has been sent to your email');
            } else {
                await validateOTP(email, otp);
                messageApi.success('Login successful');
            }
        } catch (error) {
            console.error('Authentication error:', error);
            if (error instanceof Error) {
                messageApi.error(error.message || 'Authentication failed');
            } else {
                messageApi.error('An unexpected error occurred');
            }
        }
    };

    const handleGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
        try {
            if (!credentialResponse.credential) {
                throw new Error('No credential received from Google');
            }

            messageApi.loading('Authenticating with Google...');
            const response = await loginWithGoogle(credentialResponse.credential);

            if (response && response.data) {
                messageApi.success('Successfully logged in with Google');

                handleSuccessfulAuth();
            } else {
                messageApi.error('Authentication failed - invalid response');
                console.error('Invalid auth response:', response);
            }
        } catch (error) {
            messageApi.error(error instanceof Error ? error.message : 'Failed to authenticate with Google');
        }
    };

    const handleGoogleLoginError = () => {
        console.error('Google login failed');
        messageApi.error('Google login failed');
    };

    const navigateToForgotPassword = () => {
        navigate('/forgot-password');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <FormContainer>
            {contextHolder}
            {returnUrl && (
                <EventNotification>
                    Login to continue registration for: <br />
                    <EventTitle>{eventDetails?.title}</EventTitle>
                </EventNotification>
            )}
            <Heading>Welcome Back</Heading>
            <Form onSubmit={handleEmailAuth}>
                <InputGroup>
                    <Input
                        icon={<HiOutlineMail size={20} />}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        required
                        fullWidth={true}
                        disabled={otpSent}
                        transparent={true}
                        hideIconOnFocus={true}
                    />
                </InputGroup>

                {!otpSent ? (
                    <InputGroup>
                        <Input
                            icon={<HiOutlineLockClosed size={20} />}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            required
                            fullWidth={true}
                            hideIconOnFocus={true}
                            transparent={true}
                        />
                        <PasswordVisibilityToggle onClick={togglePasswordVisibility}>
                            {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
                        </PasswordVisibilityToggle>
                    </InputGroup>
                ) : (
                    <InputGroup>
                        <Input
                            icon={<HiOutlineLockClosed size={20} />}
                            type="text"
                            placeholder="Enter OTP from email"
                            value={otp}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
                            required
                            fullWidth={true}
                            transparent={true}
                            hideIconOnFocus={true}
                        />
                    </InputGroup>
                )}

                {!otpSent && (
                    <ForgotPasswordLink onClick={navigateToForgotPassword}>Forgot Password</ForgotPasswordLink>
                )}

                <StyledButton color="blue" size="md" fullWidth={true} as="button">
                    {otpSent ? 'VERIFY OTP' : 'LOGIN'}
                </StyledButton>
            </Form>

            <Divider>
                <span>OR</span>
            </Divider>
            <GoogleLoginWrapper>
                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginError}
                    text="signin_with"
                    shape="rectangular"
                    theme="outline"
                />
            </GoogleLoginWrapper>

            <AccountPrompt>
                <AccountText>No account yet?</AccountText>
                <ToggleButton onClick={toggleAuthMode}>Sign up here</ToggleButton>
            </AccountPrompt>
        </FormContainer>
    );
}
