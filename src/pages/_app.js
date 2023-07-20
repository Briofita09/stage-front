import AreaProvider from "@/context/areaProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AreaProvider>
      <Component {...pageProps} />
    </AreaProvider>
  );
}
