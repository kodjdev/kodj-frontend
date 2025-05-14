import React, { useState } from 'react';
import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaSave, FaEdit } from 'react-icons/fa';

type FieldConfig = {
    id: string;
    label: string;
    value: string;
    icon: React.ReactNode;
    isPassword?: boolean;
    isEditing: boolean;
};

const FormContainer = styled.form`
    max-width: 600px;
`;

const FieldGroup = styled.div`
    margin-bottom: ${themeColors.spacing.lg};
`;

const FieldLabel = styled.div`
    font-size: ${themeColors.typography.body.small.fontSize}px;
    color: ${themeColors.colors.gray.label};
    margin-bottom: ${themeColors.spacing.xs};
`;

const FieldValue = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${themeColors.colors.gray.inputTag};
    color: ${themeColors.colors.neutral.white};
    padding: 4px ${themeColors.spacing.sm};
    border-radius: ${themeColors.cardBorder.md};
`;

const FieldText = styled.div`
    font-size: ${themeColors.typography.body.small.fontSize}px;
`;

const EditButton = styled.button`
    background: none;
    border: none;
    color: ${themeColors.colors.primary.main};
    cursor: pointer;

    &:hover {
        color: ${themeColors.colors.primary.hover};
    }
`;

const PasswordDots = styled.div`
    display: flex;
    gap: 4px;

    span {
        width: 8px;
        height: 8px;
        background-color: ${themeColors.colors.neutral.white};
        border-radius: 50%;
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: ${themeColors.spacing.md};
    margin-top: ${themeColors.spacing.xl};
`;

/**
 * AccountDetails Component - Sub Organism Component
 * Form for viewing and editing account information
 */
export default function AccountDetails() {
    const [fields, setFields] = useState<FieldConfig[]>([
        {
            id: 'name',
            label: 'Name',
            value: 'Kholikov Oybek',
            icon: <FaUser />,
            isEditing: false,
        },
        {
            id: 'email',
            label: 'Email',
            value: 'example@example.com',
            icon: <FaEnvelope />,
            isEditing: false,
        },
        {
            id: 'password',
            label: 'Password',
            value: 'password123',
            icon: <FaLock />,
            isPassword: true,
            isEditing: false,
        },
        {
            id: 'phone',
            label: 'Phone number',
            value: '01012345678',
            icon: <FaPhone />,
            isEditing: false,
        },
    ]);

    const [formValues, setFormValues] = useState<Record<string, string>>({
        name: 'Kholikov Oybek',
        email: 'example@example.com',
        password: 'password123',
        phone: '01012345678',
    });

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
                value: formValues[field.id],
                isEditing: false,
            })),
        );

        //later i will add the my page api service
        console.log('Saving account details:', formValues);
    };

    const renderField = (field: FieldConfig) => {
        if (field.isEditing) {
            return (
                <Input
                    name={field.id}
                    value={formValues[field.id]}
                    onChange={handleInputChange}
                    type={field.isPassword ? 'password' : 'text'}
                    icon={field.icon}
                    fullWidth
                    style={{ padding: '10px, 10px' }}
                />
            );
        }

        return (
            <FieldGroup key={field.id}>
                <FieldLabel>{field.label}</FieldLabel>
                <FieldValue>
                    <FieldText>
                        {field.isPassword ? (
                            <PasswordDots>
                                {[...Array(10)].map((_, i) => (
                                    <span key={i} />
                                ))}
                            </PasswordDots>
                        ) : (
                            field.value
                        )}
                    </FieldText>
                    <EditButton onClick={() => toggleEditField(field.id)}>
                        <FaEdit />
                    </EditButton>
                </FieldValue>
            </FieldGroup>
        );
    };

    // we check if any field is in edit mode
    const isEditMode = fields.some((field) => field.isEditing);

    return (
        <FormContainer onSubmit={handleSubmit}>
            {fields.map(renderField)}

            {isEditMode && (
                <ButtonsContainer>
                    <Button
                        variant="secondary"
                        htmlType="button"
                        onClick={() => {
                            // then reset form values and exit edit mode
                            setFormValues({
                                name: fields.find((f) => f.id === 'name')?.value || '',
                                email: fields.find((f) => f.id === 'email')?.value || '',
                                password: fields.find((f) => f.id === 'password')?.value || '',
                                phone: fields.find((f) => f.id === 'phone')?.value || '',
                            });

                            setFields((prevFields) => prevFields.map((field) => ({ ...field, isEditing: false })));
                        }}
                    >
                        Cancel
                    </Button>
                    <Button variant="primary" htmlType="submit">
                        <FaSave style={{ marginRight: '8px' }} />
                        Save Changes
                    </Button>
                </ButtonsContainer>
            )}
        </FormContainer>
    );
}
