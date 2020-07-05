const second = 1000
const min = 60 * second
const hour = 60 * min
const day = 24 * hour
const week = 7 * day

function compareAsc(e1, e2) {
  if (e1 < e2) return -1
  if (e1 > e2) return 1

  return 0
}

/**
 * returns the number of distinct weeks in a list of dates
 */
export const getNumberOfWeeks = (dates: Date[]): number => {
  if (dates.length < 2) return 1
  const ordered = dates.slice().sort(compareAsc)

  const milliDifference =
    ordered[ordered.length - 1].getTime() - ordered[0].getTime()
  return Math.floor(milliDifference / week) || 1
}
