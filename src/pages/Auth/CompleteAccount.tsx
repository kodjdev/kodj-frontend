import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { message } from 'antd';
import { HiOutlinePhone, HiOutlineUser } from 'react-icons/hi';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import themeColors from '@/tools/themeColors';
import useAuth from '@/context/useAuth';

const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
    padding: 20px;
    background-color: ${themeColors.gray_dark};
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
    margin-bottom: 20px;
    text-align: center;
`;

const SubHeading = styled.p`
    color: ${themeColors.gray_text};
    text-align: center;
    margin-bottom: 30px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 12px; // Reduced spacing between elements
`;

const InputGroup = styled.div`
    position: relative;
`;

const StyledButton = styled(Button)`
    font-size: 16px;
    text-transform: none;
    padding: 12px 16px;
    border-radius: 4px;
    background-color: ${themeColors.blue};
    color: ${themeColors.white};
    margin-top: 20px;

    &:hover {
        background-color: ${themeColors.blue};
    }
`;

export default function CompleteAccount() {
    const navigate = useNavigate();
    const location = useLocation();
    const { signUpWithGoogle } = useAuth();
    const [messageApi, contextHolder] = message.useMessage();

    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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

        if (!phone.trim()) {
            messageApi.error('Phone number is required');
            return;
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('phone', phone);

            formData.append('credential', googleCredential);

            const response = await signUpWithGoogle(googleCredential);

            if (response && response.data) {
                messageApi.success('Registration complete!');

                setTimeout(() => {
                    navigate('/mypage');
                }, 1500);
            } else {
                messageApi.error('Failed to complete registration');
            }
        } catch (error) {
            console.error('Registration error:', error);
            messageApi.error('An error occurred during registration. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
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
                            placeholder="Username"
                            value={username}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                            required
                            fullWidth={true}
                            style={{ backgroundColor: 'transparent', border: '1px solid gray' }}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Input
                            icon={<HiOutlinePhone size={20} />}
                            type="tel"
                            placeholder="Phone Number (required)"
                            value={phone}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                            required
                            fullWidth={true}
                            style={{ backgroundColor: 'transparent', border: '1px solid gray' }}
                        />
                    </InputGroup>

                    <StyledButton
                        color="blue"
                        size="md"
                        fullWidth={true}
                        variant="primary"
                        disabled={isSubmitting}
                        as="button"
                    >
                        {isSubmitting ? 'Completing Registration...' : 'Complete Registration'}
                    </StyledButton>
                </Form>
            </FormContainer>
        </PageContainer>
    );
}
