import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import themeColors from '@/tools/themeColors';
import Button from '@/components/Button/Button';
import { useTranslation } from 'react-i18next';

type OtpVerificationProps = {
    email: string;
    otp: string;
    onOtpChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onBackClick: () => void;
    isLoading?: boolean;
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
    width: 100%;
    max-width: 400px;
`;

const BackButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: none;
    color: ${themeColors.blue};
    cursor: pointer;
    font-size: 14px;
    padding: 0;

    &:hover {
        text-decoration: underline;
    }
`;

const EmailInfo = styled.div`
    color: ${themeColors.gray_text};
    font-size: 14px;
    text-align: left;

    strong {
        color: ${themeColors.white};
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const OtpInputContainer = styled.div`
    display: flex;
    gap: 15px;
    justify-content: center;
    margin: 10px;
`;

const DigitInput = styled.input<{ hasValue: boolean }>`
    width: 60px;
    height: 60px;
    border: 0.5px solid ${(props) => (props.hasValue ? themeColors.colors.primary.main : themeColors.colors.gray.line)};
    border-radius: 12px;
    background: ${themeColors.colors.gray.background};
    color: ${themeColors.white};
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    outline: none;
    transition: all 0.2s ease;

    &:focus {
        border-color: ${themeColors.colors.primary.main};
        box-shadow: 0 0 0 3px ${themeColors.colors.primary.main}20;
        background: ${themeColors.colors.gray.light};
    }

    &::placeholder {
        color: ${themeColors.gray_text};
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        width: 45px;
        height: 45px;
        font-size: 18px;
    }
`;

/**
 * OTP Component for email verification in the login process.
 * @param {OtpVerificationProps} props - The properties for the OTP verification component.
 * @property {string} email - The email address to which the OTP was sent.
 * @property {string} otp - The OTP value to be verified.
 * @property {function} onOtpChange - Callback function to handle OTP value changes.
 * @param {function} onSubmit - Callback function to handle form submission.
 * @property {function} onBackClick - Callback function to handle back navigation.
 * @param {boolean} [isLoading=false] - Flag to indicate if the verification is in progress.
 */
export default function OtpVerification({
    email,
    otp,
    onOtpChange,
    onSubmit,
    onBackClick,
    isLoading = false,
}: OtpVerificationProps) {
    const [digits, setDigits] = useState(['', '', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const { t } = useTranslation('auth');

    useEffect(() => {
        const otpValue = digits.join('');
        onOtpChange(otpValue);
    }, [digits, onOtpChange]);

    useEffect(() => {
        if (otp !== digits.join('')) {
            const newDigits = otp.split('').concat(['', '', '', '', '']).slice(0, 5);
            setDigits(newDigits);
        }
    }, [otp]);

    const handleDigitChange = (index: number, value: string) => {
        /* we only  allow digits */
        if (!/^\d*$/.test(value)) return;

        const newDigits = [...digits];
        newDigits[index] = value.slice(-1);
        setDigits(newDigits);

        if (value && index < 4) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !digits[index] && index > 0) {
            /* focus previous input on backspace if current is empty */
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 5);
        const newDigits = pastedData.split('').concat(['', '', '', '', '']).slice(0, 5);
        setDigits(newDigits);

        /* we then focus the next empty input or last input */
        const nextIndex = Math.min(pastedData.length, 4);
        inputRefs.current[nextIndex]?.focus();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (digits.join('').length === 5) {
            onSubmit(e);
        }
    };

    const isFormValid = digits.every((digit: string) => digit !== '');

    return (
        <Container>
            <BackButton onClick={onBackClick}>
                <HiOutlineArrowLeft size={16} />
                {t('otpVerification.backToLogin')}
            </BackButton>

            <EmailInfo>
                {t('otpVerification.otpSentTo')} <strong>{email}</strong>
            </EmailInfo>

            <Form onSubmit={handleSubmit}>
                <OtpInputContainer>
                    {digits.map((digit: string, index: number) => (
                        <DigitInput
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            hasValue={digit !== ''}
                            onChange={(e) => handleDigitChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            placeholder=""
                            aria-label={`${t('otpVerification.otpDigitLabel')} ${index + 1}`}
                        />
                    ))}
                </OtpInputContainer>

                <Button
                    color="blue"
                    size="md"
                    fullWidth={true}
                    htmlType="submit"
                    disabled={isLoading || !isFormValid}
                    isDisabled={!isFormValid}
                >
                    {isLoading ? t('otpVerification.verifying') : t('otpVerification.verifyOtp')}
                </Button>
            </Form>
        </Container>
    );
}
