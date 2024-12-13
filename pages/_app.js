import Layout from "@/components/Layout";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "../context/user-context";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <UserProvider>
        <Layout> 
          <Component {...pageProps} /> 
        </Layout>
      </UserProvider>
    </SessionProvider>
  )}
