import Restaurant from 'models/Restaurant'
export * from './user'
export * from './restaurant'
export * from './menuItems'

export const fetchInitialData = user => async dispatch => {
  const restaurant = await Restaurant.fromUser(user.uid)
  if (!restaurant) throw new Error('no restaurant registered yet')

  dispatch({
    type: 'SET_RESTAURANT',
    restaurant,
  })

  const menuItemsSnapshot = await restaurant.getMenuItems()

  console.log(menuItemsSnapshot)

  dispatch({
    type: 'SET_MENU_ITEMS',
    menuItems: menuItemsSnapshot.map(snapshot => ({
      ref: snapshot.ref,
      data: snapshot.data(),
    })),
  })
}
