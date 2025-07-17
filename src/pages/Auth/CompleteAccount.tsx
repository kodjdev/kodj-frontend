import React, { useEffect } from 'react';
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
`;

const Heading = styled.h2`
    font-size: 1.875rem;
    font-weight: 700;
    color: ${themeColors.white};
    text-align: center;
    margin-top: 10px;
`;

const SubHeading = styled.p`
    color: ${themeColors.gray_text};
    text-align: center;
    margin-bottom: 30px;
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
    const [messageApi, contextHolder] = message.useMessage();
    const { loading, handleAsyncOperation } = useStatusHandler(messageApi);

    const username = useFieldValidation('username');
    const phone = useFieldValidation('phone', { phoneFormat: 'kr' });

    // we get the google credential from location state
    const googleCredential = location.state?.credential;

    useEffect(() => {
        // we check if credential exists, if not, redirect to signup
        if (!googleCredential) {
            messageApi.error('Google credential not found. Please try signing up again.');
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

        const { data } = await handleAsyncOperation(
            () =>
                signUpWithGoogle(googleCredential, {
                    username: username.value,
                    phone: phone.value,
                }),
            {
                loadingMessage: 'Completing registration...',
                successMessage: 'Registration complete!',
                showError: false,
                onError: (apiError) => {
                    if (apiError.statusCode === 400) {
                        messageApi.error('Invalid information. Please check your details.');
                    } else if (apiError.statusCode === 409) {
                        messageApi.error('Username or phone already exists.');
                    } else {
                        messageApi.error('Registration failed. Please try again.');
                    }
                },
            },
        );

        if (data) {
            setTimeout(() => {
                navigate('/mypage');
            }, 1500);
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
                <Heading>Complete Your Profile</Heading>
                <SubHeading>Just a few more details to complete your registration with Google</SubHeading>

                <Form onSubmit={handleSubmit}>
                    <InputGroup>
                        <Input
                            icon={<HiOutlineUser size={20} />}
                            type="text"
                            placeholder="Username (letters only)"
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
                            placeholder="Phone Number: 010XXXXXXXX"
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
                    >
                        {loading ? 'Completing Registration...' : 'Complete Registration'}
                    </Button>
                </Form>
            </FormContainer>
        </PageContainer>
    );
}
