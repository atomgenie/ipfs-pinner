import axios, { AxiosInstance } from "axios"
import { API_URL } from "helpers/api"

export const getInstance = (authorization: string | undefined): AxiosInstance => {
    return axios.create({
        baseURL: API_URL,
        headers: authorization
            ? {
                  Authorization: authorization,
              }
            : {},
    })
}
