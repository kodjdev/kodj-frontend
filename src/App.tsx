import '@/App.css';
import { BrowserRouter } from 'react-router-dom';
import RouterPage from '@/router/index';
import ErrorBoundary from '@/components/Error/ErrorBoundary';
import RootLayout from '@/pages/layout';
import { RecoilRoot } from 'recoil';
import { ModalProvider } from '@/components/Modal/ModalProvider';

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
