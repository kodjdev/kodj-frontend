import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import { ArrowLeft, FileWarning } from 'lucide-react';
import Card from '@/components/Card/Card';
import JobsSidebar from '@/components/JobsSidebar';
import EmptyState from '@/components/EmptyState';
import { message } from 'antd';
import { useStatusHandler } from '@/hooks/useStatusHandler/useStatusHandler';
import ConfirmModal from '@/components/Modal/ModalTypes/ConfirmModal';
import { useTranslation } from 'react-i18next';
import useApiService from '@/services';
import { JobPost } from '@/services/api/types/jobs';
import { formatDateReadable, formatJobOfferStatus } from '@/utils/jobsHelper';

const Container = styled.div`
    max-width: ${themeColors.breakpoints.desktop};
    margin: 0 auto;
    background-color: ${themeColors.colors.neutral.black};
    min-height: 100vh;
    padding: 0 ${themeColors.spacing.md};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: 0;
    }
`;

const BackLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    color: ${themeColors.colors.gray.main};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
        color: ${themeColors.colors.primary.main};
    }

    svg {
        margin-right: ${themeColors.spacing.xs};
    }
`;

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: ${themeColors.spacing.lg};
    align-items: start;
    margin-top: ${themeColors.spacing.lg};

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        grid-template-columns: 1fr;
        gap: ${themeColors.spacing.md};
        margin-top: ${themeColors.spacing.md};
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        gap: ${themeColors.spacing.md};
        margin-top: ${themeColors.spacing.sm};
    }
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${themeColors.spacing.xl};
    width: 100%;
    min-width: 0;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        gap: ${themeColors.spacing.md};
    }
`;

const JobHeader = styled.div`
    margin-bottom: ${themeColors.spacing.lg};
`;

const JobTitle = styled.h1`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.headings.desktop.h1.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h1.fontWeight};
    margin-bottom: ${themeColors.spacing.sm};
    margin-top: 10px;
    line-height: 1.2;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.headings.mobile.h1.fontSize}px;
    }
`;

const JobMeta = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${themeColors.spacing.md};
    color: ${themeColors.colors.gray.text};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    margin-bottom: ${themeColors.spacing.md};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        flex-direction: column;
        gap: ${themeColors.spacing.sm};
    }
`;

const MetaItem = styled.span`
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.xs};

    &:not(:last-child)::after {
        content: '•';
        margin-left: ${themeColors.spacing.md};
        color: ${themeColors.colors.gray.main};
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        &:not(:last-child)::after {
            display: none;
        }
    }
`;

const SkillsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${themeColors.spacing.sm};
    margin-top: ${themeColors.spacing.md};
`;

const SkillTag = styled.span`
    background-color: ${themeColors.colors.primary.main}20;
    color: ${themeColors.colors.primary.main};
    padding: ${themeColors.spacing.xs} ${themeColors.spacing.sm};
    border-radius: 4px;
    font-size: ${themeColors.typography.body.small.fontSize}px;
    font-weight: ${themeColors.typography.body.small.fontSize}px;
`;

const SectionContent = styled.div`
    color: ${themeColors.colors.gray.text};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    line-height: 1.6;
    word-wrap: break-word;
    overflow-wrap: break-word;

    p {
        margin-bottom: ${themeColors.spacing.sm};
        white-space: pre-line;
        word-wrap: break-word;
    }

    ul {
        padding-left: ${themeColors.spacing.lg};
        margin-bottom: ${themeColors.spacing.md};
    }

    li {
        margin-bottom: ${themeColors.spacing.sm};
        color: ${themeColors.colors.gray.text};
        word-wrap: break-word;
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.body.small.fontSize}px;

        ul {
            padding-left: ${themeColors.spacing.md};
        }
    }
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    color: ${themeColors.colors.gray.text};
    font-size: ${themeColors.typography.body.large.fontSize}px;
`;

const StatusBadge = styled.span<{ status: string }>`
    padding: ${themeColors.spacing.xs} ${themeColors.spacing.sm};
    border-radius: 4px;
    font-size: ${themeColors.typography.body.small.fontSize}px;
    font-weight: 500;
    text-transform: uppercase;

    ${({ status }) => {
        switch (status) {
            case 'OPEN':
                return `
                    background-color: ${themeColors.colors.ui.dimmed};
                    color: ${themeColors.colors.status.success.button};
                `;
            case 'CLOSED':
                return `
                    background-color: ${themeColors.colors.status.error}20;
                    color: ${themeColors.colors.status.error};
                `;
            case 'FILLED':
                return `
                    background-color: ${themeColors.colors.gray.main}20;
                    color: ${themeColors.colors.gray.main};
                `;
            default:
                return `
                    background-color: ${themeColors.colors.primary.main}20;
                    color: ${themeColors.colors.primary.main};
                `;
        }
    }}
`;

const EmptyStateContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    text-align: center;
    color: ${themeColors.colors.gray.text};
`;

const ContactValue = styled.a`
    color: ${themeColors.colors.primary.main};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
        color: ${themeColors.colors.primary.dark};
    }
`;

const ContactItem = styled.p`
    margin: ${themeColors.spacing.sm} 0;
    color: ${themeColors.colors.gray.text};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    line-height: 1.5;

    strong {
        color: ${themeColors.colors.neutral.white};
    }
`;

/**
 * JobDetailsPage - Page Component
 * @description - This component fetches and displays detailed
 * information about a specific job posting. It includes job title,
 * company info, description, requirements, technologies, benefits,
 * and contact information.
 */
export default function JobDetailsPage() {
    const { jobId } = useParams<{ jobId: string }>();
    const navigate = useNavigate();
    const jobsDetailsApiService = useApiService();

    const { t } = useTranslation('jobs');

    const [messageApi, contextHolder] = message.useMessage();
    const { handleAsyncOperation } = useStatusHandler(messageApi);

    const [jobData, setJobData] = useState<JobPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isApplied, setIsApplied] = useState(false);
    const [showContinueModal, setShowContinueModal] = useState(false);

    useEffect(() => {
        const fetchJobDetails = async () => {
            if (!jobId) {
                setError('Job ID not provided');
                setLoading(false);
                return;
            }

            const { data, error: apiError } = await handleAsyncOperation(
                async () => {
                    const response = await jobsDetailsApiService.getJobById(parseInt(jobId));

                    if (response.statusCode === 200) {
                        return response.data;
                    } else {
                        throw new Error(response.message || 'Failed to fetch job details');
                    }
                },
                {
                    loadingMessage: 'Loading job details...',
                    errorMessage: 'Failed to load job details. Please try again.',
                    showLoading: true,
                    showSuccess: false,
                    showError: true,
                    onSuccess: undefined,
                    onError: undefined,
                },
            );

            if (data) {
                setJobData(data);
                setError(null);
            }

            if (apiError) {
                setError(apiError.message);
                setJobData(null);
            }

            setLoading(false);
        };

        fetchJobDetails();
    }, [jobId, handleAsyncOperation]);

    const handleApply = () => {
        setShowContinueModal(true);
    };

    const handleContinueToApplication = () => {
        if (jobData?.linkedinProfile) {
            window.open(jobData.linkedinProfile, '_blank');
        } else {
            messageApi.warning(t('jobDetails.messages.noContactInfo'));
        }
        setShowContinueModal(false);
        setIsApplied(true);
    };

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        messageApi.info(t('jobDetails.messages.bookmarkSoon'));
    };

    const handleBack = () => {
        navigate('/jobs');
    };

    if (loading) {
        return (
            <Container>
                <LoadingContainer>{t('jobDetails.loading')}</LoadingContainer>
            </Container>
        );
    }

    if (error || !jobData) {
        return (
            <EmptyStateContainer>
                <EmptyState
                    title={t('jobDetails.error.title')}
                    description={error || t('jobDetails.error.description')}
                    buttonText={t('jobDetails.error.backToJobs')}
                    buttonVariant="outline"
                    buttonSize="mini"
                    onButtonClick={handleBack}
                    icon={<FileWarning size={48} />}
                    showLogo={false}
                    showIcon={true}
                    buttonAsLink={false}
                    buttonTo="/jobs"
                />
            </EmptyStateContainer>
        );
    }

    return (
        <>
            {contextHolder}
            <Container>
                <BackLink to={'/jobs'}>
                    <ArrowLeft size={16} /> {t('jobDetails.backToJobs')}
                </BackLink>

                <ContentWrapper>
                    <MainContent>
                        <JobHeader>
                            <JobTitle>{jobData.title}</JobTitle>
                            <JobMeta>
                                <MetaItem>{jobData.companyName}</MetaItem>
                                <MetaItem>{jobData.placeOfWork}</MetaItem>
                                <MetaItem>
                                    {t('jobDetails.posted')}: {formatDateReadable(jobData.createdAt)}
                                </MetaItem>
                                <MetaItem>
                                    <StatusBadge status={jobData?.jobOfferStatus || 'OPEN'}>
                                        {formatJobOfferStatus(jobData?.jobOfferStatus || 'OPEN')}
                                    </StatusBadge>
                                </MetaItem>
                            </JobMeta>
                            {jobData.technologies && jobData.technologies.length > 0 && (
                                <SkillsContainer>
                                    {jobData.technologies.split(',').map((skill: string, index: number) => (
                                        <SkillTag key={index}>{skill.trim()}</SkillTag>
                                    ))}
                                </SkillsContainer>
                            )}
                        </JobHeader>
                        <Card
                            title={t('jobDetails.sections.jobDescription')}
                            backgroundColor={themeColors.colors.gray.dark}
                            responsivePadding={true}
                        >
                            <SectionContent>
                                <p>{jobData.content}</p>
                            </SectionContent>
                        </Card>
                        {jobData.requiredExperience && jobData.requiredExperience.length > 0 && (
                            <Card
                                title={t('jobDetails.sections.requirements')}
                                backgroundColor={themeColors.colors.gray.dark}
                                responsivePadding={true}
                            >
                                <SectionContent>
                                    <ul>
                                        {jobData.requiredExperience
                                            .split('\n')
                                            .filter(Boolean)
                                            .map((req: string, index: number) => (
                                                <li key={index}>{req.trim()}</li>
                                            ))}
                                    </ul>
                                </SectionContent>
                            </Card>
                        )}
                        {jobData.technologies && (
                            <Card
                                title={t('jobDetails.sections.technologies')}
                                backgroundColor={themeColors.colors.gray.dark}
                                responsivePadding={true}
                            >
                                <SectionContent>
                                    <p>{jobData.technologies}</p>
                                </SectionContent>
                            </Card>
                        )}
                        {jobData.jobBenefits && jobData.jobBenefits.length > 0 && (
                            <Card
                                title={t('jobDetails.sections.benefits')}
                                backgroundColor={themeColors.colors.gray.dark}
                                responsivePadding={true}
                            >
                                <SectionContent>
                                    <ul>
                                        {jobData.jobBenefits
                                            .split('\n')
                                            .filter(Boolean)
                                            .map((benefit: string, index: number) => (
                                                <li key={index}>{benefit.trim()}</li>
                                            ))}
                                    </ul>
                                </SectionContent>
                            </Card>
                        )}
                        <Card
                            title={t('jobDetails.sections.aboutCompany')}
                            backgroundColor={themeColors.colors.gray.dark}
                            responsivePadding={true}
                        >
                            <SectionContent>
                                <p>
                                    {jobData.content ||
                                        t('jobDetails.sections.companyDescription', { company: jobData.companyName })}
                                </p>
                                {jobData.user && (
                                    <div style={{ marginTop: themeColors.spacing.lg }}>
                                        <p>
                                            <strong>{t('jobDetails.postedBy')}:</strong>
                                            {jobData.user.firstName
                                                ? jobData.user.firstName + jobData.user.lastName
                                                : ` ${t('jobDetails.unknown')}`}
                                        </p>
                                        {jobData.user.bio && (
                                            <p>
                                                <strong>{t('jobDetails.bio')}:</strong> {jobData.user.bio}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </SectionContent>
                        </Card>
                        {jobData.contactPhone && (
                            <Card
                                title={t('jobDetails.sections.contactInfo')}
                                backgroundColor={themeColors.colors.gray.dark}
                                padding={themeColors.spacing.lg}
                                responsivePadding={true}
                            >
                                <SectionContent>
                                    <ContactItem>
                                        <span>{t('jobDetails.contact.phone')}: </span>
                                        <ContactValue
                                            href={`tel:${jobData.contactPhone}`}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            {jobData.contactPhone}
                                        </ContactValue>
                                    </ContactItem>
                                    <ContactItem>
                                        <span>{t('jobDetails.contact.email')}: </span>
                                        <ContactValue
                                            href={`mailto:${jobData.contactEmail}`}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            {jobData.contactEmail || t('jobDetails.contact.notProvided')}
                                        </ContactValue>
                                    </ContactItem>
                                    {jobData.linkedinProfile && (
                                        <ContactItem>
                                            <span>{t('jobDetails.contact.website')}: </span>{' '}
                                            <a href={jobData.linkedinProfile} target="_blank" rel="noopener noreferrer">
                                                {jobData.linkedinProfile}
                                            </a>
                                        </ContactItem>
                                    )}
                                </SectionContent>
                            </Card>
                        )}
                    </MainContent>

                    <JobsSidebar
                        jobData={jobData}
                        onApply={handleApply}
                        onBookmark={handleBookmark}
                        isBookmarked={isBookmarked}
                        isApplied={isApplied}
                    />
                </ContentWrapper>
            </Container>
            {showContinueModal && (
                <ConfirmModal
                    isOpen={showContinueModal}
                    onClose={() => setShowContinueModal(false)}
                    onConfirm={handleContinueToApplication}
                    title={t('jobDetails.modal.title')}
                    mainMessage={t('jobDetails.modal.message')}
                    confirmLabel={t('jobDetails.modal.continue')}
                    cancelLabel={t('jobDetails.modal.cancel')}
                    confirmVariant="primary"
                    size="md"
                />
            )}
        </>
    );
}
