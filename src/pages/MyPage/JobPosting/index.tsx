import { useEffect, useState } from 'react';
import JobPostingBasicInfo from '@/pages/MyPage/JobPosting/JobPostingBasicInfo';
import JobPostingCompanyDetails from '@/pages/MyPage/JobPosting/JobPostingCompanyDetails';
import { JobFormData, JobPostingStep } from '@/types';

type JobPostingProps = {
    onFormStateChange?: (isShowingForm: boolean) => void;
};

export default function JobPosting({ onFormStateChange }: JobPostingProps) {
    const [currentStep, setCurrentStep] = useState<JobPostingStep>(JobPostingStep.BASIC_INFO);
    const [formData, setFormData] = useState<JobFormData | null>(null);
    const [isShowingForm, setIsShowingForm] = useState(false);

    useEffect(() => {
        onFormStateChange?.(isShowingForm);
    }, [isShowingForm, onFormStateChange]);

    const handleBasicInfoNext = (data: JobFormData) => {
        setFormData(data);
        setCurrentStep(JobPostingStep.COMPANY_DETAILS);
    };

    const handleCompanyDetailsBack = () => {
        setCurrentStep(JobPostingStep.BASIC_INFO);
    };

    const handleFinalSubmit = (data: JobFormData) => {
        console.log('Final job posting data:', data);
        /* bu yerda api servicedan foydalanib ma'lumotlarni yuboramiz */
        setCurrentStep(JobPostingStep.BASIC_INFO);
        setFormData(null);
    };

    if (currentStep === JobPostingStep.BASIC_INFO) {
        return <JobPostingBasicInfo onNext={handleBasicInfoNext} onFormStateChange={setIsShowingForm} />;
    }

    if (currentStep === JobPostingStep.COMPANY_DETAILS && formData) {
        return (
            <JobPostingCompanyDetails
                initialData={formData}
                onBack={handleCompanyDetailsBack}
                onSubmit={handleFinalSubmit}
            />
        );
    }

    return <JobPostingBasicInfo onNext={handleBasicInfoNext} />;
}
