import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { GoogleLogin } from '@react-oauth/google';
import { EventDetails } from '@/types';
import useAuth from '@/context/useAuth';
import useGoogleSignupFlow from '@/hooks/useGoogleSignup';
import { UserData } from '@/types/user';
import { PhoneCall } from 'lucide-react';
import { useFieldValidation } from '@/hooks/useFormValidation/useFormValidation';

type SignupProps = {
    toggleAuthMode: () => void;
    onSignupSuccess?: (userData: UserData) => void;
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
        margin-top: 6rem;
        margin-bottom: 3rem;
        padding: 24px;
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
    gap: 12px;
`;

const InputGroup = styled.div`
    position: relative;
    margin-bottom: 12px;
`;

const PasswordVisibilityToggle = styled.div`
    position: absolute;
    right: 16px;
    top: 40%;
    transform: translateY(-20%);
    color: ${themeColors.gray_text};
    cursor: pointer;
    z-index: 1;
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

/**
 * Signup - Page component for user registration
 * @param {Function} toggleAuthMode - Function to toggle between login and signup modes
 * @param {string} [returnUrl] - Optional URL to redirect after successful signup
 * @param {Object} [eventDetails] - Optional event details for redirection
 * @description This component handles user registration, including email and password signup,
 * Google authentication, and form validation. It uses Ant Design for UI components and styled-components for styling.
 */
export default function Signup({ toggleAuthMode, returnUrl, eventDetails }: SignupProps) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const email = useFieldValidation('email', { emailFormat: 'standard' });
    const password = useFieldValidation('password', {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
    });
    const confirmPassword = useFieldValidation('match');
    const phoneNumber = useFieldValidation('phone', { phoneFormat: 'kr' });

    const { register } = useAuth();

    const {
        contextHolder: googleContextHolder,
        handleGoogleSignupSuccess,
        handleGoogleSignupError,
    } = useGoogleSignupFlow();

    const handleFinishSignup = async () => {
        setIsLoading(true);
        try {
            if (!password.value) {
                throw new Error('Password is required');
            }
            const userData = {
                email: email.value,
                password: password.value,
                username: email.value.split('@')[0],
                name: email.value.split('@')[0],
                phone: phoneNumber.value,
            };

            const response = await register(userData);
            if (response && response.statusCode === 200) {
                messageApi.success({
                    content: 'Account creation is successful!',
                    duration: 3,
                    style: { marginTop: '5vh' },
                });
                resetForm();
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
        } catch (error) {
            resetForm();
            if (error instanceof Error && error.message) {
                messageApi.error(error.message || 'Registration failed');
            } else {
                messageApi.error('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        email.setValue('');
        password.setValue('');
        confirmPassword.setValue('');
        phoneNumber.setValue('');
    };

    const handleSuccessfulAuth = useCallback(() => {
        try {
            if (returnUrl && eventDetails) {
                navigate(returnUrl, { state: eventDetails });
            } else {
                navigate('/mypage');
            }
        } catch (error) {
            console.error('Error happened here: ', error);
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
            const passwordResult = password.validate(password.value);
            const confirmResult = confirmPassword.validate(confirmPassword.value, password.value);
            const phoneResult = phoneNumber.validate(phoneNumber.value);

            if (!passwordResult.isValid || !confirmResult.isValid || !phoneResult.isValid) {
                messageApi.error('Please fix all errors before submitting');
                return;
            }

            await handleFinishSignup();
        } catch (error) {
            console.error('Authentication error:', error);
            if (error instanceof Error) {
                messageApi.error(error.message || 'Authentication failed');
            } else {
                messageApi.error('An unexpected error occurred');
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <FormContainer>
            {contextHolder}
            {googleContextHolder}
            {returnUrl && (
                <EventNotification>
                    Sign up to continue registration for: <br />
                    <EventTitle>{eventDetails?.title}</EventTitle>
                </EventNotification>
            )}
            <Heading>Create an Account</Heading>
            <Form onSubmit={handleEmailAuth}>
                <InputGroup>
                    <Input
                        icon={<HiOutlineMail size={20} />}
                        type="email"
                        placeholder="Email"
                        value={email.value}
                        onChange={email.onChange}
                        onBlur={email.onBlur}
                        error={email.error}
                        required
                        fullWidth={true}
                        hideIconOnFocus={true}
                        transparent={true}
                    />
                </InputGroup>
                <InputGroup>
                    <Input
                        icon={<HiOutlineLockClosed size={20} />}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password.value}
                        onBlur={password.onBlur}
                        onChange={password.onChange}
                        error={password.error}
                        required
                        fullWidth={true}
                        hideIconOnFocus={true}
                        transparent={true}
                    />
                    <PasswordVisibilityToggle onClick={togglePasswordVisibility}>
                        {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
                    </PasswordVisibilityToggle>
                </InputGroup>
                <InputGroup>
                    <Input
                        icon={<HiOutlineLockClosed size={20} />}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        value={confirmPassword.value}
                        onBlur={confirmPassword.onBlur}
                        onChange={confirmPassword.onChange}
                        error={confirmPassword.error}
                        required
                        fullWidth={true}
                        hideIconOnFocus={true}
                        transparent={true}
                    />
                </InputGroup>
                <InputGroup>
                    <Input
                        icon={<PhoneCall size={20} />}
                        type="text"
                        placeholder="Phone Number: 010XXXXXXXX"
                        value={phoneNumber.value}
                        onChange={phoneNumber.onChange}
                        onBlur={phoneNumber.onBlur}
                        error={phoneNumber.error}
                        maxLength={11}
                        required
                        fullWidth={true}
                        hideIconOnFocus={true}
                        transparent={true}
                    />
                </InputGroup>
                <StyledButton color="blue" size="md" fullWidth={true} as="button" disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'SIGN UP'}
                </StyledButton>
            </Form>

            <Divider>
                <span>OR</span>
            </Divider>

            <GoogleLogin
                onSuccess={handleGoogleSignupSuccess}
                onError={handleGoogleSignupError}
                useOneTap
                text="signup_with"
                shape="rectangular"
                width="100%"
            />

            <AccountPrompt>
                <AccountText>Already have an account?</AccountText>
                <ToggleButton onClick={toggleAuthMode}>Login</ToggleButton>
            </AccountPrompt>
        </FormContainer>
    );
}
