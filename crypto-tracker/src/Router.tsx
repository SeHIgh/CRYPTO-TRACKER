import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Header from "./components/Header";
import Home from "./screens/Home";
import About from "./screens/About";

function Router() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />}/> */}
      <Route path="/:coinId/*" element={<Coin />} />
      <Route path="/" element={<Coins />} />
    </Routes>
  );
}

export default Router;
