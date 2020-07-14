import RestaurantService from 'services/restaurant'
export * from './user'
export * from './restaurant'
export * from './menuItems'

export const fetchInitialData = user => async dispatch => {
  const restaurantSnapshot = await RestaurantService.getSnapshotByUser(user.uid)
  if (!restaurantSnapshot) throw new Error('no restaurant registered yet')

  const restaurant = {
    ref: restaurantSnapshot.ref,
    data: restaurantSnapshot.data(),
  }

  const restaurantService = new RestaurantService(restaurant.ref)

  dispatch({
    type: 'SET_RESTAURANT',
    restaurant,
  })

  const menuItemsSnapshot = await restaurantService.getMenuItems()

  dispatch({
    type: 'SET_MENU_ITEMS',
    menuItems: menuItemsSnapshot.map(snapshot => ({
      ref: snapshot.ref,
      data: snapshot.data(),
    })),
  })
}
