import { combineReducers } from 'redux'

const user = (state = null, action) => {
  switch (action.type) {
    case `SET_USER`:
      return action.user
    default:
      return state
  }
}

export default combineReducers({
  user,
})
