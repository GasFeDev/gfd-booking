/* DEPLOY PARA HEROKU */

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://gfd-booking.herokuapp.com/api/",
});
