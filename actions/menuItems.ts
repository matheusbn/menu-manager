import MenuItem from 'models/MenuItem'
import 'firebase/storage'
import 'firebase/firestore'

export const setMenuItems = (menuItems: MenuItem[]) => ({
  type: 'SET_MENU_ITEMS',
  menuItems,
})

export const updateMenuItemData = (menuItem: MenuItem, data) => dispatch => {
  menuItem.update(data)

  dispatch({
    type: 'UPDATE_MENU_ITEM_DATA',
    data,
  })
}
