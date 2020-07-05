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

const restaurant = (state: Restaurant = null, action) => {
  switch (action.type) {
    case `SET_RESTAURANT`:
      return action.restaurant
    case `UPDATE_RESTAURANT_DATA`:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.data,
        },
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
