import axios from "axios";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL ||
  (typeof import.meta !== "undefined" && import.meta.env
    ? import.meta.env.REACT_APP_BACKEND_URL
    : "");

export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
  withCredentials: true,
});
