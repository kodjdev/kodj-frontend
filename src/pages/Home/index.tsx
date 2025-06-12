import EventBenefits from '@/pages/Home/EventBenefits';
import Statistics from '@/pages/Home/Statistics';
import CommunityCard from '@/pages/Home/CommunityCard/CommunityCard';
import TimeFrame from '@/pages/Home/TimeFrame';
import PartnerCompaniesSlider from './PartnerCompanySlider';

/**
 * Home - Home Page Component
 * @description This component is the main entry point for the home page.
 * It serves as a landing page for users and provides an overview of the application.
 */
export default function HomePage() {
    return (
        <>
            <CommunityCard />
            <Statistics />
            <PartnerCompaniesSlider />
            <EventBenefits />
            <TimeFrame />
        </>
    );
}
