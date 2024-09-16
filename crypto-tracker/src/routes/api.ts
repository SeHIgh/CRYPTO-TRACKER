const BASE_URL = `https://api.coinpaprika.com/v1`;
const NICO_URL = `https://ohlcv-api.nomadcoders.workers.dev`

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId?: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinTickers(coinId?: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

// CORS Error Issue 로 인하여 proxy 이용
// export function fetchCoins() {
//   return fetch(`/api/coins`).then((response) => response.json());
// }

// export function fetchCoinInfo(coinId?: string) {
//   return fetch(`/api/coins/${coinId}`).then((response) =>
//     response.json()
//   );
// }

// export function fetchCoinTickers(coinId?: string) {
//   return fetch(`/api/tickers/${coinId}`).then((response) =>
//     response.json()
//   );
// }

export function fetchCoinHistory(coinId?: string) {
  // 끝 날짜 : 현재 시간 -> 초 변환(JS 는 ms 로 반환) & 내림
  // Math.ceil : 올림 (씰링 : 천장)
  const endDate = Math.floor(Date.now() / 1000);
  // 시작 날짜 : 최근 일주일
  const startDate = endDate - 60 * 60 * 24 * 7;
  // return fetch(
  //   `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  // ).then((response) => response.json());
  // paprika API 유로화로 인한 자체 API 이용
  return fetch(
    `${NICO_URL}?coinId=${coinId}`
  ).then((response) => response.json());
}
