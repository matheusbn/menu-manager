import React, { useMemo, useState, useEffect } from 'react'
import { useTheme } from '@material-ui/core/styles'
import Chart from 'components/Chart'
import { useSelector } from 'react-redux'

const ClientPerDayChart = () => {
  const theme = useTheme()
  const restaurant = useSelector(state => state.restaurant)
  const [datasets, setDatasets] = useState([])
  const labels = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo',
  ]
  useMemo(() => getSessionsPerDay(), [restaurant])

  async function getSessionsPerDay() {
    if (!restaurant) return

    const perDay = await restaurant.avgSessionsPerDay()

    // removes the "-feira" from each weekday name
    const normalizedWeekdays = Object.entries(perDay).reduce(
      (acc, [k, v]) => ({ ...acc, [k.replace('-feira', '')]: v }),
      {}
    )

    // maps each session amount to the correct position based on the labels order
    const sessionsPerDay = labels
      .map(l => l.toLowerCase())
      .map(l => normalizedWeekdays[l] || 0)

    setDatasets([
      {
        data: sessionsPerDay,
        backgroundColor: `${theme.palette.primary.main}bb`,
      },
    ])
  }

  const chartProps = {
    type: 'bar',
    data: {
      labels,
      datasets: datasets || [],
    },
  }

  return <Chart {...chartProps} />
}

export default ClientPerDayChart
