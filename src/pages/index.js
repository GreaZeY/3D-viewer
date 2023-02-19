import App from "@/Components/App";
import Spinner from "@/Components/Loaders/Spinner";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    <>
      <Head>
        <title>Blend da Vinci</title>
        <meta
          name="description"
          content="Blend da Vinci, a simple 3d viewer and configure tool."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/vinci.png" />
      </Head>
      {domLoaded ? (
        <App />
      ) : (
        <div
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner style={{ aspectRatio: 1, width: "2rem" }} />
        </div>
      )}
    </>
  );
}
