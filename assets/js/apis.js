import axios from './axios'

export default {
  async getUserIdByMobile(data) {
    let ret = await axios.post('/api/user/data/getUserIdByMobile', {
      mobile: data.mobile
    })
    return ret
  },
  async getListByUserIds(data) {
    let ret = await axios.post('/api/user/data/getListByUserIds', {
      user_ids: data.user_ids
    })
    return ret
  },
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
  async updateOrder(data) {
    let ret = await axios.post('/api/mall/order/update', data)
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
  async getProfitList(data) {
    let ret = await axios.post('/api/mall/profit/list', data)
    return ret
  },
  async getAssetsList(data) {
    let ret = await axios.post('/api/mall/assets/list', data)
    return ret
  },
  async getAssetsLogsList(data) {
    let ret = await axios.post('/api/mall/assets/listLogs', data)
    return ret
  },
  async getWithdrawList(data) {
    let ret = await axios.post('/api/mall/withdraw/list', data)
    return ret
  },
  async withdrawAudit(data) {
    let ret = await axios.post('/api/mall/withdraw/audit', data)
    return ret
  },
  async statisticsTodayData(data = {}) {
    let ret = await axios.post('/api/mall/statistics/today', data)
    return ret
  },

  async profitPlatformCheck(data = {}) {
    let ret = await axios.post('/api/mall/schedule/profitPlatformCheck', data)
    return ret
  },
  async profitUserCheck(data = {}) {
    let ret = await axios.post('/api/mall/schedule/dayJobProfitUserCheck', data)
    return ret
  },
  async profitUserClose(data = {}) {
    let ret = await axios.post('/api/mall/schedule/dayJobProfitUserClose', data)
    return ret
  }
}
