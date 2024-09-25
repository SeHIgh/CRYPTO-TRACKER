import { Routes, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <Routes>
      <Route path="/:coinId/*" element={<Coin />} />
      <Route path="/" element={<Coins />} />
    </Routes>
  );
}

export default Router;
