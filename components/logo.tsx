"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

export function Logo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    canvas.width = 40 * dpr
    canvas.height = 40 * dpr
    ctx.scale(dpr, dpr)

    // Draw the abstract continuous line
    ctx.strokeStyle = "#2D2D34" // Changed back to original dark color
    ctx.lineWidth = 1
    ctx.beginPath()

    // Start point
    ctx.moveTo(10, 30)

    // Draw a continuous line representing query and result convergence
    ctx.bezierCurveTo(10, 15, 20, 10, 30, 10)
    ctx.bezierCurveTo(35, 10, 38, 15, 30, 20)
    ctx.bezierCurveTo(25, 23, 15, 25, 20, 30)
    ctx.bezierCurveTo(25, 35, 35, 30, 30, 25)

    ctx.stroke()
  }, [])

  return (
    <Link href="/" className="flex items-center space-x-3">
      <canvas ref={canvasRef} className="w-10 h-10" style={{ width: "40px", height: "40px" }} />
      <span className="font-obviously font-medium tracking-[0.25em] uppercase text-deep-graphite">
        DEEP<span className="text-silver">DIVE</span>
      </span>
    </Link>
  )
}
