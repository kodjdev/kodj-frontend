import '@/App.css';
import { BrowserRouter } from 'react-router-dom';
import RouterPage from '@/router/index';
import ErrorBoundary from '@/components/Error/ErrorBoundary';
import { RecoilRoot } from 'recoil';
import RootLayout from '@/pages/RootLayout';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';

const App: React.FC = () => {
    return (
        <RecoilRoot>
            <ErrorBoundary>
                <BrowserRouter>
                    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                        <RootLayout>
                            <RouterPage />
                        </RootLayout>
                    </GoogleOAuthProvider>
                </BrowserRouter>
            </ErrorBoundary>
        </RecoilRoot>
    );
};

export default App;
