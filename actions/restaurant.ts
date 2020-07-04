export const setRestaurant = restaurant => ({
  type: 'SET_RESTAURANT',
  restaurant,
})

export const updateRestaurant = (fields: object) => async (
  dispatch,
  getState
) => {
  const { restaurant } = getState()

  try {
    const result = await restaurant.update(fields)

    return {
      type: 'UPDATE_RESTAURANT',
      fields,
    }
  } catch (e) {
    console.error('error updating restaurant fields:', e)
  }
}
