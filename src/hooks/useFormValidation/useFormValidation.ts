import { EMAIL_REGEXES, FREE_EMAIL_DOMAINS, PASSWORD_RULES, PHONE_PATTERNS } from '@/utils/patterns';
import { useState, useCallback } from 'react';

type ValidationRules = {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
    phoneFormat?: 'kr' | 'uz';
    matchField?: string;
    emailFormat?: 'standard' | 'business' | 'strict';
};

type ValidationResult = {
    isValid: boolean;
    error: string;
    strength?: 'weak' | 'medium' | 'strong';
};

export const useFormValidation = () => {
    const validateEmail = useCallback(
        (email: string, format: 'standard' | 'business' | 'strict' = 'standard'): ValidationResult => {
            if (!email) {
                return { isValid: false, error: 'Email is required' };
            }

            const regex = EMAIL_REGEXES[format];

            if (format === 'business' && regex.test(email)) {
                const domain = email.split('@')[1].toLowerCase();
                if (FREE_EMAIL_DOMAINS.includes(domain)) {
                    return { isValid: false, error: 'Please use a business email address' };
                }
            }

            if (!regex.test(email)) {
                return { isValid: false, error: 'Invalid email format' };
            }

            const [localPart, domain] = email.split('@');

            if (localPart.length > 64) {
                return { isValid: false, error: 'Email username is too long' };
            }

            if (domain.startsWith('.') || domain.endsWith('.')) {
                return { isValid: false, error: 'Invalid domain format' };
            }

            if (email.includes('..')) {
                return { isValid: false, error: 'Email cannot contain consecutive dots' };
            }

            return { isValid: true, error: '' };
        },
        [],
    );

    const validatePassword = useCallback((password: string, rules?: ValidationRules): ValidationResult => {
        const errors: string[] = [];
        let strengthScore = 0;

        const defaultRules = {
            minLength: 8,
            requireUppercase: true,
            requireLowercase: true,
            requireNumbers: true,
            requireSpecialChars: true,
            ...rules,
        };

        if (password.length < (defaultRules.minLength || 8)) {
            errors.push(`Password must be at least ${defaultRules.minLength} characters`);
        } else {
            strengthScore++;
        }

        const ruleChecks = [
            { key: 'requireUppercase', rule: PASSWORD_RULES.uppercase },
            { key: 'requireLowercase', rule: PASSWORD_RULES.lowercase },
            { key: 'requireNumbers', rule: PASSWORD_RULES.numbers },
            { key: 'requireSpecialChars', rule: PASSWORD_RULES.specialChars },
        ] as const;

        ruleChecks.forEach(({ key, rule }) => {
            const isRequired = defaultRules[key];
            const hasPattern = rule.regex.test(password);

            if (isRequired && !hasPattern) {
                errors.push(rule.message);
            } else if (hasPattern) {
                strengthScore++;
            }
        });

        const strength: 'weak' | 'medium' | 'strong' =
            strengthScore >= 5 ? 'strong' : strengthScore >= 3 ? 'medium' : 'weak';

        return {
            isValid: errors.length === 0,
            error: errors.join('. '),
            strength,
        };
    }, []);

    const validatePhone = useCallback((phone: string, format: 'kr' | 'uz'): ValidationResult => {
        const digitsOnly = phone.replace(/\D/g, '');
        const pattern = PHONE_PATTERNS[format];

        if (!digitsOnly) {
            return { isValid: false, error: '' };
        }

        if (pattern.prefix && !digitsOnly.startsWith(pattern.prefix)) {
            return { isValid: false, error: `Phone number must start with ${pattern.prefix}` };
        }

        if (digitsOnly.length !== pattern.length) {
            return {
                isValid: false,
                error:
                    format === 'kr'
                        ? `Phone number must be ${pattern.length} digits (${digitsOnly.length}/${pattern.length})`
                        : `Phone number must be ${pattern.length} digits`,
            };
        }

        if (!pattern.regex.test(digitsOnly)) {
            return {
                isValid: false,
                error: format === 'kr' ? 'Invalid phone number format' : 'Invalid Uzbek phone number',
            };
        }

        return { isValid: true, error: '' };
    }, []);

    const validateMatch = useCallback((value: string, matchValue: string): ValidationResult => {
        if (value !== matchValue) {
            return { isValid: false, error: 'Fields do not match' };
        }
        return { isValid: true, error: '' };
    }, []);

    return {
        validateEmail,
        validatePassword,
        validatePhone,
        validateMatch,
    };
};

export const useFieldValidation = (
    validationType: 'email' | 'password' | 'phone' | 'match',
    rules?: ValidationRules,
) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [touched, setTouched] = useState(false);
    const { validateEmail, validatePassword, validatePhone, validateMatch } = useFormValidation();

    const validate = useCallback(
        (inputValue: string, matchValue?: string) => {
            const validators = {
                email: () => validateEmail(inputValue, rules?.emailFormat),
                password: () => validatePassword(inputValue, rules),
                phone: () => validatePhone(inputValue, rules?.phoneFormat || 'kr'),
                match: () => validateMatch(inputValue, matchValue || ''),
            };

            const result = validators[validationType]() || { isValid: true, error: '' };
            setError(touched ? result.error : '');
            return result;
        },
        [validationType, validateEmail, validatePassword, validatePhone, validateMatch, rules, touched],
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>, matchValue?: string) => {
            const newValue = e.target.value;

            /* we only allow the digits for phone validation */
            if (validationType === 'phone' && !/^\d*$/.test(newValue)) {
                return;
            }

            setValue(newValue);
            if (touched) {
                validate(newValue, matchValue);
            }
        },
        [validationType, touched, validate],
    );

    const handleBlur = useCallback(() => {
        setTouched(true);
        validate(value);
    }, [value, validate]);

    return {
        value,
        error,
        onChange: handleChange,
        onBlur: handleBlur,
        setValue,
        setError,
        validate,
        isValid: !error && touched,
    };
};
