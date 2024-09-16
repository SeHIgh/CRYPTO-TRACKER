import Router from "./Router";
import { Helmet } from "react-helmet-async";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import GlobalStyle from "./styles/GlobalStyle";

function App() {
  // return <div><Router /></div>;
  return <>
    <Helmet>
      <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap" />
    </Helmet>
    <GlobalStyle />
    <Router />
    <ReactQueryDevtools />
  </>
}

export default App;