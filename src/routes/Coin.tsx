import {
  Link,
  Route,
  Routes,
  useLocation,
  useParams,
  useMatch,
} from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinInfo, fetchCoinTickers } from "./api";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 1000px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  overflow: hidden;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// black box
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
// 코인에 대한 설명
const Description = styled.p`
  color: ${(props) => props.theme.bgColor};
  margin: 20px 0px;
`;

const Title = styled.h1`
  font-size: 38px;
  color: ${(props) => props.theme.bgColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;
interface RouteParams {
  coinId: string;
  [key: string]: string | undefined; // 인덱스 시그니처 추가
}
interface RouteState {
  name: string;
  state: string;
}

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  background-color: ${(props) =>
    props.isActive ? props.theme.activeColor : props.theme.inactiveColor};
  a {
    display: block;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

// 타입이 배열인 경우 필요하다면 interface 를 이용해서 자료형을 지정해줄 수 있다.
// interface ITag{
//   id: string;
//   name: string;
//   coin_counter: number;
//   ico_counter: number;
// }

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  // tags:ITag[];
  // team:object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: object;
  links_extended: object;
  whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: number;
      percent_from_price_ath: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const location = useLocation();
  const { state } = location.state as RouteState || {name: "Unknown", state: ""};
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>({
    queryKey: ["info", coinId],
    queryFn: () => fetchCoinInfo(coinId),
  });
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    {
      queryKey: ["tickers", coinId],
      queryFn: () => fetchCoinTickers(coinId),
      // refetchInterval: 5000,
    }
  );

  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>
            {state ? state : loading ? "Loading..." : infoData?.name}
          </title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <Title>{state ? state : loading ? "Loading..." : infoData?.name}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Routes>
            <Route path={`price`} element={<Price />} />
            <Route
              path={`chart`}
              element={coinId && <Chart coinId={coinId} />}
            />
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
