import axios from './axios'

export default {
  async getOrderList(data) {
    let ret = await axios.post('/api/mall/order/list', data)
    return ret
  }
}
