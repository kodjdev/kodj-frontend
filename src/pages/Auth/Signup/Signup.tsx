import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { HiOutlineMail } from 'react-icons/hi';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { GoogleLogin } from '@react-oauth/google';
import { PhoneCall } from 'lucide-react';
import { useFieldValidation } from '@/hooks/useFormValidation/useFormValidation';

import useAuth from '@/context/useAuth';
import useGoogleSignupFlow from '@/hooks/useGoogleSignup';
import { EventDetails } from '@/types';
import { UserData } from '@/types/user';
import PasswordSignupComponent from './Password';
import { useStatusHandler } from '@/hooks/useStatusHandler/useStatusHandler';

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
    margin-top: 0;
`;

const InputGroup = styled.div`
    position: relative;
`;

const StyledButton = styled(Button)`
    font-size: 16px;
    text-transform: none;
    border-radius: 4px;
    width: 100%;
    margin-top: 10px;
    background-color: ${themeColors.blue};
    color: ${themeColors.white};
    margin-bottom: 20px;

    &:hover {
        background-color: ${themeColors.blue};
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
    margin-bottom: 0;
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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`;

export default function Signup({ toggleAuthMode, returnUrl, eventDetails }: SignupProps) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [authError, setAuthError] = useState('');
    const [currentStep, setCurrentStep] = useState<'info' | 'password'>('info');
    const [messageApi, contextHolder] = message.useMessage();

    const { loading, handleAsyncOperation } = useStatusHandler(messageApi);
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

    const { handleGoogleSignupSuccess, handleGoogleSignupError } = useGoogleSignupFlow();

    const resetForm = () => {
        email.setValue('');
        password.setValue('');
        confirmPassword.setValue('');
        phoneNumber.setValue('');
        setCurrentStep('info');
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

    const handleContinue = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError('');

        try {
            const emailResult = email.validate(email.value);
            const phoneResult = phoneNumber.validate(phoneNumber.value);

            if (!emailResult.isValid || !phoneResult.isValid) {
                return;
            }

            setCurrentStep('password');
        } catch (error) {
            console.error('Validation error:', error);
            setAuthError('Please check your information and try again');
        }
    };
    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData = {
            email: email.value,
            password: password.value,
            username: email.value.split('@')[0],
            name: email.value.split('@')[0],
            phone: phoneNumber.value,
        };

        const { data } = await handleAsyncOperation(() => register(userData), {
            loadingMessage: 'Creating account...',
            successMessage: 'Account created successfully!',
            showError: false,
            onError: (apiError) => {
                if (apiError.statusCode === 400) {
                    setAuthError('Invalid information. Please check your details.');
                } else if (apiError.statusCode === 409) {
                    setAuthError('Email already exists. Please use a different email.');
                } else if (apiError.statusCode === 500) {
                    setAuthError('Server error. Please try again later.');
                } else {
                    setAuthError('Registration failed. Please try again.');
                }
            },
        });

        if (data) {
            resetForm();
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    };

    const isStep1Valid = () => {
        return email.value && phoneNumber.value && !email.error && !phoneNumber.error;
    };

    return (
        <FormContainer>
            {contextHolder}
            {returnUrl && (
                <EventNotification>
                    Sign up to continue registration for: <br />
                    <EventTitle>{eventDetails?.title}</EventTitle>
                </EventNotification>
            )}
            <Heading>Create an Account</Heading>

            {currentStep === 'info' && (
                <>
                    <Form onSubmit={handleContinue}>
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

                        {authError && (
                            <div style={{ color: themeColors.red_text, fontSize: '12px', marginBottom: '12px' }}>
                                {authError}
                            </div>
                        )}

                        <StyledButton
                            color="blue"
                            size="md"
                            fullWidth={true}
                            as="button"
                            type="submit"
                            disabled={!isStep1Valid()}
                        >
                            CONTINUE
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
                </>
            )}

            {currentStep === 'password' && (
                <>
                    <div style={{ marginBottom: '16px', color: themeColors.gray_text, fontSize: '14px' }}>
                        Email: <strong style={{ color: themeColors.white }}>{email.value}</strong>
                    </div>

                    <PasswordSignupComponent
                        passwordField={{
                            value: password.value,
                            error: password.error,
                            onChange: password.onChange,
                            onBlur: password.onBlur,
                        }}
                        confirmPasswordField={{
                            value: confirmPassword.value,
                            error: confirmPassword.error,
                            onChange: confirmPassword.onChange,
                            onBlur: confirmPassword.onBlur,
                        }}
                        onSubmit={handlePasswordSubmit}
                        isLoading={loading}
                        submitButtonText="SIGN UP"
                        error={authError}
                        showPasswordRequirements={true}
                        hideValidationErrors={true}
                    />
                </>
            )}
        </FormContainer>
    );
}
