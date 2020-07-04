import { combineReducers } from 'redux'
import Restaurant from 'models/Restaurant'

const user = (state = null, action) => {
  switch (action.type) {
    case `SET_USER`:
      return action.user
    default:
      return state
  }
}

const restaurant = (state: object | null = null, action) => {
  switch (action.type) {
    case `SET_RESTAURANT`:
      return action.restaurant
    case `UPDATE_RESTAURANT`:
      return {
        ...state,
        ...action.restaurant,
      }
    default:
      return state
  }
}

const menuItems = (state: Item[] = [], action) => {
  switch (action.type) {
    case `SET_MENU_ITEMS`:
      return action.menuItems
    default:
      return state
  }
}

export default combineReducers({
  user,
  restaurant,
  menuItems,
})
