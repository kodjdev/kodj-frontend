import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import useAuth from '@/context/useAuth';
import themeColors from '@/tools/themeColors';
import { HiOutlinePhone, HiArrowLeft, HiX, HiCheckCircle } from 'react-icons/hi';
import { UserRelatedDataProps } from '@/pages/Auth/index';
import { EventDetails } from '@/types';

type PhoneVerificationProps = {
    signupData: UserRelatedDataProps;
    onBack: () => void;
    returnUrl?: string;
    eventDetails?: EventDetails;
};

const Container = styled.div`
    width: 350px;
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

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
`;

const BackButton = styled.button`
    background: none;
    border: none;
    color: ${themeColors.gray_text};
    cursor: pointer;
    padding: 8px;
    padding-left: 0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: ${themeColors.gray_text};
    cursor: pointer;
    padding: 8px;
    padding-right: 0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h2`
    font-size: 1.875rem;
    font-weight: 700;
    color: ${themeColors.white};
    margin-bottom: 8px;
    text-align: left;
`;

const Subtitle = styled.p`
    color: ${themeColors.gray_text};
    margin-bottom: 32px;
    text-align: left;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const VerificationSection = styled.div`
    margin-top: 24px;
`;

const CodeInputContainer = styled.div`
    display: flex;
    gap: 12px;
    justify-content: center;
    margin: 20px 0px;
    width: 100%;
`;

const CodeInput = styled.input`
    width: 53px;
    height: 53px;
    background-color: ${themeColors.white_dark};
    color: ${themeColors.gray_dark};
    border: 1px solid ${themeColors.cardBorder.color};
    border-radius: 8px;
    text-align: center;
    font-size: 18px;
    font-weight: 600;

    &:focus {
        outline: none;
        border-color: ${themeColors.blue};
        box-shadow: 0 0 0 2px rgba(5, 124, 204, 0.2);
    }
`;

const TimerText = styled.p`
    text-align: center;
    color: ${themeColors.gray_text};
    margin: 16px 0;
`;

const StyledButton = styled(Button)`
    font-size: 16px;
    text-transform: none;
    padding: 12px 16px;
    border-radius: 4px;
    background-color: ${themeColors.blue};
    color: ${themeColors.white};
    width: 100%;

    &:disabled {
        background-color: ${themeColors.colors.primary.disabled};
        color: ${themeColors.gray_text};
    }
`;

const SuccessSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 24px;
    text-align: center;
`;

const SuccessIcon = styled.div`
    color: ${themeColors.colors.status.success.background || themeColors.blue};
    margin: 24px 0;
`;

const SuccessMessage = styled.p`
    color: ${themeColors.white};
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
`;

const SuccessSubMessage = styled.p`
    color: ${themeColors.gray_text};
    font-size: 14px;
    margin-bottom: 24px;
`;

export default function PhoneVerification({ signupData, onBack }: PhoneVerificationProps) {
    const navigate = useNavigate();
    const { register } = useAuth();

    const { email, password } = signupData;

    const [messageApi, contextHolder] = message.useMessage();

    const [phone, setPhone] = useState('');
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '']);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [timer, setTimer] = useState(30);
    const [isLoading, setIsLoading] = useState(false);
    const [isAccountCreated, setIsAccountCreated] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isCodeSent && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isCodeSent, timer]);

    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone.trim()) {
            messageApi.error('Phone number is required');
            return;
        }

        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setIsCodeSent(true);
            setTimer(30);
            messageApi.success('Verification code sent to your phone');
        } catch (error) {
            console.error('Error sending verification code:', error);
            if (error instanceof Error) {
                messageApi.error(error.message || 'Failed to send verification code');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleCodeChange = (index: number, value: string) => {
        if (value.length > 1) return;

        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);

        if (value && index < 4) {
            const nextInput = document.getElementById(`code-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleVerifyCode = async () => {
        const code = verificationCode.join('');
        if (code.length !== 5) {
            messageApi.error('Please enter the complete verification code');
            return;
        }

        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setIsVerified(true);
            setIsAccountCreated(true);
            messageApi.success('Phone number verified successfully');
        } catch (error) {
            console.error('Verification error:', error);
            if (error instanceof Error) {
                messageApi.error(error.message || 'Verification failed');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleFinishSignup = async () => {
        setIsLoading(true);
        try {
            const userData = {
                email,
                password,
                username: email.split('@')[0],
                name: email.split('@')[0],
                phone: phone,
            };

            const response = await register(userData);
            if (response && response.statusCode === 200) {
                navigate('/login');
                messageApi.success('Account created successfully! Please login to continue.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            if (error instanceof Error) {
                messageApi.error(error.message || 'Registration failed');
            } else {
                messageApi.error('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <Container>
            {contextHolder}
            <Header>
                <BackButton onClick={onBack}>
                    <HiArrowLeft size={20} />
                </BackButton>
                <CloseButton onClick={() => navigate('/login')}>
                    <HiX size={20} />
                </CloseButton>
            </Header>

            {!isAccountCreated && (
                <>
                    <Title>Phone Verification</Title>
                    <Subtitle>Please enter your phone number in order to verify it's yours.</Subtitle>
                </>
            )}

            {!isCodeSent ? (
                <Form onSubmit={handleSendCode}>
                    <Input
                        icon={<HiOutlinePhone size={20} />}
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                        required
                        fullWidth={true}
                        hideIconOnFocus={true}
                        transparent={true}
                    />
                    <StyledButton
                        variant="blueText"
                        size="md"
                        fullWidth={true}
                        as="button"
                        type="submit"
                        disabled={isLoading}
                    >
                        {' '}
                        {isLoading ? 'SENDING...' : 'SEND CODE'}
                    </StyledButton>
                </Form>
            ) : isAccountCreated ? (
                <SuccessSection>
                    <SuccessIcon>
                        <HiCheckCircle size={80} />
                    </SuccessIcon>
                    <SuccessMessage>Account Created Successfully!</SuccessMessage>
                    <SuccessSubMessage>Your account has been created and verified successfully.</SuccessSubMessage>
                    <StyledButton
                        variant="blueText"
                        size="md"
                        fullWidth={true}
                        as="button"
                        onClick={handleFinishSignup}
                        disabled={isLoading}
                    >
                        {isLoading ? 'FINISHING...' : 'FINISH SIGN UP'}
                    </StyledButton>
                </SuccessSection>
            ) : (
                <VerificationSection>
                    <CodeInputContainer>
                        {verificationCode.map((digit, index) => (
                            <CodeInput
                                key={index}
                                id={`code-${index}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleCodeChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                disabled={isVerified}
                            />
                        ))}
                    </CodeInputContainer>

                    <TimerText>Send code: {formatTime(timer)}</TimerText>

                    <StyledButton
                        variant="primary"
                        size="md"
                        fullWidth={true}
                        as="button"
                        onClick={handleVerifyCode}
                        disabled={
                            isLoading ||
                            verificationCode.join('').length !== 5 ||
                            verificationCode.some((digit) => digit === '')
                        }
                    >
                        {isLoading ? 'VERIFYING...' : 'VERIFICATION'}
                    </StyledButton>
                </VerificationSection>
            )}
        </Container>
    );
}
