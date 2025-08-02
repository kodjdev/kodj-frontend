import '@/index.css';
import Layout from '@/components/Layout/Layout.tsx';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';

/**
 * RootLayout - Template Component.
 * @param children - The child components to be rendered within the layout.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const location = useLocation();

    if (location.pathname === '/login' || location.pathname.includes('/auth')) {
        return (
            <>
                <Header />
                {children}
            </>
        );
    }

    return <Layout>{children}</Layout>;
}
