import '@/App.css';
import { BrowserRouter } from 'react-router-dom';
import RouterPage from '@/router/index';
import ErrorBoundary from '@/components/Error/ErrorBoundary';
import { RecoilRoot } from 'recoil';
import RootLayout from '@/pages/RootLayout';

export default function App() {
    return (
        <RecoilRoot>
            <ErrorBoundary>
                <BrowserRouter>
                    <RootLayout>
                        <RouterPage />
                    </RootLayout>
                </BrowserRouter>
            </ErrorBoundary>
        </RecoilRoot>
    );
}
