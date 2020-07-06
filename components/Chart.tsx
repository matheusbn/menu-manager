import React, { useEffect, useRef } from 'react'
import Chartjs from 'chart.js'

type Datasets = {
  label?: string
  color: string
  data: number[]
}

interface ChartProps {
  type: string
  data: {
    labels: string[]
    datasets: Datasets[]
  }
  options?: object
}

const Chart = (props: Chartjs.ChartConfiguration) => {
  const chart: React.MutableRefObject<Chartjs | null> = useRef(null)

  useEffect(() => {
    if (chart.current == null || !props.data) return

    chart.current.data = props.data
    chart.current.update()
  }, [props.data])

  const loadChart = element => {
    if (!element) return

    const ctx = element.getContext('2d')
    chart.current = new Chartjs(ctx, {
      options: {
        legend: {
          display: false,
        },
      },
      ...props,
    })
  }

  return <canvas ref={loadChart}></canvas>
}

export default Chart
