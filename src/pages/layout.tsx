import "../index.css";
import Layout from "../components/Layout/Layout.tsx";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
      <AuthProvider>
        <Layout>{children}</Layout>
      </AuthProvider>
  );
}
