import AreaProvider from "@/context/areaProvider";
import "@/styles/globals.css";
import "reactflow/dist/style.css";

export default function App({ Component, pageProps }) {
  return (
    <AreaProvider>
      <Component {...pageProps} />
    </AreaProvider>
  );
}
