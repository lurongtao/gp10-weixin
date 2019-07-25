const axios = require('axios')

module.exports = {
  get(url) {
    return axios({
      url
    })
    .then((result) => {
      return result.data
    })
  }
}