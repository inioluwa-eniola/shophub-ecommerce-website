export function useLocalStorage() {
  function setItem(key, value) {
    try{
      const loggedInUser = window.localStorage.setItem(key, JSON.stringify(value))
      return loggedInUser
    } catch (error) {
      console.log(`Error setting ${key} to localStorage`, error)
    }
  }
  
  function getItem(key) {
    try {
      const loggedInUser = JSON.parse(window.localStorage.getItem(key) || "[]")
      return loggedInUser
    } catch(error) {
      console.log(`Error getting ${key} from localStorage`, error)
    }
  }
  
  function removeItem(key) {
    try{
      window.localStorage.removeItem(key)
    } catch (error) {
      console.log(`Error removing ${key} from localStorage`, error)
    }
  }
  
  return { setItem, getItem, removeItem }
}

