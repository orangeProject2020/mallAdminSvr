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
  async getPaymentList(data) {
    let ret = await axios.post('/api/mall/payment/list', data)
    return ret
  },
  async getGoodsList(data) {
    data.business_id = process.env.businessId
    let ret = await axios.post('/api/mall/goods/list', data)
    return ret
  },
  async goodsDataCreate(data) {
    data.business_id = process.env.businessId
    let ret = await axios.post('/api/mall/goods/create', data)
    return ret
  },
  async goodsDataUpdate(data) {
    data.business_id = process.env.businessId
    let ret = await axios.post('/api/mall/goods/update', data)
    return ret
  },
  async categoryDataUpdate(data) {
    data.business_id = process.env.businessId
    let ret = await axios.post('/api/mall/goods/categoryUpdate', data)
    return ret
  },
  async getGoodsCategoryList(data) {
    data.business_id = process.env.businessId
    let ret = await axios.post('/api/mall/goods/categorys', data)
    return ret
  },
  async statisticsTodayData(data = {}) {
    let ret = await axios.post('/api/mall/statistics/today', data)
    return ret
  }
}
