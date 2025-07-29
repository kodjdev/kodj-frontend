import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import Card from '@/components/Card/Card';
import { FaMapMarkerAlt, FaClock, FaBuilding, FaCalendarAlt } from 'react-icons/fa';

export type JobCardProps = {
    id?: string;
    title: string;
    company: string;
    companyLogo?: string;
    location: string;
    jobType: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
    salary?: string;
    deadline?: string;
    description: string;
    postedDate: string;
    skills?: string[];
    isRemote?: boolean;
    isUrgent?: boolean;
    onClick?: () => void;
    className?: string;
};

const JobCardContainer = styled(Card)`
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding: ${themeColors.spacing.md};
    }
`;

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.md};
    margin-bottom: ${themeColors.spacing.sm};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        flex-direction: row;
        gap: ${themeColors.spacing.sm};
    }
`;

const CompanyLogo = styled.div`
    width: 50px;
    height: 50px;
    background-color: ${themeColors.colors.gray.main};
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        width: 40px;
        height: 40px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 6px;
        display: block;
        max-width: 100%;
        max-height: 100%;
    }

    svg {
        color: ${themeColors.colors.gray.text};
        font-size: 16px;
    }
`;

const JobInfo = styled.div`
    flex: 1;
    min-width: 0;
`;

const JobTitle = styled.h3`
    color: ${themeColors.colors.neutral.white};
    font-size: ${themeColors.typography.headings.desktop.h4.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h4.fontWeight};
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.headings.mobile.h4.fontSize}px;
        white-space: nowrap;
        line-height: 1.2;
    }
`;

const CompanyName = styled.p`
    color: ${themeColors.colors.gray.text};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    font-weight: 500;
    margin: 4px 0 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const UrgentBadge = styled.div`
    background: ${themeColors.colors.ui.dimmed};
    color: ${themeColors.colors.status.warning.main};
    padding: ${themeColors.spacing.xs} ${themeColors.spacing.sm};
    border-radius: 8px;
    font-size: ${themeColors.typography.body.xsmall.fontSize}px;
    font-weight: 600;
    flex-shrink: 0;
    margin-left: auto;
`;

const JobMeta = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: ${themeColors.spacing.sm};
    margin-bottom: ${themeColors.spacing.sm};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        gap: ${themeColors.spacing.xs};
    }
`;

const MetaItem = styled.div`
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.xs};
    color: ${themeColors.colors.gray.main};
    font-size: ${themeColors.typography.body.small.fontSize}px;

    svg {
        flex-shrink: 0;
    }

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.body.xsmall.fontSize}px;
    }
`;

const JobTypeTag = styled.span<{ jobType: string }>`
    padding: ${themeColors.spacing.xs} ${themeColors.spacing.sm};
    border-radius: 20px;
    font-size: ${themeColors.typography.body.xsmall.fontSize}px;
    font-weight: 600;
    background-color: ${({ jobType }) => {
        switch (jobType) {
            case 'full-time':
                return themeColors.colors.ui.dimmed;
            case 'part-time':
                return themeColors.colors.ui.navItem;
            case 'contract':
                return themeColors.colors.ui.dimmed;
            case 'freelance':
                return themeColors.colors.ui.dimmed;
            case 'internship':
                return themeColors.colors.ui.dimmed;
            default:
                return themeColors.colors.ui.dimmed;
        }
    }};
    color: ${({ jobType }) => {
        switch (jobType) {
            case 'full-time':
                return themeColors.colors.status.success.button;
            case 'part-time':
                return themeColors.colors.status.info.action;
            case 'contract':
                return themeColors.colors.status.warning.main;
            case 'freelance':
                return themeColors.colors.status.error.text;
            case 'internship':
                return themeColors.colors.status.info.action;
            default:
                return themeColors.colors.neutral.white;
        }
    }};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        font-size: ${themeColors.typography.body.xsmall.fontSize}px;
        padding: ${themeColors.spacing.xs} ${themeColors.spacing.sm};
    }
`;

const SkillsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${themeColors.spacing.xs};
    margin-bottom: ${themeColors.spacing.md};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        margin-bottom: ${themeColors.spacing.sm};
    }
`;

const SkillTag = styled.span`
    background-color: rgba(${themeColors.colors.primary.main}, 0.1);
    color: ${themeColors.colors.primary.main};
    padding: ${themeColors.spacing.xs} ${themeColors.spacing.sm};
    border-radius: 12px;
    font-size: ${themeColors.typography.body.xsmall.fontSize}px;
    font-weight: 500;
`;

const CardFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid ${themeColors.cardBorder.color};
    padding-top: ${themeColors.spacing.md};
    margin-top: ${themeColors.spacing.md};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        padding-top: ${themeColors.spacing.sm};
        margin-top: ${themeColors.spacing.sm};
    }
`;

const FooterRightInfo = styled.div`
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.md};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        flex-direction: column;
        align-items: flex-start;
        gap: ${themeColors.spacing.sm};
    }
`;

const DeadlineInfo = styled.div`
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.xs};
    color: ${themeColors.colors.gray.main};
    font-size: ${themeColors.typography.body.small.fontSize}px;
`;

const PostedDate = styled.div`
    color: ${themeColors.colors.gray.main};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.xs};
`;

const getJobTypeLabel = (jobType: string) => {
    switch (jobType) {
        case 'full-time':
            return 'Full Time';
        case 'part-time':
            return 'Part Time';
        case 'contract':
            return 'Contract';
        case 'freelance':
            return 'Freelance';
        case 'internship':
            return 'Internship';
        default:
            return jobType;
    }
};

/**
 * Organism Component - JobCard
 * Displays job details including title, company, location, job type, salary, description, skills, and posted date.
 * Supports remote and urgent job indicators.
 * @param {JobCardProps} props - Properties for the JobCard component
 */
export default function JobCard({
    title,
    company,
    companyLogo,
    location,
    jobType,
    postedDate,
    deadline,
    skills = [],
    isRemote = false,
    isUrgent = false,
    onClick,
    className,
}: JobCardProps) {
    return (
        <JobCardContainer
            onClick={onClick}
            backgroundColor={themeColors.colors.gray.dark}
            padding={themeColors.spacing.lg}
            hoverEffect={true}
            className={className}
        >
            <CardHeader>
                <CompanyLogo>{companyLogo ? <img src={companyLogo} alt={company} /> : <FaBuilding />}</CompanyLogo>

                <JobInfo>
                    <JobTitle>{title}</JobTitle>
                    <CompanyName>{company}</CompanyName>
                </JobInfo>

                {isUrgent && <UrgentBadge>Urgent</UrgentBadge>}
            </CardHeader>

            <JobMeta>
                <MetaItem>
                    <FaMapMarkerAlt />
                    {isRemote ? 'Remote' : location}
                </MetaItem>

                <JobTypeTag jobType={jobType}>{getJobTypeLabel(jobType)}</JobTypeTag>
            </JobMeta>

            {skills.length > 0 && (
                <SkillsContainer>
                    {skills.slice(0, 4).map((skill, index) => (
                        <SkillTag key={index}>{skill}</SkillTag>
                    ))}
                    {skills.length > 4 && <SkillTag>+{skills.length - 4} more</SkillTag>}
                </SkillsContainer>
            )}

            <CardFooter>
                <PostedDate>
                    <FaClock />
                    {postedDate}
                </PostedDate>

                <FooterRightInfo>
                    {deadline && (
                        <DeadlineInfo>
                            <FaCalendarAlt />~ {deadline}
                        </DeadlineInfo>
                    )}
                </FooterRightInfo>
            </CardFooter>
        </JobCardContainer>
    );
}
