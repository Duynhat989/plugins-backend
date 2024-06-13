const axios  = require('axios')
require('dotenv').config();

const request = axios.create({
  baseURL:process.env.URL_YOUTUBE,
  headers: {
    'User-Agent': ' Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36' 
  }
});

export const setAuth = ()=>{
  const token = JSON.parse(localStorage.getItem("user") || '{}')
  const refreshToken = token.auth
  request.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`
}

setAuth()

module.exports = request