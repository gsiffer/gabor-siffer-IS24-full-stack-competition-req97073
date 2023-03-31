import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className="text-3xl text-center">
          Welcome to the Service Information Management Branch (IMB) Web
          Application Catalogue
        </h1>
      </div>
    </>
  );
}
