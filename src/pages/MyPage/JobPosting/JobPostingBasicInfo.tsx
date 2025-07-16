import { useEffect, useState } from 'react';
import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { message } from 'antd';
import { FaBriefcase } from 'react-icons/fa';
import EmptyState from '@/components/EmptyState';
import { Controller, FieldErrors, useForm } from 'react-hook-form';
import { JobFormData } from '@/types';
import { ChevronDown } from 'lucide-react';

type LabelProps = {
    required?: boolean;
};

const Container = styled.div`
    width: 100%;
`;

const FormContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;

const FormHeader = styled.h2`
    color: ${themeColors.white};
    font-size: ${themeColors.typography.headings.desktop.h3.fontSize}px;
    font-weight: ${themeColors.typography.headings.desktop.h3.fontWeight};
    margin: 0;
`;

const SubHeader = styled.p`
    color: ${themeColors.gray_text};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    margin-bottom: ${themeColors.spacing.lg};
`;

const FormRow = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${themeColors.spacing.md};
    margin-bottom: ${themeColors.spacing.md};

    @media (min-width: ${themeColors.breakpoints.tablet}) {
        grid-template-columns: 1fr 1fr;
    }
`;

const FormGroup = styled.div`
    margin-bottom: ${themeColors.spacing.md};
`;

const Label = styled.label<LabelProps>`
    display: block;
    color: ${themeColors.white};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    margin-bottom: ${themeColors.spacing.xs};

    &::after {
        content: ${(props) => (props.required ? '" *"' : '""')};
        color: ${themeColors.red_text};
    }
`;

const SelectWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const Select = styled.select`
    width: 100%;
    padding: 10px 14px;
    padding-right: 40px;
    background-color: transparent;
    color: ${themeColors.white};
    border: 1px solid ${themeColors.cardBorder.color};
    border-radius: ${themeColors.radiusSizes.md};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    height: 40px;
    appearance: none;
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: ${themeColors.blue};
        box-shadow: 0 0 0 2px ${themeColors.blue};
    }

    option {
        background-color: ${themeColors.gray_background};
        color: ${themeColors.white};
    }

    &::-webkit-appearance {
        -webkit-appearance: none;
    }

    &::-moz-appearance {
        -moz-appearance: none;
    }
`;

const SelectArrow = styled.div`
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: ${themeColors.gray_text};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TextArea = styled.textarea`
    width: 95%;
    min-height: 200px;
    padding: 16px;
    background-color: transparent;
    color: ${themeColors.white};
    border: 1px solid ${themeColors.cardBorder.color};
    border-radius: ${themeColors.radiusSizes.md};
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    resize: vertical;

    &:focus {
        outline: none;
        border-color: ${themeColors.blue};
        box-shadow: 0 0 0 2px ${themeColors.blue};
    }

    &::placeholder {
        color: ${themeColors.gray_text};
    }
`;

const TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${themeColors.spacing.xs};
    margin-top: ${themeColors.spacing.sm};
`;

const Tag = styled.span`
    background-color: ${themeColors.gray_light};
    color: ${themeColors.white};
    padding: ${themeColors.spacing.xs} ${themeColors.spacing.sm};
    border-radius: ${themeColors.radiusSizes.sm};
    font-size: ${themeColors.typography.body.xsmall.fontSize}px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${themeColors.blue};
    }
`;

const ButtonsRow = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: ${themeColors.spacing.md};
    margin-top: ${themeColors.spacing.xl};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        flex-direction: column;
        gap: ${themeColors.spacing.sm};
        margin-top: ${themeColors.spacing.lg};
    }
`;

const ErrorMessage = styled.span`
    color: ${themeColors.red_text};
    font-size: ${themeColors.typography.body.xsmall.fontSize}px;
    margin-top: ${themeColors.spacing.xs};
    display: block;
`;

const companyTags = [
    'Remote work',
    'Flexible working hours',
    'Flexible start and end times',
    'Code reviews',
    'Shorts/slippers allowed',
    'Casual dress code',
    'Snacks provided',
    'Use of nicknames',
    'Lunch provided',
    'Dinner provided',
    'Self-development budget',
    'Health checkups',
    'Personal development',
    'Break room',
    'Training / Education',
    'Bonuses',
    'Welfare points',
];

const techTags = [
    'Frontend',
    'Backend',
    'Full Stack',
    'Swift (iOS)',
    'Kotlin/Java (Android)',
    'Flutter',
    'React Native',
    'Azure',
    'AWS',
    'Google Cloud',
    'Jenkins',
    'GitHub Actions',
    'Python',
    'Deep Learning',
    'SQL',
    'MongoDB',
    'C++',
    'C#',
    'C',
    'Figma',
    'Adobe XD',
    'Sketch',
];

type JobPostingBasicInfoProps = {
    onNext: (data: JobFormData) => void;
    onFormStateChange?: (isShowingForm: boolean) => void;
};

export default function JobPostingBasicInfo({ onNext, onFormStateChange }: JobPostingBasicInfoProps) {
    const [hasJobs, setHasJobs] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const defaultFormValues: JobFormData = {
        title: '',
        companyName: '',
        location: '',
        contactEmail: '',
        contactPhone: '',
        deadline: '',
        category: '',
        workplaceType: '',
        jobType: '',
        experience: '',
        offerStatus: '',
        salaryRange: '',
        positions: '',
        description: '',
        companyTags: [],
        techTags: [],
    };

    const {
        control,
        handleSubmit: handleFormSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<JobFormData>({
        defaultValues: defaultFormValues,
    });

    useEffect(() => {
        onFormStateChange?.(hasJobs);
    }, [hasJobs, onFormStateChange]);

    const handleStartPosting = () => {
        messageApi.info('Not available now, coming soon !');
        setHasJobs(false);
        // onFormStateChange?.(true);
    };

    const watchedTags = watch(['companyTags', 'techTags']);

    const handleTagClick = (tag: string, type: 'companyTags' | 'techTags') => {
        const currentTags = watch(type);
        const newTags = currentTags.includes(tag) ? currentTags.filter((t) => t !== tag) : [...currentTags, tag];
        setValue(type, newTags);
    };

    const handleSubmit = (data: JobFormData) => {
        onNext(data);
    };

    const scrollToFirstError = (errors: FieldErrors<JobFormData>) => {
        const firstErrorField = Object.keys(errors)[0];
        if (firstErrorField) {
            const element = document.querySelector(`[name="${firstErrorField}"]`);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
                /* focus on the first error field after scrolling */
                setTimeout(() => {
                    if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement) {
                        element.focus();
                    }
                }, 300);
            }
        }
    };

    if (!hasJobs) {
        return (
            <>
                {contextHolder}
                <EmptyState
                    title="No job postings yet"
                    description="Start posting your job opportunities"
                    buttonText="Start Posting"
                    style={{ paddingTop: '160px' }}
                    onButtonClick={handleStartPosting}
                    icon={<FaBriefcase />}
                    showIcon={true}
                    showLogo={false}
                />
            </>
        );
    }

    return (
        <>
            {contextHolder}
            <Container>
                <FormContainer>
                    <FormHeader>Job Posting - Basic Info</FormHeader>
                    <SubHeader>
                        Fill in the basic information about the job posting. This will help candidates understand the
                        role and your company better.
                    </SubHeader>

                    <FormGroup>
                        <Controller
                            name="title"
                            control={control}
                            rules={{ required: 'Job title is required' }}
                            render={({ field }) => (
                                <Input
                                    placeholder="Enter job title"
                                    {...field}
                                    fullWidth
                                    transparent
                                    size="xs"
                                    label="Job title"
                                    error={errors.title?.message}
                                />
                            )}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Controller
                            name="companyName"
                            control={control}
                            rules={{ required: 'Company name is required' }}
                            render={({ field }) => (
                                <Input
                                    placeholder="Enter company name"
                                    {...field}
                                    fullWidth
                                    transparent
                                    size="xs"
                                    label="Company name"
                                    error={errors.companyName?.message}
                                />
                            )}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Controller
                            name="location"
                            control={control}
                            rules={{ required: 'Job location is required' }}
                            render={({ field }) => (
                                <Input
                                    placeholder="Enter job location"
                                    {...field}
                                    fullWidth
                                    transparent
                                    size="xs"
                                    label="Job location"
                                    error={errors.location?.message}
                                />
                            )}
                        />
                    </FormGroup>

                    <FormRow>
                        <FormGroup>
                            <Controller
                                name="contactEmail"
                                control={control}
                                rules={{
                                    required: 'Contact email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Invalid email address',
                                    },
                                }}
                                render={({ field }) => (
                                    <Input
                                        type="email"
                                        placeholder="Enter email"
                                        {...field}
                                        fullWidth
                                        transparent
                                        size="xs"
                                        label="Contact Email"
                                        error={errors.contactEmail?.message}
                                    />
                                )}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Controller
                                name="contactPhone"
                                control={control}
                                rules={{ required: 'Contact phone is required' }}
                                render={({ field }) => (
                                    <Input
                                        type="tel"
                                        placeholder="Enter phone number"
                                        {...field}
                                        fullWidth
                                        transparent
                                        size="xs"
                                        label="Contact Phone"
                                        error={errors.contactPhone?.message}
                                    />
                                )}
                            />
                        </FormGroup>
                    </FormRow>

                    <FormRow>
                        <FormGroup>
                            <Label>Job Deadline</Label>
                            <Controller
                                name="deadline"
                                control={control}
                                render={({ field }) => <Input type="date" {...field} fullWidth transparent size="xs" />}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label required>Job Category</Label>
                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <SelectWrapper>
                                        <Select {...field}>
                                            <option value="">Select</option>
                                            <option value="engineering">Engineering</option>
                                            <option value="design">Design</option>
                                            <option value="product">Product</option>
                                            <option value="marketing">Marketing</option>
                                        </Select>
                                        <SelectArrow>
                                            <ChevronDown size={16} />
                                        </SelectArrow>
                                    </SelectWrapper>
                                )}
                            />
                        </FormGroup>
                    </FormRow>

                    <FormRow>
                        <FormGroup>
                            <Label required>Work place type</Label>
                            <Controller
                                name="workplaceType"
                                control={control}
                                render={({ field }) => (
                                    <SelectWrapper>
                                        <Select {...field}>
                                            <option value="">Select</option>
                                            <option value="remote">Remote</option>
                                            <option value="onsite">On-site</option>
                                            <option value="hybrid">Hybrid</option>
                                        </Select>
                                        <SelectArrow>
                                            <ChevronDown size={16} />
                                        </SelectArrow>
                                    </SelectWrapper>
                                )}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label required>Job type</Label>
                            <Controller
                                name="jobType"
                                control={control}
                                render={({ field }) => (
                                    <SelectWrapper>
                                        <Select {...field}>
                                            <option value="">Select</option>
                                            <option value="fulltime">Full-time</option>
                                            <option value="parttime">Part-time</option>
                                            <option value="contract">Contract</option>
                                            <option value="internship">Internship</option>
                                        </Select>
                                        <SelectArrow>
                                            <ChevronDown size={16} />
                                        </SelectArrow>
                                    </SelectWrapper>
                                )}
                            />
                        </FormGroup>
                    </FormRow>

                    <FormRow>
                        <FormGroup>
                            <Label>Required Experience</Label>
                            <Controller
                                name="experience"
                                control={control}
                                render={({ field }) => (
                                    <SelectWrapper>
                                        <Select {...field}>
                                            <option value="">Select</option>
                                            <option value="entry">Entry Level (0-2 years)</option>
                                            <option value="mid">Mid Level (2-5 years)</option>
                                            <option value="senior">Senior Level (5+ years)</option>
                                        </Select>
                                        <SelectArrow>
                                            <ChevronDown size={16} />
                                        </SelectArrow>
                                    </SelectWrapper>
                                )}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Job Offer Status</Label>
                            <Controller
                                name="offerStatus"
                                control={control}
                                render={({ field }) => (
                                    <SelectWrapper>
                                        <Select {...field}>
                                            <option value="">Select</option>
                                            <option value="open">Open</option>
                                            <option value="closed">Closed</option>
                                            <option value="paused">Paused</option>
                                        </Select>
                                        <SelectArrow>
                                            <ChevronDown size={16} />
                                        </SelectArrow>
                                    </SelectWrapper>
                                )}
                            />
                        </FormGroup>
                    </FormRow>

                    <FormRow>
                        <FormGroup>
                            <Label>Salary Range</Label>
                            <Controller
                                name="salaryRange"
                                control={control}
                                render={({ field }) => (
                                    <SelectWrapper>
                                        <Select {...field}>
                                            <option value="">Select</option>
                                            <option value="0-50k">$0 - $50,000</option>
                                            <option value="50k-100k">$50,000 - $100,000</option>
                                            <option value="100k-150k">$100,000 - $150,000</option>
                                            <option value="150k+">$150,000+</option>
                                        </Select>
                                        <SelectArrow>
                                            <ChevronDown size={16} />
                                        </SelectArrow>
                                    </SelectWrapper>
                                )}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>No. of Positions</Label>
                            <Controller
                                name="positions"
                                control={control}
                                render={({ field }) => (
                                    <SelectWrapper>
                                        <Select {...field}>
                                            <option value="">Select</option>
                                            <option value="1">1</option>
                                            <option value="2-5">2-5</option>
                                            <option value="5-10">5-10</option>
                                            <option value="10+">10+</option>
                                        </Select>
                                        <SelectArrow>
                                            <ChevronDown size={16} />
                                        </SelectArrow>
                                    </SelectWrapper>
                                )}
                            />
                        </FormGroup>
                    </FormRow>

                    <FormGroup>
                        <Label required>Description</Label>
                        <Controller
                            name="description"
                            control={control}
                            rules={{ required: 'Description is required' }}
                            render={({ field }) => (
                                <TextArea placeholder="Enter about your company and job" {...field} />
                            )}
                        />
                        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
                    </FormGroup>

                    <FormGroup>
                        <Label>Company tag (maximum 20)</Label>
                        <TagsContainer>
                            {companyTags.map((tag) => (
                                <Tag
                                    key={tag}
                                    onClick={() => handleTagClick(tag, 'companyTags')}
                                    style={{
                                        backgroundColor: watchedTags[0]?.includes(tag)
                                            ? themeColors.blue
                                            : themeColors.gray_light,
                                    }}
                                >
                                    {tag}
                                </Tag>
                            ))}
                        </TagsContainer>
                    </FormGroup>

                    <FormGroup>
                        <Label>Technologies tag (maximum 10)</Label>
                        <TagsContainer>
                            {techTags.map((tag) => (
                                <Tag
                                    key={tag}
                                    onClick={() => handleTagClick(tag, 'techTags')}
                                    style={{
                                        backgroundColor: watchedTags[1]?.includes(tag)
                                            ? themeColors.blue
                                            : themeColors.gray_light,
                                    }}
                                >
                                    {tag}
                                </Tag>
                            ))}
                        </TagsContainer>
                    </FormGroup>

                    <ButtonsRow>
                        <Button
                            variant="outline"
                            size="md"
                            onClick={handleFormSubmit(handleSubmit, scrollToFirstError)}
                        >
                            Next Step
                        </Button>
                    </ButtonsRow>
                </FormContainer>
            </Container>
        </>
    );
}
