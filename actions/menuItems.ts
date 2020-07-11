import { upload } from 'services/firebaseStorage'

export const setMenuItems = (menuItems: MenuItem) => ({
  type: 'SET_MENU_ITEMS',
  menuItems,
})

export const addMenuItem = (menuItem: MenuItem) => ({
  type: 'ADD_MENU_ITEM',
  menuItem,
})

export const deleteMenuItem = (menuItem: MenuItem) => async dispatch => {
  await menuItem.ref?.delete()

  dispatch({
    type: 'DELETE_MENU_ITEM',
    menuItem,
  })
}

export const updateMenuItemData = (
  ref: firebase.firestore.DocumentReference,
  data
) => async (dispatch, getState) => {
  const { restaurant } = getState()
  const file = data.pictures?.[0]

  console.log(1, file)
  if (file instanceof File) {
    console.log(2)
    const extension = file.name.split('.').pop()
    const url = await upload(
      `${restaurant.snapshot.id}/${ref.id}/picture.${extension}`,
      file
    )

    data.pictures = [url]
  }

  ref.update(data)

  dispatch({
    type: 'UPDATE_MENU_ITEM_DATA',
    ref,
    data,
  })
}
