import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { message } from 'antd';
import { HiOutlinePhone, HiOutlineUser } from 'react-icons/hi';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import themeColors from '@/tools/themeColors';
import useAuth from '@/context/useAuth';
import { useStatusHandler } from '@/hooks/useStatusHandler/useStatusHandler';
import { useFieldValidation } from '@/hooks/useFormValidation/useFormValidation';
import { useTranslation } from 'react-i18next';

const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
`;

const FormContainer = styled.div`
    width: 100%;
    max-width: 420px;
    padding: 40px;
    background-color: ${themeColors.gray_light};
    border-radius: 8px;
    box-shadow:
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: ${themeColors.spacing.lg};
        width: 100%;
        max-width: 100%;
        margin: 0 ${themeColors.spacing.sm};
    }
`;

const Heading = styled.h2`
    font-size: ${themeColors.typography.headings.mobile.h4.fontSize}px;
    font-weight: ${themeColors.typography.headings.mobile.h4.fontWeight};
    color: ${themeColors.white};
    text-align: center;
    margin-top: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.headings.mobile.h4.fontSize}px;
        margin-top: 0;
    }
`;
const SubHeading = styled.p`
    color: ${themeColors.gray_text};
    text-align: center;
    margin-bottom: 30px;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.body.small.fontSize}px;
        margin-bottom: ${themeColors.spacing.md};
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const InputGroup = styled.div`
    position: relative;
`;

export default function CompleteAccount() {
    const navigate = useNavigate();
    const location = useLocation();
    const { signUpWithGoogle } = useAuth();
    const { t } = useTranslation('auth');
    const [messageApi, contextHolder] = message.useMessage();
    const { loading, handleAsyncOperation } = useStatusHandler(messageApi);

    const username = useFieldValidation('username');
    const phone = useFieldValidation('phone', { phoneFormat: 'kr' });

    const [retryCount, setRetryCount] = useState(0);
    const maxRetries = 3;

    const googleCredential = location.state?.credential;

    useEffect(() => {
        /* we check if credential exists, if not, redirect to signup page */
        if (!googleCredential) {
            messageApi.error(t('completeAccount.messages.credentialNotFound'));
            navigate('/signup');
        }
    }, [googleCredential, navigate, messageApi]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const usernameResult = username.validate(username.value);
        const phoneResult = phone.validate(phone.value);

        if (!usernameResult.isValid || !phoneResult.isValid) {
            return;
        }

        const { data, error } = await handleAsyncOperation(
            () =>
                signUpWithGoogle(googleCredential, {
                    username: username.value,
                    phone: phone.value,
                }),
            {
                loadingMessage: t('completeAccount.messages.completingRegistration'),
                successMessage: t('completeAccount.messages.registrationComplete'),
                showError: true,
            },
        );

        if (data) {
            setRetryCount(0);
            setTimeout(() => {
                navigate('/mypage');
            }, 1500);
        } else if (error) {
            const newRetryCount = retryCount + 1;
            setRetryCount(newRetryCount);

            if (newRetryCount >= maxRetries) {
                messageApi.error('Server error occurred multiple times. Redirecting to homepage...');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        }
    };

    const isFormValid = () => {
        const isUsernameValid = username.value.trim() !== '' && !username.error;
        const isPhoneValid = phone.value.trim() !== '' && !phone.error;
        return isUsernameValid && isPhoneValid;
    };

    return (
        <PageContainer>
            {contextHolder}
            <FormContainer>
                <Heading>{t('completeAccount.completeProfile')}</Heading>
                <SubHeading>{t('completeAccount.subHeading')}</SubHeading>

                <Form onSubmit={handleSubmit}>
                    <InputGroup>
                        <Input
                            icon={<HiOutlineUser size={20} />}
                            type="text"
                            placeholder={t('completeAccount.username')}
                            value={username.value}
                            onChange={username.onChange}
                            onBlur={username.onBlur}
                            error={username.error}
                            required
                            fullWidth={true}
                            hideIconOnFocus={true}
                            transparent={true}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Input
                            icon={<HiOutlinePhone size={20} />}
                            type="tel"
                            placeholder={t('completeAccount.phoneNumber')}
                            value={phone.value}
                            onChange={phone.onChange}
                            onBlur={phone.onBlur}
                            error={phone.error}
                            maxLength={11}
                            required
                            fullWidth={true}
                            hideIconOnFocus={true}
                            transparent={true}
                        />
                    </InputGroup>

                    <Button
                        color="blue"
                        size="lg"
                        fullWidth={true}
                        variant="primary"
                        disabled={loading || !isFormValid()}
                        htmlType="submit"
                        isDisabled={!isFormValid}
                        style={{
                            width: '100%',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontSize: '16px',
                        }}
                    >
                        {loading
                            ? t('completeAccount.completingRegistration')
                            : t('completeAccount.completeRegistration')}
                    </Button>
                </Form>
            </FormContainer>
        </PageContainer>
    );
}
