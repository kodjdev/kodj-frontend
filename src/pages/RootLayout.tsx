import '@/index.css';
import Layout from '@/components/Layout/Layout.tsx';
import { AuthProvider } from '@/context/AuthContext';

/**
 * RootLayout - Template Component.
 * @param children - The child components to be rendered within the layout.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <AuthProvider>
            <Layout>{children}</Layout>
        </AuthProvider>
    );
}
