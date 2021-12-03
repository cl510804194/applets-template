import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export default class Ajax {
  public static setHeader(headerName: string, value = "") {
    if (!headerName) {
      console.error("setHeader", "参数不合法");
      return;
    }

    axios.interceptors.request.use(
      config => {
        if (config.headers) {
          config.headers[headerName] = value;
          return config;
        }
      },
      err => {
        return Promise.reject(err);
      }
    );
  }

  private baseUrl = "";

  public request(params: AxiosRequestConfig): Promise<any> {
    const newParams: AxiosRequestConfig = {
      ...params,
      headers: {
        //TODO:添加头部
      }
    };
    return new Promise((resolve, reject) => {
      axios({ ...newParams, url: `${this.baseUrl}${params.url}` })
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            if (res?.data?.code !== 0) {
              // TODO:添加错误信息
            }
            if (res?.data?.code === 401) {
              //  TODO:401请求
              reject(res?.data);
            } else {
              resolve(res.data);
            }
          }
        })
        .catch(_err => {
          //   TODO:错误处理
          // reject(err)
        });
    });
  }

  private queryString(url: string, query?: Record<string, string>): string {
    const str: string[] = [];
    for (const key in query) {
      str.push(key + "=" + query[key]);
    }
    const paramStr = str.join("&");
    return paramStr ? `${url}?${paramStr}` : url;
  }

  public get(url = "", params?: Record<string, string>): Promise<any> {
    return this.request({
      method: "get",
      url: this.queryString(`${url}`, params)
    });
  }

  public setBaseUrl = (url: string) => {
    this.baseUrl = url;
  };

  public post(url: string, params?: Record<string, any>): Promise<any> {
    return this.request({
      method: "post",
      url: `${this.baseUrl}${url}`,
      data: params
    });
  }
}
