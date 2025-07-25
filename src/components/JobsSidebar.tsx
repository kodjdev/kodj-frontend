import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import Card from '@/components/Card/Card';
import Button from '@/components/Button/Button';
import { Bookmark, BookMarkedIcon } from 'lucide-react';
import { JobPost } from '@/services/api/types/jobs';
import { calculateDeadline, formatDateReadable, formatJobOfferStatus, formatJobType } from '@/utils/jobsHelper';

type JobApplicationSidebarProps = {
    jobData: JobPost;
    onApply?: () => void;
    onBookmark?: () => void;
    isBookmarked?: boolean;
    isApplied?: boolean;
};

const SidebarWrapper = styled.div`
    position: sticky;
    top: 100px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: ${themeColors.spacing.lg};

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        position: static;
        top: auto;
    }
`;

const JobInfoSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${themeColors.spacing.xs};
`;

const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: ${themeColors.spacing.sm} 0;

    &:last-child {
        border-bottom: none;
    }
`;

const InfoLabel = styled.span`
    color: ${themeColors.colors.gray.text};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    font-weight: ${themeColors.typography.presets.font14.fontSize}px;
    min-width: 80px;
`;

const InfoValue = styled.span`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    font-weight: ${themeColors.typography.presets.font14.fontWeight}px;
    text-align: right;
    flex: 1;
`;

const TagContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${themeColors.spacing.sm};
    justify-content: space-between;
    align-items: center;
    padding: ${themeColors.spacing.sm} 0;
`;

const Tag = styled.span<{ variant?: 'urgent' | 'remote' | 'type' }>`
    padding: ${themeColors.spacing.xs} ${themeColors.spacing.sm};
    border-radius: 4px;
    font-size: ${themeColors.typography.body.small.fontSize - 2}px;
    font-weight: 500;
    text-transform: capitalize;
    letter-spacing: 0.3px;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    line-height: 1;

    ${({ variant }) => {
        switch (variant) {
            case 'urgent':
                return `
                    background-color: ${themeColors.colors.status.error}15;
                    color: ${themeColors.colors.status.error};
                    border: 1px solid ${themeColors.colors.status.error}30;
                `;
            case 'remote':
                return `
                    background-color: ${themeColors.colors.primary.main}15;
                    color: ${themeColors.colors.primary.main};
                    border: 1px solid ${themeColors.colors.primary.main}30;
                `;
            case 'type':
            default:
                return `
                    background-color: ${themeColors.colors.ui.dimmed};
                    color: ${themeColors.colors.status.success.button};
                    border: 1px solid ${themeColors.colors.status.success.button}30;
                `;
        }
    }}
`;

const ActionButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: ${themeColors.spacing.md};
    justify-content: space-between;
    margin-top: ${themeColors.spacing.lg};
    padding-top: ${themeColors.spacing.lg};
    border-top: 1px solid ${themeColors.cardBorder.color};
`;

/**
 * JobsSidebar - Molecule component for displaying job application details in a sidebar.
 * @param {Object} props - Component properties.
 * @param {Object} props.jobData - Job data containing details like company, location, salary, etc.
 * @param {Function} props.onApply - Callback function to handle job application.
 * @param {Function} props.onBookmark - Callback function to handle bookmarking the job.
 * @param {boolean} [props.isBookmarked=false] - Indicates if the job is bookmarked.
 * @param {boolean} [props.isApplied=false] - Indicates if the job application has been submitted.
 */
export default function JobsSidebar({
    jobData,
    onApply,
    onBookmark,
    isBookmarked = false,
    isApplied = false,
}: JobApplicationSidebarProps) {
    const formatSalary = (salary?: string) => {
        if (!salary) return 'Not specified';
        return salary.includes('₩') ? salary : `₩${salary}`;
    };

    return (
        <SidebarWrapper>
            <Card
                title="Job Information"
                backgroundColor={themeColors.colors.gray.dark}
                padding={themeColors.spacing.lg}
            >
                <JobInfoSection>
                    <InfoRow>
                        <InfoLabel>Company:</InfoLabel>
                        <InfoValue>{jobData.companyName}</InfoValue>
                    </InfoRow>

                    <InfoRow>
                        <InfoLabel>Location:</InfoLabel>
                        <InfoValue>{jobData.placeOfWork}</InfoValue>
                    </InfoRow>

                    <InfoRow>
                        <InfoLabel>Salary:</InfoLabel>
                        <InfoValue>{formatSalary(jobData.salaryRange)}</InfoValue>
                    </InfoRow>

                    <InfoRow>
                        <InfoLabel>Type:</InfoLabel>
                        <InfoValue>{formatJobType(jobData.jobType)}</InfoValue>
                    </InfoRow>

                    {jobData.createdAt && (
                        <InfoRow>
                            <InfoLabel>Deadline:</InfoLabel>
                            <InfoValue>{calculateDeadline(jobData.createdAt)}</InfoValue>
                        </InfoRow>
                    )}

                    <InfoRow>
                        <InfoLabel>Posted:</InfoLabel>
                        <InfoValue>{formatDateReadable(jobData.createdAt)}</InfoValue>
                    </InfoRow>
                </JobInfoSection>

                <TagContainer>
                    <Tag variant="type">{formatJobType(jobData.jobType)}</Tag>
                    {jobData.remote && <Tag variant="remote">Remote</Tag>}
                    {jobData.jobOfferStatus === 'OPEN' && (
                        <Tag variant="urgent">{formatJobOfferStatus(jobData.jobOfferStatus)}</Tag>
                    )}
                </TagContainer>

                <ActionButtonsContainer>
                    <Button
                        variant={isBookmarked ? 'secondary' : 'outline'}
                        size="md"
                        onClick={onBookmark}
                        style={{ flexShrink: 0 }}
                    >
                        {isBookmarked ? <BookMarkedIcon /> : <Bookmark />}
                    </Button>
                    {isApplied ? (
                        <Button variant="light" size="md" onClick={onApply} fullWidth={true} disabled>
                            Submitted
                        </Button>
                    ) : (
                        <Button variant="primary" size="md" onClick={onApply} fullWidth>
                            Apply Now
                        </Button>
                    )}
                </ActionButtonsContainer>
            </Card>
        </SidebarWrapper>
    );
}
