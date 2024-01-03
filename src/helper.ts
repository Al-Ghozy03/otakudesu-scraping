import axios, { AxiosResponse } from "axios";

interface AxiosServiceResponse {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}

export const AxiosService = async (
  url: string
): Promise<AxiosServiceResponse> => {
  return new Promise(async (resolve, reject) => {
    const _url = url == null ? url : encodeURI(url);
    try {
      const response: AxiosResponse = await axios.get(_url);
      if (response.status === 200) {
        return resolve(response);
      }
      return reject(response);
    } catch (error) {
      return reject(error);
    }
  });
};
