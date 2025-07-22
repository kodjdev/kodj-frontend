import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { HiOutlineLockClosed, HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi';
import themeColors from '@/tools/themeColors';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { useTranslation } from 'react-i18next';

export type PasswordRequirements = {
    minLength: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
};

export type PasswordSignupProps = {
    passwordField: {
        value: string;
        error: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        onBlur: () => void;
    };
    confirmPasswordField: {
        value: string;
        error: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>, matchValue?: string) => void;
        onBlur: () => void;
    };
    onSubmit: (e: React.FormEvent) => void;
    isLoading?: boolean;
    submitButtonText?: string;
    error?: string;
    showPasswordRequirements?: boolean;
    hideValidationErrors?: boolean;
};

const Container = styled.div`
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

const PasswordRequirements = styled.div`
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid ${themeColors.gray_line}40;
    border-radius: 8px;
    padding: 16px;
    margin-top: 8px;
    backdrop-filter: blur(10px);
`;

const RequirementsTitle = styled.h4`
    color: ${themeColors.white};
    font-size: 14px;
    font-weight: 600;
    margin: 0 0 12px 0;
`;

const RequirementsList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const RequirementItem = styled.li<{ met: boolean }>`
    display: flex;
    align-items: center;
    font-size: 12px;
    color: ${(props) => (props.met ? themeColors.colors.status.success.button : themeColors.gray_text)};
    transition: color ${themeColors.duration} ease;

    &::before {
        content: ${(props) => (props.met ? '"✓"' : '"○"')};
        margin-right: 8px;
        font-weight: bold;
        color: ${(props) => (props.met ? themeColors.colors.status.success.button : themeColors.gray_text)};
    }
`;

const ErrorMessage = styled.div`
    color: ${themeColors.red_text};
    font-size: 12px;
    margin-top: 4px;
    padding-left: 4px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`;

/**
 * Password Signup UI Component
 * This component provides a password input field with validation requirements,
 * a confirm password field, and a submit button.
 * It includes features like password visibility toggle, validation checks,
 * and error handling.
 * * @param {PasswordSignupProps} props - The properties for the Password component
 */
export default function PasswordConfirm({
    passwordField,
    confirmPasswordField,
    onSubmit,
    isLoading = false,
    submitButtonText = 'SIGN UP',
    error,
    showPasswordRequirements = true,
    hideValidationErrors = false,
}: PasswordSignupProps) {
    const { t } = useTranslation('auth');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordRequirements, setPasswordRequirements] = useState<PasswordRequirements>({
        minLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
    });

    const validatePassword = (pwd: string): PasswordRequirements => {
        return {
            minLength: pwd.length >= 8,
            hasUpperCase: /[A-Z]/.test(pwd),
            hasLowerCase: /[a-z]/.test(pwd),
            hasNumber: /\d/.test(pwd),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
        };
    };

    useEffect(() => {
        if (passwordField.value) {
            setPasswordRequirements(validatePassword(passwordField.value));
        } else {
            setPasswordRequirements({
                minLength: false,
                hasUpperCase: false,
                hasLowerCase: false,
                hasNumber: false,
                hasSpecialChar: false,
            });
        }
    }, [passwordField.value]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const isFormValid = () => {
        const requirements = validatePassword(passwordField.value);
        const allRequirementsMet = Object.values(requirements).every(Boolean);
        const passwordsMatch = passwordField.value === confirmPasswordField.value && confirmPasswordField.value !== '';
        const bothFieldsFilled = passwordField.value !== '' && confirmPasswordField.value !== '';

        return allRequirementsMet && passwordsMatch && bothFieldsFilled;
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        confirmPasswordField.onChange(e, passwordField.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid()) {
            onSubmit(e);
        } else {
            console.log('Form is not valid');
        }
    };
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <Input
                        icon={<HiOutlineLockClosed size={20} />}
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t('passwordConfirm.password')}
                        value={passwordField.value}
                        onChange={passwordField.onChange}
                        onBlur={passwordField.onBlur}
                        error={hideValidationErrors ? '' : passwordField.error}
                        required
                        fullWidth={true}
                        hideIconOnFocus={true}
                        transparent={true}
                    />
                    <PasswordVisibilityToggle onClick={togglePasswordVisibility}>
                        {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
                    </PasswordVisibilityToggle>
                </InputGroup>

                {passwordField.value &&
                    showPasswordRequirements &&
                    !Object.values(passwordRequirements).every(Boolean) && (
                        <PasswordRequirements>
                            <RequirementsTitle>{t('passwordConfirm.passwordRequirements')}</RequirementsTitle>
                            <RequirementsList>
                                <RequirementItem met={passwordRequirements.minLength}>
                                    {t('passwordConfirm.requirements.minLength')}
                                </RequirementItem>
                                <RequirementItem met={passwordRequirements.hasUpperCase}>
                                    {t('passwordConfirm.requirements.upperCase')}
                                </RequirementItem>
                                <RequirementItem met={passwordRequirements.hasLowerCase}>
                                    {t('passwordConfirm.requirements.lowerCase')}
                                </RequirementItem>
                                <RequirementItem met={passwordRequirements.hasNumber}>
                                    {t('passwordConfirm.requirements.number')}
                                </RequirementItem>
                                <RequirementItem met={passwordRequirements.hasSpecialChar}>
                                    {t('passwordConfirm.requirements.specialChar')}
                                </RequirementItem>
                            </RequirementsList>
                        </PasswordRequirements>
                    )}

                <InputGroup>
                    <Input
                        icon={<HiOutlineLockClosed size={20} />}
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t('passwordConfirm.confirmPassword')}
                        value={confirmPasswordField.value}
                        onChange={handleConfirmPasswordChange}
                        onBlur={confirmPasswordField.onBlur}
                        error={hideValidationErrors ? '' : confirmPasswordField.error}
                        required
                        fullWidth={true}
                        hideIconOnFocus={true}
                        transparent={true}
                    />
                </InputGroup>

                {confirmPasswordField.value && passwordField.value !== confirmPasswordField.value && (
                    <ErrorMessage>{t('passwordConfirm.passwordsDoNotMatch')}</ErrorMessage>
                )}

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <Button
                    color="blue"
                    size="md"
                    fullWidth={true}
                    htmlType="submit"
                    disabled={isLoading || !isFormValid()}
                    isDisabled={!isFormValid()}
                >
                    {isLoading ? t('passwordConfirm.creatingAccount') : submitButtonText}
                </Button>
            </Form>
        </Container>
    );
}
