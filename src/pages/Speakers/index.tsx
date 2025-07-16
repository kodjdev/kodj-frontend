import { FormProvider, useForm } from 'react-hook-form';
import { SpeakerRegistration } from '@/types';

export default function SpeakerRegistrationForm() {
    const methods = useForm<SpeakerRegistration>({
        defaultValues: {
            fullname: '',
            email: '',
            phone: '',
            jobPosition: '',
            topics: '',
            expertiseField: '',
            linkedinUrl: '',
            githubUrl: '',
            portfolioUrl: '',
        },
    });

    return (
        <FormProvider {...methods}>
            <div>
                <form>
                    <p>Will be updated soon. Please check back later or contact us for more information.</p>
                </form>
            </div>
        </FormProvider>
    );
}
