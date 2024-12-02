import "../index.css";
import ConditionalLayout from "../components/ConditionalLayout";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout({ children}: Readonly <{children: React.ReactNode }>) {
  return (
    <AuthProvider>
        <ConditionalLayout>
            {children}
        </ConditionalLayout>
    </AuthProvider>
  );
}
