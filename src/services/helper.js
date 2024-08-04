import { format } from 'date-fns';

export default {
  formatNumberToVND(number) {
    const numberFormat = new Intl.NumberFormat('en-DE' , { maximumFractionDigits: 0 }).format(number)
    return numberFormat;
  },

  formatVNDtoNumber(vnd) {
    return vnd.replace(/[.,]/g, '');
  },

  getPathImage(path) {
    return process.env.VUE_APP_BASE_URL_API + '/get-image/' + path
  },

  formatDateTime(dateTime, type) {
    if (dateTime) {
      const currentDate = new Date(dateTime)
      return format(currentDate, type)
    }
  }
}
