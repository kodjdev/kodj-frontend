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

const SelectWrapper = styled.div`
    position: relative;
    width: 100%;
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
`;

const TextArea = styled.textarea<{ hasError?: boolean }>`
    padding: ${themeColors.spacing.md} ${themeColors.spacing.lg};
    border-radius: ${themeColors.radiusSizes.md};
    border: 1px solid ${({ hasError }) => (hasError ? themeColors.red_text : themeColors.cardBorder.color)};
    background-color: ${themeColors.gray_background};
    color: ${themeColors.white_dark};
    resize: vertical;

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px ${themeColors.blue};
    }

    &::placeholder {
        color: ${themeColors.gray_text};
    }
`;

const ErrorMessage = styled.p`
    margin-top: ${themeColors.spacing.xs};
    font-size: ${themeColors.font12.fontSize}px;
    color: ${themeColors.red_text};
`;

const CheckboxContainer = styled.div`
    background-color: ${themeColors.gray_dark};
    padding: ${themeColors.spacing.sm};
    border-radius: ${themeColors.radiusSizes.md};
    border: 1px solid ${themeColors.cardBorder.color};
`;

const CheckboxLabel = styled.label`
    display: flex;
    align-items: flex-start;
`;

const Checkbox = styled.input`
    margin-top: ${themeColors.spacing.xs};
    margin-right: ${themeColors.spacing.sm};
    height: 20px;
    width: 20px;
    color: ${themeColors.blue};
    border-radius: ${themeColors.radiusSizes.sm};
    border: 1px solid ${themeColors.gray_text};

    &:focus {
        box-shadow: 0 0 0 2px ${themeColors.blue};
    }
`;

const CheckboxText = styled.span`
    color: ${themeColors.white_dark};
    font-size: ${themeColors.font12.fontSize}px;
`;

export default function StepTwoForm() {
    const {
        control,
        register,
        formState: { errors },
    } = useFormContext<RegistrationFormData>();

    const { t } = useTranslation('eventRegister');

    const validateMinLength = (value: string) => {
        return value.trim().length >= 15 || t('validation.additionalInfoMinLength');
    };

    const validateNotJustWhitespace = (value: string) => {
        return /\S/.test(value) || t('validation.additionalInfoNoEmptySpace');
    };

    const validateNotRepeatedChars = (value: string) => {
        const trimmed = value.trim();
        const uniqueChars = new Set(trimmed.split('')).size;
        return uniqueChars >= Math.max(3, Math.floor(trimmed.length * 0.3)) || t('validation.additionalInfoMeaningful');
    };

    const fieldOptions = [
        { value: 'ai', label: t('fieldOptions.ai') },
        { value: 'backend', label: t('fieldOptions.backend') },
        { value: 'frontend', label: t('fieldOptions.frontend') },
        { value: 'UI', label: t('fieldOptions.UI') },
        { value: 'mobile', label: t('fieldOptions.mobile') },
        { value: 'cloud', label: t('fieldOptions.cloud') },
        { value: 'cyber', label: t('fieldOptions.cyber') },
        { value: 'block', label: t('fieldOptions.block') },
        { value: 'game', label: t('fieldOptions.game') },
        { value: 'data', label: t('fieldOptions.data') },
        { value: 'web', label: t('fieldOptions.web') },
        { value: 'devops', label: t('fieldOptions.devops') },
    ];

    const attendanceOptions = [
        { value: 'first-time', label: t('formFields.firstTime') },
        { value: 'several-times', label: t('formFields.severalTimes') },
    ];

    const hopeOptions = [
        { value: 'networking', label: t('formFields.networking') },
        { value: 'learning', label: t('formFields.learning') },
        { value: 'jobOpportunities', label: t('formFields.jobOpportunities') },
        { value: 'others', label: t('formFields.others') },
    ];

    return (
        <FormContainer>
            <Controller
                control={control}
                name="notify"
                rules={{ required: t('validation.notifyRequired') }}
                render={({ field, fieldState: { error } }) => (
                    <FieldGroup>
                        <FormLabel htmlFor="notify" className="required">
                            {t('formFields.attendedBefore')}
                        </FormLabel>
                        <SelectWrapper>
                            <Select id="notify" value={field.value} onChange={field.onChange} hasError={!!error}>
                                <option value="">{t('fieldOptions.selectField')}</option>
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
                name="interestedField"
                rules={{ required: t('validation.interestedFieldRequired') }}
                render={({ field, fieldState: { error } }) => (
                    <FieldGroup>
                        <FormLabel htmlFor="interestedField" className="required">
                            {t('formFields.interestedField')}
                        </FormLabel>
                        <SelectWrapper>
                            <Select
                                id="interestedField"
                                value={field.value}
                                onChange={field.onChange}
                                hasError={!!error}
                            >
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
            <Controller
                control={control}
                name="hopes"
                rules={{ required: t('validation.hopesRequired') }}
                render={({ field, fieldState: { error } }) => (
                    <FieldGroup>
                        <FormLabel htmlFor="hopes" className="required">
                            {t('formFields.hopes')}
                        </FormLabel>
                        <SelectWrapper>
                            <Select id="hopes" value={field.value} onChange={field.onChange} hasError={!!error}>
                                <option value="">{t('fieldOptions.selectField')}</option>
                                {hopeOptions.map((option) => (
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
                <FormLabel htmlFor="additionalInfo" className="required">
                    {t('formFields.additionalInfo')}
                </FormLabel>
                <TextArea
                    id="additionalInfo"
                    rows={4}
                    placeholder={t('formFields.additionalInfoPlaceholder')}
                    hasError={!!errors.additionalInfo}
                    {...register('additionalInfo', {
                        required: t('validation.additionalInfoRequired'),
                        validate: {
                            minLength: validateMinLength,
                            notJustWhitespace: validateNotJustWhitespace,
                            notRepeatedChars: validateNotRepeatedChars,
                        },
                    })}
                />
                {errors.additionalInfo && <ErrorMessage>{errors.additionalInfo.message}</ErrorMessage>}
            </FieldGroup>
            <Controller
                control={control}
                name="consent"
                defaultValue={false}
                rules={{ required: t('validation.consentRequired') }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                        <CheckboxContainer>
                            <CheckboxLabel htmlFor="consent">
                                <Checkbox
                                    id="consent"
                                    type="checkbox"
                                    checked={value}
                                    onChange={(e) => onChange(e.target.checked)}
                                />
                                <CheckboxText>{t('formFields.consent')}</CheckboxText>
                            </CheckboxLabel>
                        </CheckboxContainer>
                        {error && <ErrorMessage>{error.message}</ErrorMessage>}
                    </>
                )}
            />
        </FormContainer>
    );
}
