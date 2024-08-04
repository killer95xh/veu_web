import axios from "axios";

axios.defaults.headers.common["contentType"] = "application/json";
axios.defaults.headers.common["Cache-Control"] = "no-cache";
axios.defaults.headers.common["Cache-control"] = "no-store";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Pragma"] = "no-cache";
axios.defaults.headers.common["Expires"] = 0;
axios.defaults.headers.common["Timezone"] = new Date().getTimezoneOffset();
axios.defaults.headers.common["X-Request-With"] = "XMLHttpRequest";

export default {
  request(method, url, params, data, headers = {}, config = {}) {
    return axios.request({
      ...config,
      url,
      params,
      data,
      method: method.toLowerCase(),
      headers,
    });
  },

  post(url, data, headers = {}, config = {}) {
    return this.request("post", url, {}, data, headers, config);
  },

  get(url, params = null, headers, config = {}) {
    return this.request("get", url, params, {}, headers, config);
  },

  put(url, data, headers, config = {}) {
    return this.request("put", url, {}, data, headers, config);
  },

  delete(url, params = {}, headers ={},  data = {}, config = {}) {
    return this.request("delete", url, params, data, headers, config);
  },
};
