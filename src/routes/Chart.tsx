import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

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
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          height={350}
          series={[
            {
              name: "Price",
              // data: data?.map((price) => price.close) ?? [],
              data: chartData,
            },
          ]}
          options={{
            // 차트 틀 옵션 : area
            // chart: {
            //   height: 300,
            //   width: 500, // toolbar 옵션
            //   toolbar: { show: false },
            //   // fontFamily: "galmuri9" //font 옵션
            //   background: "transparent",
            //   type: "area",
            // },
            // 제공 테마 옵션
            // theme: {
            //   mode: isDark ? "dark" : "light",
            //   // palette: "palette1",
            //   // monochrome: {
            //   //   enabled: false,
            //   //   color: "#c7ecee",
            //   //   shadeTo: "dark",
            //   //   shadeIntensity: 0.65,
            //   // },
            // },
            // // 차트 선 옵션
            // stroke: {
            //   curve: "smooth", //차트 선의 Peak 부드러운 정도
            //   width: 4, // 차트 선 두께
            // },
            // // grid 옵션
            // grid: {
            //   show: false
            // },
            // // x축 옵션
            // xaxis: {
            //   labels: {
            //     show: false
            //   },
            //   axisTicks: {
            //     show: false
            //   },
            //   axisBorder: {
            //     show: false
            //   },
            //   categories: data?.map((price) => new Date(Number(price.time_close) * 1000).toUTCString()) ?? [],
            //   type: "datetime",
            // },
            // // y축 옵션
            // yaxis: {
            //   show: false
            // },
            // fill: {
            //   type: "gradient",
            //   gradient: {
            //     gradientToColors: ["#0be881"],
            //     stops: [0, 100],
            //   }
            // },
            // colors: ["#0fbcf9"],
            // tooltip: {
            //   y: {
            //     formatter: (value) => `${value.toFixed(2)}`
            //   }
            // }
            // 차트 틀 옵션 : candlestick
            title: {
              text: "CandleStick Chart",
              align: "left",
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
        ></ApexChart>
      )}
    </div>
  );
}

export default Chart;
