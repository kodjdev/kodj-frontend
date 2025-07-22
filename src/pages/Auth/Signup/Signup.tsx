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
import { useStatusHandler } from '@/hooks/useStatusHandler/useStatusHandler';
import { useTranslation } from 'react-i18next';
import PasswordConfirm from '@/pages/Auth/Signup/PasswordConfirm';

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
    const { t } = useTranslation('auth');
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
            setAuthError(t('signup.messages.checkInformationAndTryAgain'));
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
            loadingMessage: t('signup.messages.creatingAccount'),
            successMessage: t('signup.messages.accountCreatedSuccess'),
            showError: false,
            onError: (apiError) => {
                if (apiError.statusCode === 400) {
                    setAuthError(t('signup.messages.invalidInformation'));
                } else if (apiError.statusCode === 409) {
                    setAuthError(t('signup.messages.emailAlreadyExists'));
                } else if (apiError.statusCode === 500) {
                    setAuthError(t('signup.messages.serverError'));
                } else {
                    setAuthError(t('signup.messages.registrationFailed'));
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
                    {t('signup.signupToContinueRegistration')} <br />
                    <EventTitle>{eventDetails?.title}</EventTitle>
                </EventNotification>
            )}
            <Heading>{t('signup.createAccount')}</Heading>

            {currentStep === 'info' && (
                <>
                    <Form onSubmit={handleContinue}>
                        <InputGroup>
                            <Input
                                icon={<HiOutlineMail size={20} />}
                                type="email"
                                placeholder={t('signup.email')}
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
                                placeholder={t('signup.phoneNumber')}
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
                            {t('signup.continue')}
                        </StyledButton>
                    </Form>

                    <Divider>
                        <span>{t('signup.or')}</span>
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
                        <AccountText>{t('signup.alreadyHaveAccount')}</AccountText>
                        <ToggleButton onClick={toggleAuthMode}>{t('signup.login')}</ToggleButton>
                    </AccountPrompt>
                </>
            )}

            {currentStep === 'password' && (
                <>
                    <div style={{ marginBottom: '16px', color: themeColors.gray_text, fontSize: '14px' }}>
                        {t('signup.emailLabel')} <strong style={{ color: themeColors.white }}>{email.value}</strong>
                    </div>

                    <PasswordConfirm
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
                        submitButtonText={t('signup.signUp')}
                        error={authError}
                        showPasswordRequirements={true}
                        hideValidationErrors={true}
                    />
                </>
            )}
        </FormContainer>
    );
}
