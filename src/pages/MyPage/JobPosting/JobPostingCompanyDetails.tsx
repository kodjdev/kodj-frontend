import { useState } from 'react';
import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { message } from 'antd';
import { JobFormData } from '@/types';

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
    margin-top: 0;
    margin-bottom: ${themeColors.spacing.xl};
`;

const FormGroup = styled.div`
    margin-bottom: ${themeColors.spacing.lg};
`;

const Label = styled.label`
    display: block;
    color: ${themeColors.white};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    margin-bottom: ${themeColors.spacing.sm};

    &::after {
        content: ' *';
        color: ${themeColors.red_text};
    }
`;

const UploadContainer = styled.div`
    width: 120px;
    height: 120px;
    background-color: transparent;
    border: 1px solid ${themeColors.cardBorder.color};
    border-radius: ${themeColors.radiusSizes.md};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    transition: border-color 0.2s;

    &:hover {
        border-color: ${themeColors.blue};
    }
`;

const UploadIcon = styled.div`
    font-size: 32px;
    color: ${themeColors.gray_text};
    margin-bottom: 8px;
`;

const UploadText = styled.span`
    font-size: ${themeColors.typography.body.xsmall.fontSize}px;
    color: ${themeColors.gray_text};
    text-align: center;
`;

const GuideText = styled.div`
    margin-top: ${themeColors.spacing.xs};
    font-size: ${themeColors.typography.body.xsmall.fontSize}px;
    color: ${themeColors.gray_text};
    line-height: 1.4;
`;

const PicturesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: ${themeColors.spacing.md};

    @media (max-width: ${themeColors.breakpoints.tablet}) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const PictureUpload = styled.div`
    aspect-ratio: 1;
    background-color: transparent;
    border: 1px solid ${themeColors.cardBorder.color};
    border-radius: ${themeColors.radiusSizes.md};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    transition: border-color 0.2s;

    &:hover {
        border-color: ${themeColors.blue};
    }
`;

const PictureIcon = styled.div`
    font-size: 24px;
    color: ${themeColors.gray_text};
    margin-bottom: 4px;
`;

const SocialContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${themeColors.spacing.md};
`;

const SocialRow = styled.div`
    display: flex;
    align-items: center;
    gap: ${themeColors.spacing.sm};
`;

const SocialIcon = styled.div`
    font-size: 20px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const SocialName = styled.span`
    color: ${themeColors.white};
    min-width: 80px;
    font-size: ${themeColors.typography.body.small.fontSize}px;
`;

const SocialInputWrapper = styled.div`
    flex: 1;
`;

const RemoveButton = styled.button`
    background: none;
    border: none;
    color: ${themeColors.gray_text};
    font-size: 16px;
    cursor: pointer;
    padding: 4px;

    &:hover {
        color: ${themeColors.red_text};
    }
`;

const ButtonsRow = styled.div`
    display: flex;
    justify-content: space-between;
    gap: ${themeColors.spacing.md};
    margin-top: ${themeColors.spacing.xl};

    @media (max-width: ${themeColors.breakpoints.mobile}) {
        flex-direction: column;
    }
`;

const AddButton = styled.button`
    background: transparent;
    border: 1px solid ${themeColors.blue};
    color: ${themeColors.blue};
    padding: 8px 16px;
    border-radius: ${themeColors.radiusSizes.sm};
    font-size: ${themeColors.typography.body.small.fontSize}px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: ${themeColors.blue};
        color: ${themeColors.white};
    }
`;

type JobPostingCompanyDetailsProps = {
    initialData: JobFormData;
    onBack: () => void;
    onSubmit: (data: JobFormData) => void;
};

const socialAccountOptions = [
    {
        icon: '💼',
        name: 'LinkedIn',
        placeholder: 'http://www.linkedin.com/in/oybekholikov/',
        value: '',
        required: true,
    },
    { icon: '📷', name: 'Instagram', placeholder: '@oybekuxer', value: '', required: false },
    { icon: '🐦', name: 'Twitter', placeholder: 'Enter username', value: '', required: false },
    { icon: '👤', name: 'Facebook', placeholder: 'Enter username', value: '', required: false },
];

export default function JobPostingCompanyDetails({ initialData, onBack, onSubmit }: JobPostingCompanyDetailsProps) {
    const [messageApi, contextHolder] = message.useMessage();
    const [formData] = useState<JobFormData>(initialData);
    const [socialAccounts, setSocialAccounts] = useState(socialAccountOptions);

    const handleSocialInputChange = (index: number, value: string) => {
        const updated = [...socialAccounts];
        updated[index].value = value;
        setSocialAccounts(updated);
    };

    const removeSocialAccount = (index: number) => {
        if (!socialAccounts[index].required) {
            const updated = socialAccounts.filter((_, i) => i !== index);
            setSocialAccounts(updated);
        }
    };

    const addSocialAccount = () => {
        setSocialAccounts([
            ...socialAccounts,
            { icon: '🔗', name: 'Other', placeholder: 'Enter URL or username', value: '', required: false },
        ]);
    };

    const handleSubmit = () => {
        const linkedinAccount = socialAccounts.find((acc) => acc.name === 'LinkedIn');
        if (!linkedinAccount?.value) {
            messageApi.error('LinkedIn URL is required');
            return;
        }

        const socialData = {
            linkedin: socialAccounts.find((acc) => acc.name === 'LinkedIn')?.value || '',
            instagram: socialAccounts.find((acc) => acc.name === 'Instagram')?.value || '',
            twitter: socialAccounts.find((acc) => acc.name === 'Twitter')?.value || '',
            facebook: socialAccounts.find((acc) => acc.name === 'Facebook')?.value || '',
        };

        const finalData = {
            ...formData,
            socialAccounts: socialData,
        };

        onSubmit(finalData);
        messageApi.success('Job posting created successfully!');
    };

    const handlePreview = () => {
        messageApi.info('Preview functionality coming soon!');
    };

    return (
        <>
            {contextHolder}
            <Container>
                <FormContainer>
                    <FormHeader>Job posting - Company Details</FormHeader>

                    <FormGroup>
                        <Label>Company logo</Label>
                        <UploadContainer>
                            <UploadIcon>📷</UploadIcon>
                            <UploadText>Upload picture</UploadText>
                        </UploadContainer>
                        <GuideText>
                            • Recommended upload guide: 600px width, 600px height / under 5MB
                            <br />• Allowed file formats: jpg, png, jpeg
                        </GuideText>
                    </FormGroup>

                    <FormGroup>
                        <Label>Company picture (required 1)</Label>
                        <PicturesGrid>
                            {[1, 2, 3, 4].map((i) => (
                                <PictureUpload key={i}>
                                    <PictureIcon>📷</PictureIcon>
                                    <UploadText>Upload picture</UploadText>
                                </PictureUpload>
                            ))}
                        </PicturesGrid>
                        <GuideText>
                            • Recommended upload guide: 1080px width, 607px height (16:9) / under 5MB
                            <br />• Allowed file formats: jpg, png, jpeg
                        </GuideText>
                    </FormGroup>

                    <FormGroup>
                        <Label>Social accounts (LinkedIn URL is required; others are optional)</Label>
                        <SocialContainer>
                            {socialAccounts.map((social, index) => (
                                <SocialRow key={index}>
                                    <SocialIcon>{social.icon}</SocialIcon>
                                    <SocialName>{social.name}</SocialName>
                                    <SocialInputWrapper>
                                        <Input
                                            placeholder={social.placeholder}
                                            value={social.value}
                                            onChange={(e) => handleSocialInputChange(index, e.target.value)}
                                            fullWidth
                                            transparent
                                            size="xs"
                                        />
                                    </SocialInputWrapper>
                                    {!social.required && (
                                        <RemoveButton onClick={() => removeSocialAccount(index)}>✕</RemoveButton>
                                    )}
                                </SocialRow>
                            ))}
                            <div>
                                <AddButton onClick={addSocialAccount}>+ Add another social account</AddButton>
                            </div>
                        </SocialContainer>
                    </FormGroup>

                    <ButtonsRow>
                        <Button variant="outline" size="md" onClick={onBack}>
                            Back
                        </Button>
                        <div style={{ display: 'flex', gap: themeColors.spacing.md }}>
                            <Button variant="outline" size="md" onClick={handlePreview}>
                                Preview
                            </Button>
                            <Button
                                variant="primary"
                                size="md"
                                onClick={handleSubmit}
                                style={{
                                    borderRadius: themeColors.radiusSizes.xl,
                                }}
                            >
                                Submit
                            </Button>
                        </div>
                    </ButtonsRow>
                </FormContainer>
            </Container>
        </>
    );
}
