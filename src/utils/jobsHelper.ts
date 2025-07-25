import { JobCardProps } from '@/components/Card/JobsCard';
import { JobOfferStatus, JobPost, JobType } from '@/services/api/types/jobs';

/**
 * Format job type for display
 */
export const formatJobType = (jobType: JobType): string => {
    const jobTypeMap = {
        FULL_TIME: 'Full Time',
        PART_TIME: 'Part Time',
        CONTRACT: 'Contract',
        INTERNSHIP: 'Internship',
    };
    return jobTypeMap[jobType] || jobType;
};

/**
 * Format job type for JobCard component (kebab-case)
 */
const formatJobTypeForCard = (type: JobType): JobCardProps['jobType'] => {
    const formattedType = type.toLowerCase().replace('_', '-');
    if (!['full-time', 'part-time', 'contract', 'freelance', 'internship'].includes(formattedType)) {
        return 'full-time';
    }
    return formattedType as JobCardProps['jobType'];
};

/**
 * Format job offer status for display
 */
export const formatJobOfferStatus = (status: JobOfferStatus): string => {
    const statusMap = {
        OPEN: 'Open',
        CLOSED: 'Closed',
        FILLED: 'Filled',
        PENDING: 'Pending',
    };
    return statusMap[status] || status;
};

/**
 * Format date for readable display - sample: July 23, 2025
 */
export const formatDateReadable = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

/**
 * Format date for relative time display -  sample: 2 days ago
 */
export const formatDateRelative = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} week${Math.ceil(diffDays / 7) > 1 ? 's' : ''} ago`;
    return `${Math.ceil(diffDays / 30)} month${Math.ceil(diffDays / 30) > 1 ? 's' : ''} ago`;
};

/**
 * Calculate Deadline as 3 months from creation date
 */
export const calculateDeadline = (createdAt: string): string => {
    const createdDate = new Date(createdAt);
    const deadlineDate = new Date(createdDate);
    deadlineDate.setMonth(deadlineDate.getMonth() + 3);
    return formatDateReadable(deadlineDate.toISOString());
};

/**
 * Extract skills from technologies string
 */
export const extractSkills = (technologies: string): string[] => {
    if (!technologies) return [];
    return technologies
        .split(',')
        .map((tech) => tech.trim())
        .filter(Boolean);
};

/**
 * Transform API job post to JobCard props
 */
export const transformJobPostToCardProps = (job: JobPost): JobCardProps => {
    const jobDeadline = job.createdAt ? calculateDeadline(job.createdAt) : 'No deadline set';

    return {
        id: job.id.toString(),
        title: job.title || 'Untitled Position',
        company: job.companyName || 'Company Name',
        companyLogo: job.imageURL,
        location: job.placeOfWork || 'Seoul, South Korea',
        jobType: formatJobTypeForCard(job.jobType),
        salary: job.salaryRange ? `₩${job.salaryRange}` : undefined,
        description: job.content || 'No description available',
        postedDate: formatDateRelative(job.createdAt),
        skills: extractSkills(job.technologies),
        isRemote: job.remote || false,
        isUrgent: job.jobOfferStatus === 'OPEN',
        deadline: jobDeadline,
    };
};

/**
 * Transform job post for job details page
 */
export const transformJobPostForDetails = (job: JobPost) => {
    return {
        ...transformJobPostToCardProps(job),
        fullDescription: job.content,
        requirements: job.requiredExperience ? job.requiredExperience.split('\n').filter(Boolean) : [],
        responsibilities: [],
        benefits: job.jobBenefits ? job.jobBenefits.split('\n').filter(Boolean) : [],
        companyDescription: `Learn more about ${job.companyName}`,
        companyPhone: job.contactPhone,
        companyEmail: job.contactEmail,
        companyUrl: job.linkedinProfile || job.facebookProfile || job.twitterProfile,
        category: job.category,
        technologies: job.technologies,
        user: job.user,
    };
};
