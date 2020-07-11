import { combineReducers } from 'redux'
import 'firebase/storage'
import 'firebase/firestore'
import Restaurant from 'models/Restaurant'

const user = (state = null, action) => {
  switch (action.type) {
    case `SET_USER`:
      return action.user
    default:
      return state
  }
}

const restaurant = (state: Restaurant | null = null, action) => {
  switch (action.type) {
    case `SET_RESTAURANT`:
      return action.restaurant
    case `UPDATE_RESTAURANT_DATA`:
      if (!state?.data) return { ...state, data: action.data }

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

const menuItems = (state: MenuItem[] = [], action) => {
  switch (action.type) {
    case `SET_MENU_ITEMS`:
      return action.menuItems
    case `ADD_MENU_ITEM`:
      return [...state, action.menuItem]
    case `UPDATE_MENU_ITEM_DATA`:
      return state.map(item => {
        if (item.ref.id !== action.ref.id) return item

        return {
          ...item,
          data: {
            ...item.data,
            ...action.data,
          },
        }
      })
    default:
      return state
  }
}

export default combineReducers({
  user,
  restaurant,
  menuItems,
})
