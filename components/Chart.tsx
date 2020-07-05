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

const Chart = (props: ChartProps) => {
  const chart = useRef(null)

  useEffect(() => {
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
