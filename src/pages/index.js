import Head from "next/head";
import Index from "./(home)/home";
import Header from "../../common components/header";
import Footer from "../../common components/footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Ventify</title>
        <meta
          name="description"
          content={`Welcome to Ventify, your new haven for discovering the perfect golf vacation rental. Say goodbye to the days of tirelessly sorting through irrelevant results on generic vacation websites. Instead, allow yourself to dive into a platform meticulously curated for passionate golf enthusiasts.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Index />
      </main>
    </>
  );
}
