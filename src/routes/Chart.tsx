import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import styled from "styled-components";

const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

interface IChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: IChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId),
    // refetchInterval: 10000,
  });
  const exceptData = data ?? [];
  const chartData = exceptData?.map((i) => {
    return {
      x: i.time_close,
      y: [i.open, i.high, i.low, i.close]
    };
  });
  return (
    <ChartWrapper>
      {isLoading ? (
        "차트 로딩 중..."
      ) : (
        <ApexChart
          type="candlestick"
          height={350}
          series={[
            {
              name: "가격",
              data: chartData,
            },
          ]}
          options={{
            chart: {
              type: 'candlestick',
              height: 350,
              toolbar: {
                show: false,
              },
              background: "transparent",
              fontFamily: 'galmuri9',
            },
            // 차트 제목 설정
            title: {
              text: "캔들스틱 차트",
              align: "left",
              style: {
                fontSize:  '16px',
                fontWeight:  'bold',
                fontFamily:  'galmuri9',
                color:  isDark ? "#c7ecee" : "#40739e"
              }
            },
            // grid 설정
            grid: {
              show: false,
            },
            // x축 설정
            xaxis: {
              type: "datetime",
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            // y축 설정
            yaxis: {
              show: false,
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#3C90EB',
                  downward: '#DF7D46'
                },
              },
            },
            theme: {
              mode: isDark ? "dark" : "light",
              palette: 'palette1', 
              monochrome: {
                  enabled: false,
                  color: '#255aee',
                  shadeTo: 'light',
                  shadeIntensity: 0.65
              },
            },
          }}
        ></ApexChart>
      )}
    </ChartWrapper>
  );
}

export default Chart;
