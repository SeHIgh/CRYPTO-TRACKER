import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";
import { useQuery } from "@tanstack/react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  padding: 0;
  border-radius: 15px;
  margin-bottom: 10px;
  transition: 0.2s ease-in-out;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
    display: flex;
    align-items: center;
    font-size: 22px;
  }
  &:hover {
    color: ${(props) => props.theme.accentColor};
    background-color: #c0c0c0;
    transform: scale(1.1);
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface Icoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<Icoin[]>({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
    select: (data) => data.slice(0, 100),
  });

  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>Coin Ranking</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <Title>Coin Ranking</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                }}
                state={{
                  name: coin.name,
                }}
              >
                <Img
                  src={`https://cryptoicon-api.pages.dev/icons/128/color/${coin.symbol.toLowerCase()}.png`}
                  onError={(t)=>{
                    t.currentTarget.onerror = null;
                    t.currentTarget.src = `https://cryptoicon-api.pages.dev/icons/128/color/_no_image_.png`;
                  }}
                />
                {coin.rank}. {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
