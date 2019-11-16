import axios from './axios'

export default {
  async getOrderList(data) {
    let ret = await axios.post('/api/mall/order/list', data)
    return ret
  },
  /**
   * 取消订单
   * @param {*} data 
   */
  async cancelOrder(data) {
    let ret = await axios.post('/api/mall/order/cancel', data)
    return ret
  },
  async paymentCreate(data) {
    let ret = await axios.post('/api/mall/payment/create', data)
    return ret
  },
  async paymentComplete(data) {
    let ret = await axios.post('/api/mall/payment/complete', data)
    return ret
  },
  async statisticsTodayData(data = {}) {
    let ret = await axios.post('/api/mall/statistics/today', data)
    return ret
  }
}
