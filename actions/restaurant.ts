export const setRestaurant = restaurant => ({
  type: 'SET_RESTAURANT',
  restaurant,
})

export const updateRestaurant = fields => async (dispatch, getState) => {
  const { restaurant } = getState()

  try {
    if (fields.coverPicture && fields.coverPicture instanceof File) {
      await restaurant.updatePicture(fields.coverPicture)
      delete fields.coverPicture
    }
    await restaurant.update(fields)

    dispatch({
      type: 'UPDATE_RESTAURANT',
      fields,
    })
  } catch (e) {
    console.error('error updating restaurant fields:', e)
  }
}
