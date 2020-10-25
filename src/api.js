import axios from "axios";

const instance = axios.create({
  baseURL: "https://sandbox-api.coinmarketcap.com/v1",
  /* "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"; */
  headers: {
    "content-type": "application/json",
    "X-CMC_PRO_API_KEY": process.env.CMC_KEY,
  },
});
export default {
  getData: () =>
    instance({
      method: "GET",
      url: "/cryptocurrency/listings/latest",
    }),
};
