import styled from 'styled-components';
import themeColors from '@/tools/themeColors';
import useAuth from '@/context/useAuth';

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding-bottom: ${themeColors.spacing.xxl};
`;

const ProfileHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: ${themeColors.spacing.xl};
`;

const ProfileImage = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: ${themeColors.colors.gray.background};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${themeColors.spacing.lg};
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const ProfileInfo = styled.div`
    flex: 1;
`;

const ProfileName = styled.h1`
    font-size: ${themeColors.typography.headings.desktop.h2.fontSize}px;
    color: ${themeColors.colors.neutral.white};
    margin: 0 0 ${themeColors.spacing.sm} 0;
`;

const ProfileEmail = styled.p`
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    color: ${themeColors.colors.gray.main};
    margin: 0;
`;

const ProfileSection = styled.div`
    margin-bottom: ${themeColors.spacing.xl};
`;

const SectionTitle = styled.h2`
    font-size: ${themeColors.typography.headings.desktop.h4.fontSize}px;
    color: ${themeColors.colors.neutral.white};
    margin: 0 0 ${themeColors.spacing.md} 0;
    border-bottom: 1px solid ${themeColors.cardBorder.color};
    padding-bottom: ${themeColors.spacing.sm};
`;

const InfoItem = styled.div`
    margin-bottom: ${themeColors.spacing.md};
`;

const InfoLabel = styled.div`
    font-size: ${themeColors.typography.body.small.fontSize}px;
    color: ${themeColors.colors.gray.label};
    margin-bottom: ${themeColors.spacing.xs};
`;

const InfoValue = styled.div`
    font-size: ${themeColors.typography.body.medium.fontSize}px;
    color: ${themeColors.colors.neutral.white};
`;

export default function AccountDetails() {
    const { user } = useAuth();
    const isLoading = false;

    if (isLoading || !user) {
        return (
            <Container>
                <div>Loading user profile...</div>
            </Container>
        );
    }

    return (
        <Container>
            <ProfileHeader>
                <ProfileImage>
                    {user.data.imageUrl ? (
                        <img src={user.data.imageUrl} alt={`${user.data.firstName} ${user.data.lastName}`} />
                    ) : (
                        <span>
                            {user.data.firstName?.charAt(0) || ''}
                            {user.data.lastName?.charAt(0) || ''}
                        </span>
                    )}
                </ProfileImage>
                <ProfileInfo>
                    <ProfileName>
                        {user.data.firstName} {user.data.lastName}
                    </ProfileName>
                    <ProfileEmail>{user.data.email}</ProfileEmail>
                </ProfileInfo>
            </ProfileHeader>

            <ProfileSection>
                <SectionTitle>Personal Information</SectionTitle>
                <InfoItem>
                    <InfoLabel>Username</InfoLabel>
                    <InfoValue>{user.data.username || 'Not set'}</InfoValue>
                </InfoItem>
                <InfoItem>
                    <InfoLabel>Member Since</InfoLabel>
                    <InfoValue>{new Date(user.data.createdAt).toLocaleDateString()}</InfoValue>
                </InfoItem>
                {user.data.region && (
                    <InfoItem>
                        <InfoLabel>Region</InfoLabel>
                        <InfoValue>{user.data.region}</InfoValue>
                    </InfoItem>
                )}
            </ProfileSection>

            <ProfileSection>
                <SectionTitle>Interests</SectionTitle>
                <InfoValue>{user.data.category || 'No interests specified.'}</InfoValue>
            </ProfileSection>
        </Container>
    );
}
