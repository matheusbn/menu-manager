import RestaurantService from 'services/restaurant'

export const setRestaurant = restaurant => ({
  type: 'SET_RESTAURANT',
  restaurant,
})

export const updateRestaurant = data => async (dispatch, getState) => {
  const { restaurant } = getState()
  const restaurantService = new RestaurantService(restaurant.ref)

  try {
    if (data.coverPicture && data.coverPicture instanceof File) {
      const coverUrl = await restaurantService.updatePicture(data.coverPicture)
      data.coverPicture = coverUrl
    }

    console.log(data)
    await restaurantService.update(data)

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
  const restaurantService = new RestaurantService(restaurant.ref)

  try {
    const codes = await restaurantService.generateCodes(amount)
    if (restaurant.data.tableCodes?.length)
      codes.push(...restaurant.data.tableCodes)

    dispatch({
      type: 'UPDATE_RESTAURANT_DATA',
      data: { tableCodes: codes },
    })
  } catch (e) {
    console.error('error updating restaurant data:', e)
  }
}
