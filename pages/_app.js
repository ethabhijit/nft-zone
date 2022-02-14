import "../styles/globals.css";

import Head from "next/head";

import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>NFTZone</title>
      </Head>
      <div className="bg-gray-900 h-screen overflow-y-scroll">
        <Navbar />
        <section className="mt-14 p-3">
          <Component {...pageProps} />
        </section>
      </div>
    </>
  );
}

export default MyApp;
