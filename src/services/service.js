import ApiService from "./api";
import Toast from "../helpers/toast.js";

/**
 * HTTP STATUS CODE
 */
const HTTP_UNAUTHORIZED = 401;
const HTTP_FORBIDDEN = 403;
const HTTP_UNPROCESSABLE_ENTITY = 422;
const HTTP_INTERNAL_SERVER_ERROR = 500;

export default {

  async post(url, params = {}, headers = {}) {
    try {
      return await ApiService.post(url, params, headers);
    } catch (e) {
      return this._setError(e);
    }
  },

  async get(url, params = {}, headers = {}) {
    try {
      return await ApiService.get(url, params, headers);
    } catch (e) {
      return this._setError(e);
    }
  },

  async put(url, params = {}, headers = {}) {
    try {
      return await ApiService.put(url, params, headers);
    } catch (e) {
      return this._setError(e);
    }
  },

  async delete(url, params = {}, headers = {}) {
    try {
      return await ApiService.delete(url, params, headers);
    } catch (e) {
      return this._setError(e);
    }
  },

  async _setError(e) {
    switch (e.response?.status) {
      case HTTP_UNPROCESSABLE_ENTITY:
      case HTTP_UNAUTHORIZED:
        break
      case HTTP_FORBIDDEN:
        localStorage.removeItem('token')
        localStorage.removeItem('is_admin')
        window.location.reload()
      case HTTP_INTERNAL_SERVER_ERROR:
        Toast.fire({
          icon: "error",
          title: e.response.data.message || "Lỗi hệ thống",
        });
        break;
    }
    return e.response;
  },
};
