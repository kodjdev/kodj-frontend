import '@/App.css';
import { BrowserRouter } from 'react-router-dom';
import RouterPage from '@/router/index';
import ErrorBoundary from '@/components/Error/ErrorBoundary';
import { RecoilRoot } from 'recoil';
import { ModalProvider } from '@/components/Modal/ModalProvider';
import RootLayout from '@/pages/RootLayout';

export default function App() {
    return (
        <ModalProvider>
            <RecoilRoot>
                <ErrorBoundary>
                    <BrowserRouter>
                        <RootLayout>
                            <RouterPage />
                        </RootLayout>
                    </BrowserRouter>
                </ErrorBoundary>
            </RecoilRoot>
        </ModalProvider>
    );
}
