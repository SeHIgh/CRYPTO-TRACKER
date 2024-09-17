import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";
import { useQuery } from "@tanstack/react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 1000px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const SliderWrapper = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  .slick-initialized {
    //슬라이더 최상위 컴포넌트
    width: 100%;
  }
  .slick-track {
    //모든 자식 요소를 담고 있는 가로로 기다란 트랙(숨겨진 부분 존재)
    height: 80px;
  }
  .slick-slide {
    //각 요소들
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      //내가 직접 넣어서 렌더링해준 BookCover 컴포넌트
      width: 200px;
    }
  }
  .slick-current {
    //현재 보여지는 가장 왼쪽 요소의 다음 요소
    div {
      height: 300px; //가운데 요소의 크기만 좀더 크게 설정
    }
  }
  .slick-dots {
    .slick-active {
      button::before {
        color: white; //선택된 점의 색상 설정
      }
    }
    button::before {
      color: #e9e9e9; //선택 안된 점의 색상 설정
    }
  }
`;
const CoinsList = styled.ul``;
const Coin = styled.div`
  height: 250px;
  background-color: transparent;
  color: ${(props) => props.theme.bgColor};
  padding: 0;
  border-radius: 50px;
  transition: 0.2s ease-in-out;
  a {
    width: 100%;
    height: 100%;
    padding: 40px;
    transition: color 0.2s ease-in;
    display: block;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    align-items: center;
    color: ${(props) => props.theme.accentColor};
    font-size: 22px;
    text-align: center;
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
  width: 65px;
  height: 65px;
`;

const Rank = styled.span`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 30px;
  height: 30px;
  font-size: 24px;
  font-weight: 600;
  background-color: ${(props) => props.theme.accentColor};
  border-radius: 10px;
  color: ${(props) => props.theme.bgColor};
  text-align: center;
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
          <title>가상화폐 트래커</title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <Title>가상화폐 트래커</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <SliderWrapper>
            {/* <CoinsList> */}
            <Slider
              {...{
                className: "center",
                centerMode: true,
                infinite: true,
                centerPadding: "100px",
                slidesToShow: 3,
                speed: 500,
                autoplay: true,
                autoplaySpeed: 3000,
              }}
            >
              {data?.map((coin, idx) =>
                Math.floor(idx / 10) === 0 ? (
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
                        onError={(t) => {
                          t.currentTarget.onerror = null;
                          t.currentTarget.src = `https://cryptoicon-api.pages.dev/icons/128/color/_no_image_.png`;
                        }}
                      />
                      <Rank>{coin.rank}</Rank>
                      {coin.name} {/*&rarr*/}
                    </Link>
                  </Coin>
                ) : null
              )}
            </Slider>
            {/* </CoinsList> */}
          </SliderWrapper>
          <SliderWrapper>
            {/* <CoinsList> */}
            <Slider
              {...{
                className: "center",
                centerMode: true,
                infinite: true,
                centerPadding: "100px",
                slidesToShow: 3,
                speed: 500,
                autoplay: true,
                autoplaySpeed: 3000,
              }}
            >
              {data?.map((coin, idx) =>
                Math.floor(idx / 10) === 1 ? (
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
                        onError={(t) => {
                          t.currentTarget.onerror = null;
                          t.currentTarget.src = `https://cryptoicon-api.pages.dev/icons/128/color/_no_image_.png`;
                        }}
                      />
                      <Rank>{coin.rank}</Rank> {coin.name} {/*&rarr*/}
                    </Link>
                  </Coin>
                ) : null
              )}
            </Slider>
            {/* </CoinsList> */}
          </SliderWrapper>
          <SliderWrapper>
            {/* <CoinsList> */}
            <Slider
              {...{
                className: "center",
                centerMode: true,
                infinite: true,
                centerPadding: "100px",
                slidesToShow: 3,
                speed: 500,
                autoplay: true,
                autoplaySpeed: 3000,
              }}
            >
              {data?.map((coin, idx) =>
                Math.floor(idx / 10) === 2 ? (
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
                        onError={(t) => {
                          t.currentTarget.onerror = null;
                          t.currentTarget.src = `https://cryptoicon-api.pages.dev/icons/128/color/_no_image_.png`;
                        }}
                      />
                      <Rank>{coin.rank}</Rank> {coin.name} {/*&rarr*/}
                    </Link>
                  </Coin>
                ) : null
              )}
            </Slider>
            {/* </CoinsList> */}
          </SliderWrapper>
          <SliderWrapper>
            {/* <CoinsList> */}
            <Slider
              {...{
                className: "center",
                centerMode: true,
                infinite: true,
                centerPadding: "100px",
                slidesToShow: 3,
                speed: 500,
                autoplay: true,
                autoplaySpeed: 3000,
              }}
            >
              {data?.map((coin, idx) =>
                Math.floor(idx / 10) === 3 ? (
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
                        onError={(t) => {
                          t.currentTarget.onerror = null;
                          t.currentTarget.src = `https://cryptoicon-api.pages.dev/icons/128/color/_no_image_.png`;
                        }}
                      />
                      <Rank>{coin.rank}</Rank> {coin.name} {/*&rarr*/}
                    </Link>
                  </Coin>
                ) : null
              )}
            </Slider>
            {/* </CoinsList> */}
          </SliderWrapper>
          <SliderWrapper>
            {/* <CoinsList> */}
            <Slider
              {...{
                className: "center",
                centerMode: true,
                infinite: true,
                centerPadding: "100px",
                slidesToShow: 3,
                speed: 500,
                autoplay: true,
                autoplaySpeed: 3000,
              }}
            >
              {data?.map((coin, idx) =>
                Math.floor(idx / 10) === 4 ? (
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
                        onError={(t) => {
                          t.currentTarget.onerror = null;
                          t.currentTarget.src = `https://cryptoicon-api.pages.dev/icons/128/color/_no_image_.png`;
                        }}
                      />
                      <Rank>{coin.rank}</Rank> {coin.name} {/*&rarr*/}
                    </Link>
                  </Coin>
                ) : null
              )}
            </Slider>
            {/* </CoinsList> */}
          </SliderWrapper>
          <SliderWrapper>
            {/* <CoinsList> */}
            <Slider
              {...{
                className: "center",
                centerMode: true,
                infinite: true,
                centerPadding: "100px",
                slidesToShow: 3,
                speed: 500,
                autoplay: true,
                autoplaySpeed: 3000,
              }}
            >
              {data?.map((coin, idx) =>
                Math.floor(idx / 10) === 5 ? (
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
                        onError={(t) => {
                          t.currentTarget.onerror = null;
                          t.currentTarget.src = `https://cryptoicon-api.pages.dev/icons/128/color/_no_image_.png`;
                        }}
                      />
                      <Rank>{coin.rank}</Rank> {coin.name} {/*&rarr*/}
                    </Link>
                  </Coin>
                ) : null
              )}
            </Slider>
            {/* </CoinsList> */}
          </SliderWrapper>
          <SliderWrapper>
            {/* <CoinsList> */}
            <Slider
              {...{
                className: "center",
                centerMode: true,
                infinite: true,
                centerPadding: "100px",
                slidesToShow: 3,
                speed: 500,
                autoplay: true,
                autoplaySpeed: 3000,
              }}
            >
              {data?.map((coin, idx) =>
                Math.floor(idx / 10) === 6 ? (
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
                        onError={(t) => {
                          t.currentTarget.onerror = null;
                          t.currentTarget.src = `https://cryptoicon-api.pages.dev/icons/128/color/_no_image_.png`;
                        }}
                      />
                      <Rank>{coin.rank}</Rank> {coin.name} {/*&rarr*/}
                    </Link>
                  </Coin>
                ) : null
              )}
            </Slider>
            {/* </CoinsList> */}
          </SliderWrapper>
          <SliderWrapper>
            {/* <CoinsList> */}
            <Slider
              {...{
                className: "center",
                centerMode: true,
                infinite: true,
                centerPadding: "100px",
                slidesToShow: 3,
                speed: 500,
                autoplay: true,
                autoplaySpeed: 3000,
              }}
            >
              {data?.map((coin, idx) =>
                Math.floor(idx / 10) === 7 ? (
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
                        onError={(t) => {
                          t.currentTarget.onerror = null;
                          t.currentTarget.src = `https://cryptoicon-api.pages.dev/icons/128/color/_no_image_.png`;
                        }}
                      />
                      <Rank>{coin.rank}</Rank> {coin.name} {/*&rarr*/}
                    </Link>
                  </Coin>
                ) : null
              )}
            </Slider>
            {/* </CoinsList> */}
          </SliderWrapper>
          <SliderWrapper>
            {/* <CoinsList> */}
            <Slider
              {...{
                className: "center",
                centerMode: true,
                infinite: true,
                centerPadding: "100px",
                slidesToShow: 3,
                speed: 500,
                autoplay: true,
                autoplaySpeed: 3000,
              }}
            >
              {data?.map((coin, idx) =>
                Math.floor(idx / 10) === 8 ? (
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
                        onError={(t) => {
                          t.currentTarget.onerror = null;
                          t.currentTarget.src = `https://cryptoicon-api.pages.dev/icons/128/color/_no_image_.png`;
                        }}
                      />
                      <Rank>{coin.rank}</Rank> {coin.name} {/*&rarr*/}
                    </Link>
                  </Coin>
                ) : null
              )}
            </Slider>
            {/* </CoinsList> */}
          </SliderWrapper>
          <SliderWrapper>
            {/* <CoinsList> */}
            <Slider
              {...{
                className: "center",
                centerMode: true,
                infinite: true,
                centerPadding: "100px",
                slidesToShow: 3,
                speed: 500,
                autoplay: true,
                autoplaySpeed: 3000,
              }}
            >
              {data?.map((coin, idx) =>
                Math.floor(idx / 10) === 9 ? (
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
                        onError={(t) => {
                          t.currentTarget.onerror = null;
                          t.currentTarget.src = `https://cryptoicon-api.pages.dev/icons/128/color/_no_image_.png`;
                        }}
                      />
                      <Rank>{coin.rank}</Rank> {coin.name} {/*&rarr*/}
                    </Link>
                  </Coin>
                ) : null
              )}
            </Slider>
            {/* </CoinsList> */}
          </SliderWrapper>
        </>
      )}
    </Container>
  );
}

export default Coins;