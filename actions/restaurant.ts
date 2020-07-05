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

export const generateCodes = (amount: number) => async (dispatch, getState) => {
  const { restaurant } = getState()

  try {
    const codes = await restaurant.generateCodes(amount)
    const tableCodes = [...restaurant.data.tableCodes, ...codes]

    dispatch({
      type: 'UPDATE_RESTAURANT_DATA',
      data: { tableCodes },
    })
  } catch (e) {
    console.error('error updating restaurant data:', e)
  }
}
