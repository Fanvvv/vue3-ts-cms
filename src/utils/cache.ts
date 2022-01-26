class LocalCache {
  setLocalCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  getLocalCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  deleteLocalCache(key: string) {
    window.localStorage.removeItem(key)
  }
  clearLocalCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
