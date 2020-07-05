export const setRestaurant = restaurant => ({
  type: 'SET_RESTAURANT',
  restaurant,
})

export const updateRestaurant = data => async (dispatch, getState) => {
  const { restaurant } = getState()

  try {
    if (data.coverPicture && data.coverPicture instanceof File) {
      const coverUrl = await restaurant.updatePicture(data.coverPicture)
      data.coverPicture = coverUrl
    }
    await restaurant.update(data)

    dispatch({
      type: 'UPDATE_RESTAURANT_DATA',
      data,
    })
  } catch (e) {
    console.error('error updating restaurant data:', e)
  }
}
