import React, { useEffect } from "react";
import Head from "next/head";
import type { AppProps } from 'next/app'
import { useRouter } from "next/router";
import '../scss/globals.scss'

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn && router.pathname !== "/login") {
      router.push("/login");
    }

    if (isLoggedIn && router.pathname === "/login") {
      router.push("/welcome");
    }
  }, [router.pathname]);

  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Phanomwan Backend</title>
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  )
}
