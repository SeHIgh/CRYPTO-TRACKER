import Router from "./Router";
import { Helmet } from "react-helmet-async";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyle from "./styles/GlobalStyle";
import { BrowserRouter } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import MacWindow, { MacWindowWrapper } from "./styles/MacWindow";

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Helmet>
        <link href="https://fastly.jsdelivr.net/npm/galmuri@latest/dist/galmuri.css" />
      </Helmet>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <MacWindowWrapper>
          <MacWindow />
          <Router />
        </MacWindowWrapper>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
