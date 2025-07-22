import behzodImage from '@/static/team/bekhzod.png';
import javokhirImage from '@/static/team/javokhir.jpg';
import oybekImage from '@/static/team/oybek.jpg';
import sardorImage from '@/static/team/sardor.png';

type TeamMember = {
    id: string;
    name: string;
    role: string;
    image: string;
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
    },
    {
        id: 'sardor',
        name: 'Sardor Madaminov',
        role: 'Software Developer',
        image: sardorImage,
    },
    {
        id: 'javokhir',
        name: 'Javokhirbek Khakimjonov',
        role: 'Software Developer',
        image: javokhirImage,
    },
    {
        id: 'oybek',
        name: 'Oybek Kholikov',
        role: 'Product Designer',
        image: oybekImage,
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
