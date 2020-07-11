import MenuItem from 'models/MenuItem'
import 'firebase/storage'
import 'firebase/firestore'

export const setMenuItems = (menuItems: {
  ref: firebase.firestore.DocumentReference
  data: object
}) => ({
  type: 'SET_MENU_ITEMS',
  menuItems,
})

export const updateMenuItemData = (
  ref: firebase.firestore.DocumentReference,
  data: object
) => dispatch => {
  ref.update(data)

  dispatch({
    type: 'UPDATE_MENU_ITEM_DATA',
    ref,
    data,
  })
}
