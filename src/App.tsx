import '@/App.css';
import { BrowserRouter } from 'react-router-dom';
import RouterPage from '@/router/index';
import { RecoilRoot } from 'recoil';
import RootLayout from '@/pages/RootLayout';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import AuthProvider from '@/context/AuthContext';

const App: React.FC = () => {
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
};

export default App;
