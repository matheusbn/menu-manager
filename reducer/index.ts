import { combineReducers } from 'redux'

const user = (state = null, action) => {
  switch (action.type) {
    case `SUBSCRIBE_USER_DATA_RECEIVE`:
      return action.user || null
    default:
      return state
  }
}

export default combineReducers({
  user,
})
