import axios from 'axios'
const $axios = axios.create({
  timeout: 30000,
  responseType: 'json'
})
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截
$axios.interceptors.response.use((response) => {
  return checkStatus(response)
}, (e) => {
  console.error('response  error-->', e)
  checkStatus(e.response)
  return Promise.reject(e)
})
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.data
  } else {
    console.warn('---------status--->', response.status)
  }
}
export const post = (url, params, headers) => {
  return new Promise((resolve, reject) => {
    $axios({
      method: 'POST',
      url: url,
      data: params,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }).then((result) => {
      resolve(result)
    }).catch((error) => {
      reject(error)
    })
  })
}
