import { combineReducers } from 'redux'
import Restaurant from 'models/Restaurant'

const snapshot = (state: object | null = null, action) => {
  switch (action.type) {
    case `UPDATE_RESTAURANT_DATA`:
      return {
        ...state,
        ...action.data,
      }
    default:
      return state
  }
}

const data = (state: object | null = null, action) => {
  switch (action.type) {
    case `UPDATE_RESTAURANT_DATA`:
      return {
        ...state,
        ...action.data,
      }
    default:
      return state
  }
}

interface RestaurantState {
  snapshot: object
  data: object
}

const restaurant = (state: RestaurantState | null = null, action) => {
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
