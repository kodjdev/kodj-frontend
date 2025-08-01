import behzodImage from '@/static/team/bekhzod.png';
import javokhirImage from '@/static/team/javokhir.jpg';
import oybekImage from '@/static/team/oybek.jpg';
import sardorImage from '@/static/team/sardor.png';

type TeamMember = {
    id: string;
    name: string;
    role: string;
    image: string;
    linkedinUrl: string;
};

type Contributor = {
    id: string;
    name: string;
    githubUsername: string;
    contributions: string;
};

export const organizers: TeamMember[] = [
    {
        id: 'behzod',
        name: 'Behzod Halil',
        role: 'Android developer',
        image: behzodImage,
        linkedinUrl: 'https://www.linkedin.com/in/behzodhalil/',
    },
    {
        id: 'sardor',
        name: 'Sardor Madaminov',
        role: 'Software Developer',
        image: sardorImage,
        linkedinUrl: 'https://www.linkedin.com/in/sardor-m/',
    },
    {
        id: 'javokhir',
        name: 'Javokhirbek Khakimjonov',
        role: 'Software Developer',
        image: javokhirImage,
        linkedinUrl: 'https://www.linkedin.com/in/jaykhakim/',
    },
    {
        id: 'oybek',
        name: 'Oybek Kholikov',
        role: 'Product Designer',
        image: oybekImage,
        linkedinUrl: 'https://www.linkedin.com/in/oybek-kholikov-b354b6258/',
    },
];

export const contributors: Contributor[] = [
    {
        id: 'contributor-1',
        name: 'Otabek Tashmatov',
        githubUsername: 'otabek05',
        contributions: 'Backend Development',
    },
    {
        id: 'contributor-2',
        name: 'Sardor Madaminov',
        githubUsername: 'sardor-m',
        contributions: 'Frontend Development',
    },
    {
        id: 'contributor-3',
        name: 'Behzod Halil',
        githubUsername: 'behzodhalil',
        contributions: 'Android Development',
    },
    {
        id: 'contributor-5',
        name: 'Abdulaziz Mashrabov',
        githubUsername: 'iamalaziz',
        contributions: 'Frontend Development',
    },
    {
        id: 'contributor-4',
        name: 'Oybek Kholikov',
        githubUsername: 'oybek-kholikov',
        contributions: 'UI/UX Design',
    },
];
