import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { FaSave, FaEdit } from 'react-icons/fa';
import useApiService from '@/services';
import { UserDetails } from '@/types/user';

type FieldConfig = {
    id: string;
    label: string;
    value: string;
    icon: React.ReactNode;
    isPassword?: boolean;
    isEditing: boolean;
};

const Container = styled.div`
    // background-color: ${themeColors.colors.gray.background};
    border: 1px solid ${themeColors.cardBorder.color};
    border-radius: ${themeColors.cardBorder.md};
    padding: ${themeColors.spacing.lg};
    max-width: 600px;
    width: 100%;
    box-sizing: border-box;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: ${themeColors.spacing.md};
        margin: 0;
        max-width: 100%;
        border-radius: 0;
        border-left: none;
        border-right: none;
    }
`;

const Header = styled.h2`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.headings.desktop.h4.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h4.fontWeight};
    margin-top: 0;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.headings.mobile.h4.fontSize}px;
        margin-bottom: ${themeColors.spacing.lg};
    }
`;

const ProfileSection = styled.div`
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.md};
    margin-bottom: ${themeColors.spacing.xl};
    padding-bottom: ${themeColors.spacing.lg};
    border-bottom: 1px solid ${themeColors.cardBorder.color};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        flex-direction: column;
        align-items: flex-start;
        gap: ${themeColors.spacing.sm};
        margin-bottom: ${themeColors.spacing.lg};
        padding-bottom: ${themeColors.spacing.md};
    }
`;

const ProfileImage = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 1px solid ${themeColors.colors.gray.inputTag};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${themeColors.colors.gray.text};
    font-size: 32px;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        width: 60px;
        height: 60px;
        font-size: 24px;
        align-self: center;
    }
`;
const ProfileButtons = styled.div`
    display: flex;
    gap: ${themeColors.spacing.sm};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        width: 100%;
        flex-direction: column;
    }
`;

const FormContainer = styled.form`
    max-width: 600px;
`;

const FieldGroup = styled.div`
    margin-bottom: ${themeColors.spacing.lg};
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        margin-bottom: ${themeColors.spacing.md};
        align-items: center;
        min-height: 60px;
    }
`;

const FieldContent = styled.div`
    flex: 1;
`;

const FieldLabel = styled.div`
    font-size: ${themeColors.typography.body.small.fontSize}px;
    color: ${themeColors.colors.gray.text};
    margin-bottom: ${themeColors.spacing.xs};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.body.xsmall.fontSize}px;
        margin-bottom: 4px;
    }
`;

const FieldText = styled.div`
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    color: ${themeColors.colors.neutral.white};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.body.small.fontSize}px;
        word-break: break-word;
    }
`;
const EditButton = styled.button`
    background: none;
    border: none;
    color: ${themeColors.colors.gray.text};
    cursor: pointer;
    padding: 4px;

    &:hover {
        color: ${themeColors.blue};
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: ${themeColors.spacing.md};
    margin-top: ${themeColors.spacing.xl};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        flex-direction: column;
        gap: ${themeColors.spacing.sm};
        margin-top: ${themeColors.spacing.lg};
    }
`;

const INITIAL_FIELDS: FieldConfig[] = [
    {
        id: 'name',
        label: 'Name',
        value: '',
        icon: null,
        isPassword: false,
        isEditing: false,
    },
    {
        id: 'email',
        label: 'Email',
        value: '',
        icon: null,
        isPassword: false,
        isEditing: false,
    },
    {
        id: 'phone',
        label: 'Phone',
        value: '',
        icon: null,
        isPassword: false,
        isEditing: false,
    },
];

/**
 * AccountDetails Component - Sub Organism Component
 * Form for viewing and editing account information
 */
export default function AccountDetails() {
    const userDetailsService = useApiService();
    const [isLoading, setIsLoading] = useState(true);

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const [fields, setFields] = useState<FieldConfig[]>(INITIAL_FIELDS);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true);
                const accessToken = localStorage.getItem('access_token');
                if (!accessToken) {
                    console.error('No access token found');
                    return;
                }
                const response = await userDetailsService.getUserDetails(accessToken);
                if (response.statusCode === 200) {
                    const userData: UserDetails = response.data;
                    console.log('User data fetched:', userData);

                    setFields((prev) =>
                        prev.map((field) => ({
                            ...field,
                            value: getUserFieldValue(userData, field.id),
                        })),
                    );

                    setFormValues({
                        name: userData.data.username || '',
                        email: userData.data.email || '',
                        phone: userData.data.phone || '',
                    });
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const getUserFieldValue = (userData: UserDetails, fieldId: string): string => {
        switch (fieldId) {
            case 'name':
                return userData.data.username || '';
            case 'email':
                return userData.data.email || '';
            case 'phone':
                return userData.data.phone || '010-1234-5678';
            default:
                return '';
        }
    };

    const toggleEditField = (fieldId: string) => {
        setFields((prevFields) =>
            prevFields.map((field) => (field.id === fieldId ? { ...field, isEditing: !field.isEditing } : field)),
        );
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        setFields((prevFields) =>
            prevFields.map((field) => ({
                ...field,
                isEditing: false,
                value: formValues[field.id as keyof typeof formValues] || field.value,
            })),
        );

        /* later i will add the my page api service */
        console.log('Saving account details:', formValues);
    };

    const renderField = (field: FieldConfig) => {
        if (field.isEditing) {
            return (
                <FieldGroup key={field.id}>
                    <FieldContent>
                        <FieldLabel>{field.label}</FieldLabel>
                        <Input
                            name={field.id}
                            value={formValues[field.id as keyof typeof formValues]}
                            onChange={handleInputChange}
                            type={field.isPassword ? 'password' : 'text'}
                            fullWidth
                            transparent
                            size="xs"
                        />
                    </FieldContent>
                </FieldGroup>
            );
        }

        return (
            <FieldGroup key={field.id}>
                <FieldContent>
                    <FieldLabel>{field.label}</FieldLabel>
                    <FieldText>{field.isPassword ? '***********' : field.value}</FieldText>
                </FieldContent>
                <EditButton onClick={() => toggleEditField(field.id)} disabled={true}>
                    <FaEdit />
                </EditButton>
            </FieldGroup>
        );
    };

    const isEditMode = fields.some((field) => field.isEditing);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Header>Personal info</Header>

            <ProfileSection>
                <ProfileImage>👤</ProfileImage>
                <ProfileButtons>
                    <Button variant="signOut" size="mini">
                        Upload Photo
                    </Button>
                    <Button
                        variant="light"
                        size="mini"
                        style={{
                            backgroundColor: themeColors.colors.neutral.white,
                            color: themeColors.colors.neutral.black,
                        }}
                    >
                        Delete
                    </Button>
                </ProfileButtons>
            </ProfileSection>

            <FormContainer onSubmit={handleSubmit}>
                {fields.map(renderField)}

                {isEditMode && (
                    <ButtonsContainer>
                        <Button
                            variant="redText"
                            size="mini"
                            htmlType="button"
                            onClick={() => {
                                setFormValues({
                                    name: fields.find((f) => f.id === 'name')?.value || '',
                                    email: fields.find((f) => f.id === 'email')?.value || '',
                                    phone: fields.find((f) => f.id === 'phone')?.value || '',
                                });
                                setFields((prevFields) => prevFields.map((field) => ({ ...field, isEditing: false })));
                            }}
                        >
                            Cancel
                        </Button>
                        <Button variant="outline" htmlType="submit" size="sm">
                            <FaSave style={{ marginRight: '8px' }} />
                            Save Changes
                        </Button>
                    </ButtonsContainer>
                )}
            </FormContainer>
        </Container>
    );
}
