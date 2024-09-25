import Router from "./Router";
import { Helmet } from "react-helmet-async";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter } from "react-router-dom";

function App() {
  // return <div><Router /></div>;
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Helmet>
        <link href="https://fastly.jsdelivr.net/npm/galmuri@latest/dist/galmuri.css" />
      </Helmet>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools />
    </BrowserRouter>
  );
}

export default App;