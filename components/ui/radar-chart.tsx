"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Chart,
  type ChartConfiguration,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

// Register the required Chart.js components
Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

export interface RadarChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string
    borderColor: string
    borderWidth: number
  }[]
}

interface RadarChartProps {
  title: string
  data: RadarChartData
  height?: number
  width?: number
}

export function RadarChart({ title, data, height = 300, width = 300 }: RadarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Create new chart
    const config: ChartConfiguration = {
      type: "radar",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20,
              backdropColor: "rgba(0, 0, 0, 0)",
            },
            grid: {
              color: "rgba(255, 0, 0, 0.1)",
            },
            angleLines: {
              color: "rgba(255, 0, 0, 0.1)",
            },
            pointLabels: {
              font: {
                size: 12,
              },
              color: "#666",
            },
          },
        },
        plugins: {
          legend: {
            position: "bottom",
          },
          tooltip: {
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            titleColor: "#333",
            bodyColor: "#666",
            borderColor: "#ddd",
            borderWidth: 1,
            padding: 10,
            displayColors: true,
            callbacks: {
              label: (context) => `${context.dataset.label}: ${context.raw}%`,
            },
          },
        },
      },
    }

    chartInstance.current = new Chart(ctx, config)

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return (
    <Card >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: `${height}px`, width: "100%" }}>
          <canvas ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  )
}
