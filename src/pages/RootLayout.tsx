import '@/index.css';
import Layout from '@/components/Layout/Layout.tsx';

/**
 * RootLayout - Template Component.
 * @param children - The child components to be rendered within the layout.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <Layout>{children}</Layout>;
}
