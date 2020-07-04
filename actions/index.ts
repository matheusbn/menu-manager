import Restaurant from 'models/Restaurant'
export * from './user'
export * from './restaurant'
export * from './menuItems'

export const fetchInitialData = user => async dispatch => {
  const restaurant = await Restaurant.fromUser(user.uid)

  dispatch({
    type: 'SET_RESTAURANT',
    restaurant,
  })
  const menuItems = await restaurant.getMenuItems()
  dispatch({
    type: 'SET_MENU_ITEMS',
    menuItems,
  })
}
