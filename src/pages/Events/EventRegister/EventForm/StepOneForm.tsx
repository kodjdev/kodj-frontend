import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import type { RegistrationFormData } from '@/types';
import { useTranslation } from 'react-i18next';
import themeColors from '@/tools/themeColors';

const FormContainer = styled.div`
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    gap: ${themeColors.spacing.md};
`;

const FieldRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${themeColors.spacing.sm};

    @media (min-width: ${themeColors.breakpoints.tablet}) {
        flex-direction: row;
    }
`;

const FieldGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${themeColors.spacing.sm};
    width: 100%;
`;

const FormLabel = styled.label`
    color: ${themeColors.gray_text};
    font-weight: ${themeColors.font14.fontWeight};
    font-size: ${themeColors.font12.fontSize}px;

    &.required::after {
        content: ' *';
        color: ${themeColors.red_text};
    }
`;

const Input = styled.input<{ hasError?: boolean; isValid?: boolean }>`
    padding: 13px 17px;
    border-radius: ${themeColors.radiusSizes.md};
    border: 1px solid
        ${({ hasError, isValid }) =>
            hasError ? themeColors.red_text : isValid ? themeColors.blue : themeColors.cardBorder.color};
    background-color: ${themeColors.gray_background};
    color: ${themeColors.white};
    font-size: ${themeColors.font12.fontSize}px;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px ${themeColors.blue};
    }

    &::placeholder {
        color: ${themeColors.gray_text};
    }
`;

const ErrorMessage = styled.span`
    color: ${themeColors.red_text};
    font-size: ${themeColors.font10.fontSize}px;
    margin-top: ${themeColors.spacing.xs};
`;

export default function StepOneForm() {
    const {
        register,
        formState: { errors },
        watch,
    } = useFormContext<RegistrationFormData>();

    const { t } = useTranslation('eventRegister');

    return (
        <FormContainer>
            <FieldRow>
                <FieldGroup>
                    <FormLabel htmlFor="firstName" className="required">
                        {t('formFields.firstName')}
                    </FormLabel>
                    <Input
                        id="firstName"
                        placeholder="Aziz"
                        hasError={!!errors.firstName}
                        isValid={watch('firstName')?.length >= 4}
                        {...register('firstName', {
                            required: t('validation.firstNameRequired'),
                            minLength: {
                                value: 2,
                                message: t('validation.firstNameMinLength'),
                            },
                        })}
                    />
                    {errors.firstName && <ErrorMessage>{errors.firstName.message}</ErrorMessage>}
                </FieldGroup>
                <FieldGroup>
                    <FormLabel htmlFor="lastName" className="required">
                        {t('formFields.lastName')}
                    </FormLabel>
                    <Input
                        id="lastName"
                        placeholder="Botirov"
                        hasError={!!errors.lastName}
                        isValid={watch('lastName')?.length >= 4}
                        {...register('lastName', {
                            required: t('validation.lastNameRequired'),
                            minLength: {
                                value: 4,
                                message: t('validation.lastNameMinLength'),
                            },
                        })}
                    />
                    {errors.lastName && <ErrorMessage>{errors.lastName.message}</ErrorMessage>}
                </FieldGroup>
            </FieldRow>

            <FieldGroup>
                <FormLabel htmlFor="jobTitle" className="required">
                    {t('formFields.jobTitle')}
                </FormLabel>
                <Input
                    id="jobTitle"
                    placeholder="Developer | Student | Researcher"
                    hasError={!!errors.jobTitle}
                    isValid={watch('jobTitle')?.length >= 4}
                    {...register('jobTitle', {
                        required: t('validation.jobTitleRequired'),
                        minLength: {
                            value: 4,
                            message: t('validation.jobTitleMinLength'),
                        },
                    })}
                />
                {errors.jobTitle && <ErrorMessage>{errors.jobTitle.message}</ErrorMessage>}
            </FieldGroup>

            <FieldGroup>
                <FormLabel htmlFor="experience" className="required">
                    {t('formFields.experience')}
                </FormLabel>
                <Input
                    id="experience"
                    placeholder="2 years"
                    hasError={!!errors.experience}
                    isValid={watch('experience')?.length >= 1}
                    {...register('experience', {
                        required: t('validation.experienceRequired'),
                        minLength: {
                            value: 2,
                            message: t('validation.experienceMinLength'),
                        },
                    })}
                />
                {errors.experience && <ErrorMessage>{errors.experience.message}</ErrorMessage>}
            </FieldGroup>

            <FieldGroup>
                <FormLabel htmlFor="email" className="required">
                    {t('formFields.email')}
                </FormLabel>
                <Input
                    id="email"
                    type="email"
                    placeholder="teshaboev@gmail.com"
                    hasError={!!errors.email}
                    isValid={watch('email')?.length >= 6}
                    {...register('email', {
                        required: t('validation.emailRequired'),
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: t('validation.emailInvalid'),
                        },
                    })}
                />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
            </FieldGroup>

            <FieldGroup>
                <FormLabel htmlFor="phone" className="required">
                    {t('formFields.phone')}
                </FormLabel>
                <Input
                    id="phone"
                    type="tel"
                    placeholder="01012345678"
                    hasError={!!errors.phone}
                    isValid={watch('phone')?.length >= 12}
                    {...register('phone', {
                        required: t('validation.phoneRequired'),
                        pattern: {
                            value: /^\d{3}\d{4}\d{4}$/,
                            message: t('validation.phoneFormat'),
                        },
                    })}
                />
                {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
            </FieldGroup>
        </FormContainer>
    );
}
