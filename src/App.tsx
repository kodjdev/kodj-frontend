import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RouterPage from "@/router/index";
import ErrorBoundary from "@/components/ErrorBoundary";
import RootLayout from "@/pages/layout";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <>
      <RecoilRoot>
        <ErrorBoundary>
          <BrowserRouter>
            <RootLayout>
              <RouterPage />
            </RootLayout>
          </BrowserRouter>
        </ErrorBoundary>
      </RecoilRoot>
    </>
  );
}

export default App;
