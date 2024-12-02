import './App.css'
import { BrowserRouter } from 'react-router-dom';
import RouterPage from './router';
import ErrorBoundary from './components/ErrorBoundary';
import RootLayout from './pages/layout';


function App() {
  return (
    <>
      <ErrorBoundary>
        <BrowserRouter>
          <RootLayout>
            <RouterPage />
          </RootLayout>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  )
}

export default App;
