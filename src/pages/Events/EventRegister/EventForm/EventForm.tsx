import styled from 'styled-components';
import { useFormContext, Controller } from 'react-hook-form';
import type { RegistrationFormData } from '@/types';
import { useTranslation } from 'react-i18next';
import themeColors from '@/tools/themeColors';
import { ChevronDown } from 'lucide-react';

const FormContainer = styled.div`
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    gap: ${themeColors.spacing.md};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding-top: ${themeColors.spacing.lg};
        gap: ${themeColors.spacing.sm};
    }
`;

const FieldGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${themeColors.spacing.sm};
    width: 100%;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        gap: ${themeColors.spacing.xs};
    }
`;

const FormLabel = styled.label`
    color: ${themeColors.gray_text};
    font-weight: ${themeColors.font14.fontWeight};
    font-size: ${themeColors.font12.fontSize}px;

    &.required::after {
        content: ' *';
        color: ${themeColors.red_text};
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.font10.fontSize}px;
    }
`;

const Select = styled.select<{ hasError?: boolean }>`
    width: 100%;
    padding: 13px 17px;
    padding-right: 40px;
    border-radius: ${themeColors.radiusSizes.md};
    border: 1px solid ${({ hasError }) => (hasError ? themeColors.red_text : themeColors.cardBorder.color)};
    background-color: ${themeColors.gray_background};
    color: ${themeColors.white_dark};
    font-size: ${themeColors.font12.fontSize}px;
    appearance: none;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px ${themeColors.blue};
    }

    option {
        background-color: ${themeColors.gray_background};
        color: ${themeColors.white_dark};
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: 12px 15px;
        padding-right: 35px;
        font-size: ${themeColors.font10.fontSize}px;
    }
`;

const TextArea = styled.textarea<{ hasError?: boolean }>`
    padding: ${themeColors.spacing.md} ${themeColors.spacing.lg};
    border-radius: ${themeColors.radiusSizes.md};
    border: 1px solid ${({ hasError }) => (hasError ? themeColors.red_text : themeColors.cardBorder.color)};
    background-color: ${themeColors.gray_background};
    color: ${themeColors.white_dark};
    resize: vertical;
    min-height: 100px;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px ${themeColors.blue};
    }

    &::placeholder {
        color: ${themeColors.gray_text};
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: ${themeColors.spacing.sm} ${themeColors.spacing.md};
        font-size: ${themeColors.font10.fontSize}px;
        min-height: 80px;
    }
`;

const ErrorMessage = styled.p`
    margin-top: 0;
    margin-bottom: 0;
    font-size: ${themeColors.font12.fontSize}px;
    color: ${themeColors.red_text};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.font10.fontSize}px;
        margin-top: 4px;
    }
`;

const SelectIcon = styled(ChevronDown)`
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    color: ${themeColors.gray_text};
    pointer-events: none;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        right: 10px;
        width: 14px;
        height: 14px;
    }
`;

const SelectWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const CheckboxContainer = styled.div`
    background-color: ${themeColors.gray_dark};
    padding: ${themeColors.spacing.md};
    border-radius: ${themeColors.radiusSizes.md};
    border: 1px solid ${themeColors.cardBorder.color};
`;

const CheckboxLabel = styled.label`
    display: flex;
    align-items: flex-start;
`;

const Checkbox = styled.input`
    margin-top: 2px;
    margin-right: ${themeColors.spacing.sm};
    margin-bottom: 0;
    height: 12px;
    width: 12px;
    color: ${themeColors.blue};
    border-radius: ${themeColors.radiusSizes.sm};
    border: 1px solid ${themeColors.gray_text};

    &:focus {
        box-shadow: 0 0 0 2px ${themeColors.blue};
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        height: 14px;
        width: 14px;
    }
`;

const CheckboxText = styled.span`
    color: ${themeColors.white_dark};
    font-size: ${themeColors.font12.fontSize}px;
`;

const CheckboxInfo = styled.p`
    color: ${themeColors.gray_text};
    font-size: ${themeColors.font12.fontSize}px;
    margin-top: ${themeColors.spacing.xs};
    margin-left: 2px;
    line-height: 1.4;
    margin-bottom: ${themeColors.spacing.xs};
    width: 100%;
    max-width: 600px;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.font10.fontSize}px;
        margin-left: 2px;
    }
`;

export default function EventForm() {
    const {
        control,
        register,
        formState: { errors },
    } = useFormContext<RegistrationFormData>();

    const { t } = useTranslation('eventRegister');

    const attendanceOptions = [
        { value: 'first-time', label: t('formFields.firstTime') },
        { value: 'several-times', label: t('formFields.severalTimes') },
        { value: 'networking', label: t('formFields.networking') },
        { value: 'learning', label: t('formFields.learning') },
        { value: 'job-opportunities', label: t('formFields.jobOpportunities') },
        { value: 'others', label: t('formFields.others') },
    ];

    const fieldOptions = [
        { value: 'ai', label: t('fieldOptions.ai') },
        { value: 'backend', label: t('fieldOptions.backend') },
        { value: 'frontend', label: t('fieldOptions.frontend') },
        { value: 'UI', label: t('fieldOptions.UI') },
        { value: 'mobile', label: t('fieldOptions.mobile') },
        { value: 'cloud', label: t('fieldOptions.cloud') },
        { value: 'cyber', label: t('fieldOptions.cyber') },
        { value: 'data', label: t('fieldOptions.data') },
    ];

    return (
        <FormContainer>
            <Controller
                control={control}
                name="attendanceReason"
                rules={{ required: t('validation.attendanceReasonRequired') }}
                render={({ field, fieldState: { error } }) => (
                    <FieldGroup>
                        <FormLabel htmlFor="attendanceReason" className="required">
                            {t('formFields.attendanceReason')}
                        </FormLabel>
                        <SelectWrapper>
                            <Select
                                id="attendanceReason"
                                value={field.value}
                                onChange={field.onChange}
                                hasError={!!error}
                            >
                                <option value="">{t('fieldOptions.selectReason')}</option>
                                {attendanceOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Select>
                            <SelectIcon />
                        </SelectWrapper>
                        {error && <ErrorMessage>{error.message}</ErrorMessage>}
                    </FieldGroup>
                )}
            />

            <Controller
                control={control}
                name="interestField"
                rules={{ required: t('validation.interestedFieldRequired') }}
                render={({ field, fieldState: { error } }) => (
                    <FieldGroup>
                        <FormLabel htmlFor="interestField" className="required">
                            {t('formFields.interestedField')}
                        </FormLabel>
                        <SelectWrapper>
                            <Select id="interestField" value={field.value} onChange={field.onChange} hasError={!!error}>
                                <option value="">{t('fieldOptions.selectField')}</option>
                                {fieldOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Select>
                            <SelectIcon />
                        </SelectWrapper>
                        {error && <ErrorMessage>{error.message}</ErrorMessage>}
                    </FieldGroup>
                )}
            />

            <FieldGroup>
                <FormLabel htmlFor="expectation" className="required">
                    {t('formFields.expectation')}
                </FormLabel>
                <TextArea
                    id="expectation"
                    rows={4}
                    placeholder={t('formFields.expectationPlaceholder')}
                    hasError={!!errors.expectation}
                    {...register('expectation', {
                        required: t('validation.expectationRequired'),
                        minLength: {
                            value: 10,
                            message: t('validation.expectationMinLength'),
                        },
                    })}
                />
                {errors.expectation && <ErrorMessage>{errors.expectation.message}</ErrorMessage>}
            </FieldGroup>
            <Controller
                control={control}
                name="consent"
                rules={{ required: t('validation.consentRequired') }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                        <CheckboxContainer>
                            <CheckboxLabel htmlFor="consent">
                                <Checkbox
                                    id="consent"
                                    type="checkbox"
                                    checked={Boolean(value)}
                                    onChange={(e) => onChange(e.target.checked)}
                                />
                                <CheckboxText>{t('formFields.consent')}</CheckboxText>
                            </CheckboxLabel>
                            <CheckboxInfo>
                                Your personal data will only be used for event registration purposes.
                            </CheckboxInfo>
                        </CheckboxContainer>
                        {error && <ErrorMessage>{error.message}</ErrorMessage>}
                    </>
                )}
            />
        </FormContainer>
    );
}
