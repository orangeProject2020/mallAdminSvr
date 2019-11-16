const express = require("express");
const router = express.Router();
const request = require("./request");
const config = require('./../nuxt.config.js').api


router.use(async (req, res) => {

  let url = req.originalUrl
  console.log('/api url', url)

  let token = req.session.token || ''
  if (token) {
    url += '?token=' + token
  }
  url = url.replace('/api/', config.host + ':' + config.port + '/', url)
  console.log('/api url', url)

  let data = req.body || {}

  let Request = new request({
    channel_id: config.channel_id,
    key: config.key
  })
  let ret = await Request.post(url, data);
  console.log('/api ', url, ret)
  if (ret.data && ret.data.token) {
    console.log('/api token: ', ret.data.token)
    req.session.token = ret.data.token
    console.log('/api token set success ......, ',
      req.session.token)
  }

  return res.json(ret);
});

module.exports = router;
