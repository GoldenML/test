export const lcStorage = {
  setItem (key, value, expires) {
    let params = { key, value, expires }
    if (expires) {
      let data = Object.assign(params, { startTime: new Date().getTime() })
      localStorage.setItem(key, JSON.stringify(data))
    } else {
      if (Object.prototype.toString.call(value) === '[object Object]') {
        value = JSON.stringify(value)
      }
      if (Object.prototype.toString.call(value) === '[object Array]') {
        value = JSON.stringify(value)
      }
      localStorage.setItem(key, value)
    }
  },
  getItem (key) {
    let item = localStorage.getItem(key)
    try {
      item = JSON.parse(item)
    } catch (error) {
      // eslint-disable-next-line no-self-assign
      item = item
    }
    if (item && item.startTime) {
      let date = new Date().getTime()
      if (date - item.startTime > item.expires) {
        localStorage.removeItem(name)
        return false
      }
      return item.value
    }
    return item
  },
  removeItem (key) {
    localStorage.removeItem(key)
  },
  clearAll () {
    localStorage.clear()
  }
}

export const ssStorage = {
  setItem (key, value) {
    let data = { value }
    sessionStorage[key] = JSON.stringify(data)
  },
  getItem (key) {
    let data = sessionStorage[key]
    if (!data || data === 'null') {
      return null
    }
    return JSON.parse(data).value
  },
  removeItem (key) {
    sessionStorage.removeItem(key)
  },
  clearAll () {
    sessionStorage.clear()
  }
}

