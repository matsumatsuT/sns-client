import axios from "axios";

const apiClient = axios.create({
  // ローカル開発時はこちらを使用する
  baseURL: "http://localhost:8000/api",

  // 本番環境時はこちらを使用する
  // baseURL: process.env.NEXT_PUBLIC_API_BASEURL,

  headers: {
    "Content-Type": "application/json"
  },
})

export default apiClient