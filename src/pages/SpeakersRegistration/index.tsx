import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import themeColors from '@/tools/themeColors';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import { useStatusHandler } from '@/hooks/useStatusHandler/useStatusHandler';
import useAuth from '@/context/useAuth';
import { useFieldValidation } from '@/hooks/useFormValidation/useFormValidation';

type SpeakerFormData = {
    email: string;
    fullName: string;
    jobPosition: string;
    phone: string;
    yearsOfExperience: string;
    expertiseField: string;
    topics: string;
    linkedinUrl: string;
    githubUrl: string;
    portfolioUrl: string;
    role: 'speaker';
};

const PageContainer = styled.div`
    min-height: 100vh;
    background-color: ${themeColors.colors.neutral.black};
    color: ${themeColors.colors.neutral.white};
    padding: ${themeColors.spacing.lg} 0;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: 0;
    }
`;

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    margin-bottom: ${themeColors.spacing.xxl};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: 0;
    }
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: ${themeColors.spacing.lg};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        margin-bottom: ${themeColors.spacing.md};
        padding: 0 ${themeColors.spacing.sm};
    }
`;

const MainTitle = styled.h1`
    font-size: ${themeColors.typography.headings.desktop.h1.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h1.fontWeight};
    color: ${themeColors.colors.primary.main};
    margin-bottom: ${themeColors.spacing.md};

    .brand {
        background-color: ${themeColors.colors.neutral.white};
        color: ${themeColors.colors.neutral.black};
        padding: 0 ${themeColors.spacing.sm};
        border-radius: 4px;
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.headings.mobile.h2.fontSize}px;
        margin-top: 0;
    }
`;

const Subtitle = styled.p`
    font-size: ${themeColors.typography.body.large.fontSize}px;
    color: ${themeColors.colors.gray.text};
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.body.medium.fontSize}px;
    }
`;

const FormContainer = styled.div`
    border: 1px solid ${themeColors.cardBorder.color};
    background-color: ${themeColors.colors.gray.dark};
    border-radius: 16px;
    padding: ${themeColors.spacing.lg};
    margin-bottom: ${themeColors.spacing.xxl};
    position: relative;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: ${themeColors.spacing.md};
        margin-bottom: ${themeColors.spacing.lg};
        border-radius: 12px;
    }
`;

const LoadingOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: ${themeColors.spacing.md};
    z-index: 10;
`;

const LoadingText = styled.div`
    color: ${themeColors.colors.primary.main};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
`;

const FormTitle = styled.h2`
    font-size: ${themeColors.typography.headings.desktop.h3.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h3.fontWeight};
    color: ${themeColors.colors.neutral.white};
    margin-bottom: ${themeColors.spacing.xl};
    margin-top: 0;

    .emoji {
        margin-right: ${themeColors.spacing.sm};
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.headings.mobile.h3.fontSize}px;
        margin-bottom: ${themeColors.spacing.md};
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: ${themeColors.spacing.lg};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        gap: ${themeColors.spacing.md};
    }
`;

const FieldGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${themeColors.spacing.sm};
`;

const FieldRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${themeColors.spacing.lg};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        grid-template-columns: 1fr;
    }
`;

const Label = styled.label`
    color: ${themeColors.colors.gray.label};
    font-size: ${themeColors.typography.body.xsmall.fontSize}px;
    font-weight: 700;
`;

const Select = styled.select`
    width: 100%;
    border: 1px solid ${themeColors.cardBorder.color};
    background-color: ${themeColors.colors.gray.dark};
    border-radius: 8px;
    height: 42px;
    padding: ${themeColors.spacing.sm};
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.body.medium.fontSize}px;

    &:focus {
        outline: none;
        border-color: ${themeColors.colors.primary.main};
        box-shadow: 0 0 0 2px rgba(${themeColors.colors.primary.main}, 0.2);
    }

    option {
        background-color: ${themeColors.colors.gray.background};
        color: ${themeColors.colors.neutral.white};
    }
`;

const TextArea = styled.textarea`
    border: 1px solid ${themeColors.cardBorder.color};
    background-color: ${themeColors.colors.gray.dark};
    border-radius: 8px;
    padding: ${themeColors.spacing.md};
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    resize: vertical;
    min-height: 120px;
    font-family: inherit;

    &:focus {
        outline: none;
        border-color: ${themeColors.colors.primary.main};
        box-shadow: 0 0 0 2px rgba(${themeColors.colors.primary.main}, 0.2);
    }

    &::placeholder {
        color: ${themeColors.colors.gray.main};
    }
`;

const ErrorText = styled.span`
    color: ${themeColors.colors.status.error.text};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    margin-top: ${themeColors.spacing.xs};
`;

const SubmitButton = styled(Button)`
    margin-top: ${themeColors.spacing.lg};
    background: linear-gradient(135deg, ${themeColors.colors.primary.main} 0%, ${themeColors.colors.primary.dark} 100%);
    border: none;
    padding: ${themeColors.spacing.md} ${themeColors.spacing.xl};
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(${themeColors.colors.primary.main}, 0.3);
    }

    &:active {
        transform: translateY(0);
    }
`;

const InfoSection = styled.div`
    border: 1px solid ${themeColors.cardBorder.color};
    background-color: ${themeColors.colors.gray.dark};
    border-radius: 16px;
    padding: ${themeColors.spacing.lg};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: ${themeColors.spacing.md};
        border-radius: 12px;
    }
`;

const InfoTitle = styled.h2`
    font-size: ${themeColors.typography.headings.desktop.h3.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h3.fontWeight};
    color: ${themeColors.colors.primary.main};
    margin-bottom: ${themeColors.spacing.xl};
    margin-top: 0;
`;

const ReasonsList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0 0 ${themeColors.spacing.xl} 0;
`;

const ReasonItem = styled.li`
    display: flex;
    align-items: flex-start;
    margin-bottom: ${themeColors.spacing.md};
    color: ${themeColors.colors.neutral.white};
    line-height: 1.6;

    &:before {
        content: '•';
        color: ${themeColors.colors.primary.main};
        font-weight: bold;
        width: 20px;
        margin-right: ${themeColors.spacing.sm};
        flex-shrink: 0;
    }
`;

const InfoConclusion = styled.p`
    color: ${themeColors.colors.gray.text};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    line-height: 1.6;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: ${themeColors.spacing.md};
`;

const ModalContent = styled.div`
    background-color: ${themeColors.colors.gray.inputTag};
    border-radius: 16px;
    padding: ${themeColors.spacing.xxl};
    max-width: 500px;
    width: 100%;
    text-align: center;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: ${themeColors.spacing.lg};
        margin: ${themeColors.spacing.sm};
        border-radius: 12px;
    }
`;

const ModalTitle = styled.h2`
    color: ${themeColors.colors.primary.main};
    font-size: ${themeColors.typography.headings.desktop.h3.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h3.fontWeight};
    margin-bottom: ${themeColors.spacing.lg};
`;

const ModalMessage = styled.p`
    color: ${themeColors.colors.gray.text};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    line-height: 1.6;
    margin-bottom: ${themeColors.spacing.md};
`;

const ModalFooter = styled.p`
    color: ${themeColors.colors.gray.main};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    margin-bottom: ${themeColors.spacing.xl};
`;

export default function SpeakersRegistration() {
    const { i18n, t } = useTranslation('speakers');
    const navigate = useNavigate();
    const { register } = useAuth();
    const [messageApi, contextHolder] = message.useMessage();
    const { loading, handleAsyncOperation } = useStatusHandler(messageApi);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const email = useFieldValidation('email', { emailFormat: 'standard' });
    const fullName = useFieldValidation('username');
    const phone = useFieldValidation('phone', { phoneFormat: 'kr' });
    const [jobPosition, setJobPosition] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [expertiseField, setExpertiseField] = useState('');
    const [topics, setTopics] = useState('');
    const [linkedinUrl, setLinkedinUrl] = useState('');
    const [githubUrl, setGithubUrl] = useState('');
    const [portfolioUrl, setPortfolioUrl] = useState('');

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        const emailValidation = email.validate(email.value);
        if (!emailValidation.isValid) {
            newErrors.email = emailValidation.error;
        }

        const nameValidation = fullName.validate(fullName.value);
        if (!nameValidation.isValid) {
            newErrors.fullName = nameValidation.error;
        }

        const phoneValidation = phone.validate(phone.value);
        if (!phoneValidation.isValid) {
            newErrors.phone = phoneValidation.error;
        }

        if (!jobPosition.trim()) {
            newErrors.jobPosition = t('validation.jobPositionRequired');
        }

        if (!yearsOfExperience) {
            newErrors.yearsOfExperience = t('validation.yearsOfExperienceRequired');
        }

        if (!expertiseField) {
            newErrors.expertiseField = t('validation.expertiseFieldRequired');
        }

        if (!topics.trim()) {
            newErrors.topics = t('validation.topicsRequired');
        } else if (topics.trim().length < 10) {
            newErrors.topics = t('validation.topicsMinLength');
        }

        const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
        if (!linkedinUrl.trim()) {
            newErrors.linkedinUrl = t('validation.linkedinUrlRequired');
        } else if (!linkedinRegex.test(linkedinUrl)) {
            newErrors.linkedinUrl = t('validation.linkedinUrlFormat');
        }

        const githubRegex = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/;
        if (!githubUrl.trim()) {
            newErrors.githubUrl = t('validation.githubUrlRequired');
        } else if (!githubRegex.test(githubUrl)) {
            newErrors.githubUrl = t('validation.githubUrlFormat');
        }

        const urlRegex = /^https?:\/\/(www\.)?[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}(\/.*)?$/;
        if (!portfolioUrl.trim()) {
            newErrors.portfolioUrl = t('validation.portfolioUrlRequired');
        } else if (!urlRegex.test(portfolioUrl)) {
            newErrors.portfolioUrl = t('validation.portfolioUrlFormat');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formData: SpeakerFormData = {
            email: email.value,
            fullName: fullName.value,
            jobPosition: jobPosition.trim(),
            phone: phone.value,
            yearsOfExperience,
            expertiseField,
            topics: topics.trim(),
            linkedinUrl: linkedinUrl.trim(),
            githubUrl: githubUrl.trim(),
            portfolioUrl: portfolioUrl.trim(),
            role: 'speaker',
        };

        const { data, error } = await handleAsyncOperation(
            () =>
                register({
                    email: formData.email,
                    /* when i implement the proper speaker registration endpoint,
                     * this will be changed to proper api service
                     */
                    password: 'temporary-password-' + Date.now(),
                    username: formData.fullName.replace(/\s+/g, '').toLowerCase() + Date.now(),
                    name: formData.fullName,
                    phone: formData.phone,
                    firstName: formData.fullName.split(' ')[0],
                    lastName: formData.fullName.split(' ').slice(1).join(' '),
                    role: 'speaker',
                }),
            {
                loadingMessage: t('messages.submitting'),
                successMessage: t('messages.submitSuccess'),
                showError: true,
                errorMessage: t('messages.submitError'),
            },
        );

        if (data && !error) {
            email.setValue('');
            fullName.setValue('');
            phone.setValue('');
            setJobPosition('');
            setYearsOfExperience('');
            setExpertiseField('');
            setTopics('');
            setLinkedinUrl('');
            setGithubUrl('');
            setPortfolioUrl('');
            setErrors({});

            setShowSuccessModal(true);
        }
    };

    const handleModalClose = () => {
        setShowSuccessModal(false);
        navigate('/');
    };

    return (
        <PageContainer>
            {contextHolder}
            <Container>
                <Header>
                    <MainTitle>
                        {t('title')} {i18n.language === 'en' && <span className="brand">KO'DJ</span>}
                    </MainTitle>
                    <Subtitle>{t('subtitle')}</Subtitle>
                </Header>

                <FormContainer>
                    {loading && (
                        <LoadingOverlay>
                            <LoadingText>{t('messages.submitting')}</LoadingText>
                        </LoadingOverlay>
                    )}

                    <FormTitle>
                        <span className="emoji">🔉</span>
                        {t('applyToSpeak')}
                    </FormTitle>

                    <Form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Label htmlFor="email">{t('formFields.email')}</Label>
                            <Input
                                id="email"
                                type="email"
                                size="xs"
                                placeholder={t('placeholders.email')}
                                value={email.value}
                                onChange={email.onChange}
                                onBlur={email.onBlur}
                                error={errors.email || email.error}
                                fullWidth
                                transparent
                            />
                        </FieldGroup>

                        <FieldGroup>
                            <Label htmlFor="fullName">{t('formFields.fullName')}</Label>
                            <Input
                                id="fullName"
                                type="text"
                                size="xs"
                                placeholder={t('placeholders.fullName')}
                                value={fullName.value}
                                onChange={fullName.onChange}
                                onBlur={fullName.onBlur}
                                error={errors.fullName || fullName.error}
                                fullWidth
                                transparent
                            />
                        </FieldGroup>

                        <FieldRow>
                            <FieldGroup>
                                <Label htmlFor="jobPosition">{t('formFields.jobPosition')}</Label>
                                <Input
                                    id="jobPosition"
                                    type="text"
                                    size="xs"
                                    placeholder={t('placeholders.jobPosition')}
                                    value={jobPosition}
                                    onChange={(e) => setJobPosition(e.target.value)}
                                    error={errors.jobPosition}
                                    fullWidth
                                    transparent
                                />
                            </FieldGroup>

                            <FieldGroup>
                                <Label htmlFor="phone">{t('formFields.phone')}</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    size="xs"
                                    placeholder={t('placeholders.phone')}
                                    value={phone.value}
                                    onChange={phone.onChange}
                                    onBlur={phone.onBlur}
                                    error={errors.phone || phone.error}
                                    fullWidth
                                    transparent
                                />
                            </FieldGroup>
                        </FieldRow>

                        <FieldRow>
                            <FieldGroup>
                                <Label htmlFor="yearsOfExperience">{t('formFields.yearsOfExperience')}</Label>
                                <Select
                                    id="yearsOfExperience"
                                    value={yearsOfExperience}
                                    onChange={(e) => setYearsOfExperience(e.target.value)}
                                >
                                    <option value="">{t('experienceOptions.selectExperience')}</option>
                                    <option value="0-1">{t('experienceOptions.lessThanOneYear')}</option>
                                    <option value="1-3">{t('experienceOptions.oneToThreeYears')}</option>
                                    <option value="3-5">{t('experienceOptions.threeToFiveYears')}</option>
                                    <option value="5-10">{t('experienceOptions.fiveToTenYears')}</option>
                                    <option value="10+">{t('experienceOptions.moreThanTenYears')}</option>
                                </Select>
                                {errors.yearsOfExperience && <ErrorText>{errors.yearsOfExperience}</ErrorText>}
                            </FieldGroup>

                            <FieldGroup>
                                <Label htmlFor="expertiseField">{t('formFields.expertiseField')}</Label>
                                <Select
                                    id="expertiseField"
                                    value={expertiseField}
                                    onChange={(e) => setExpertiseField(e.target.value)}
                                >
                                    <option value="">{t('expertiseOptions.selectField')}</option>
                                    <option value="frontend">{t('expertiseOptions.frontend')}</option>
                                    <option value="backend">{t('expertiseOptions.backend')}</option>
                                    <option value="fullstack">{t('expertiseOptions.fullstack')}</option>
                                    <option value="mobile">{t('expertiseOptions.mobile')}</option>
                                    <option value="devops">{t('expertiseOptions.devops')}</option>
                                    <option value="data">{t('expertiseOptions.data')}</option>
                                    <option value="ai">{t('expertiseOptions.ai')}</option>
                                    <option value="blockchain">{t('expertiseOptions.blockchain')}</option>
                                    <option value="security">{t('expertiseOptions.security')}</option>
                                    <option value="gamedev">{t('expertiseOptions.gamedev')}</option>
                                    <option value="other">{t('expertiseOptions.other')}</option>
                                </Select>
                                {errors.expertiseField && <ErrorText>{errors.expertiseField}</ErrorText>}
                            </FieldGroup>
                        </FieldRow>

                        <FieldGroup>
                            <Label htmlFor="topics">{t('formFields.topics')}</Label>
                            <TextArea
                                id="topics"
                                placeholder={t('placeholders.topics')}
                                value={topics}
                                onChange={(e) => setTopics(e.target.value)}
                            />
                            {errors.topics && <ErrorText>{errors.topics}</ErrorText>}
                        </FieldGroup>

                        <FieldGroup>
                            <Label htmlFor="linkedinUrl">{t('formFields.linkedinUrl')}</Label>
                            <Input
                                id="linkedinUrl"
                                type="url"
                                size="xs"
                                placeholder={t('placeholders.linkedinUrl')}
                                value={linkedinUrl}
                                onChange={(e) => setLinkedinUrl(e.target.value)}
                                error={errors.linkedinUrl}
                                fullWidth
                                transparent
                            />
                        </FieldGroup>

                        <FieldRow>
                            <FieldGroup>
                                <Label htmlFor="githubUrl">{t('formFields.githubUrl')}</Label>
                                <Input
                                    id="githubUrl"
                                    type="url"
                                    size="xs"
                                    placeholder={t('placeholders.githubUrl')}
                                    value={githubUrl}
                                    onChange={(e) => setGithubUrl(e.target.value)}
                                    error={errors.githubUrl}
                                    fullWidth
                                    transparent
                                />
                            </FieldGroup>

                            <FieldGroup>
                                <Label htmlFor="portfolioUrl">{t('formFields.portfolioUrl')}</Label>
                                <Input
                                    id="portfolioUrl"
                                    type="url"
                                    size="xs"
                                    placeholder={t('placeholders.portfolioUrl')}
                                    value={portfolioUrl}
                                    onChange={(e) => setPortfolioUrl(e.target.value)}
                                    error={errors.portfolioUrl}
                                    fullWidth
                                    transparent
                                />
                            </FieldGroup>
                        </FieldRow>

                        <SubmitButton htmlType="submit" variant="primary" size="md" fullWidth disabled={loading}>
                            {t('formFields.submitButton')}
                        </SubmitButton>
                    </Form>
                </FormContainer>

                <InfoSection>
                    <InfoTitle>{t('whyBecomeSpeaker.title')}</InfoTitle>
                    <ReasonsList>
                        {(t('whyBecomeSpeaker.reasons', { returnObjects: true }) as string[]).map(
                            (reason: string, index: number) => (
                                <ReasonItem key={index}>{reason}</ReasonItem>
                            ),
                        )}
                    </ReasonsList>
                    <InfoConclusion>{t('whyBecomeSpeaker.conclusion')}</InfoConclusion>
                </InfoSection>
            </Container>

            {showSuccessModal && (
                <ModalOverlay onClick={handleModalClose}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <ModalTitle>{t('successModal.title')}</ModalTitle>
                        <ModalMessage>{t('successModal.message')}</ModalMessage>
                        <ModalFooter>{t('successModal.footer')}</ModalFooter>
                        <Button variant="primary" size="md" onClick={handleModalClose}>
                            {t('successModal.button')}
                        </Button>
                    </ModalContent>
                </ModalOverlay>
            )}
        </PageContainer>
    );
}
