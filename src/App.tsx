import '@/App.css';
import { BrowserRouter } from 'react-router-dom';
import RouterPage from '@/router/index';
import { RecoilRoot } from 'recoil';
import RootLayout from '@/pages/RootLayout';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthProvider from '@/context/authProvider';
import UnderMaintenance from '@/pages/UnderMaintenance';

type AppProps = {
    isMaintenanceMode?: boolean;
};

export default function App({ isMaintenanceMode = false }: AppProps) {
    const MAINTENANCE_MODE = isMaintenanceMode || import.meta.env.VITE_APP_MAINTENANCE_MODE === 'true';

    if (MAINTENANCE_MODE) {
        return <UnderMaintenance />;
    }

    return (
        <RecoilRoot>
            <BrowserRouter>
                <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                    <AuthProvider>
                        <RootLayout>
                            <RouterPage />
                        </RootLayout>
                    </AuthProvider>
                </GoogleOAuthProvider>
            </BrowserRouter>
        </RecoilRoot>
    );
}
