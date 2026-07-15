"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

import { useLanguage } from "@/components/language-provider"

type Node = {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  layer: number
  pulse: number
  pulseSpeed: number
  radius: number
  mass: number
}

type Edge = {
  from: number
  to: number
  weight: number
}

type Signal = {
  edgeIndex: number
  progress: number
  speed: number
  strength: number
}

const MAGNET_RADIUS = 160
const MAGNET_STRENGTH = 0.55
const SPRING = 0.045
const DAMPING = 0.86
const MAX_PULL = 55

export function NeuralNetworkGraphic() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { t, locale } = useLanguage()
  const labelsRef = useRef({
    input: t.hero.layerInput,
    hidden: t.hero.layerHidden,
    output: t.hero.layerOutput,
  })

  useEffect(() => {
    labelsRef.current = {
      input: t.hero.layerInput,
      hidden: t.hero.layerHidden,
      output: t.hero.layerOutput,
    }
  }, [t, locale])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId = 0
    let dpr = 1
    let width = 0
    let height = 0
    let nodes: Node[] = []
    let edges: Edge[] = []
    let signals: Signal[] = []
    let mouseX = -9999
    let mouseY = -9999
    let isDragging = false
    let draggedNode: Node | null = null
    let time = 0

    const layerCounts = [4, 7, 9, 7, 5, 3]

    const setCanvasDimensions = () => {
      dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildNetwork()
    }

    const buildNetwork = () => {
      nodes = []
      edges = []
      signals = []
      draggedNode = null
      isDragging = false

      const paddingX = Math.max(40, width * 0.08)
      const paddingY = Math.max(48, height * 0.12)
      const usableW = width - paddingX * 2
      const usableH = height - paddingY * 2
      const layerGap = usableW / (layerCounts.length - 1)

      const layerStartIndex: number[] = []

      layerCounts.forEach((count, layer) => {
        layerStartIndex.push(nodes.length)
        const gapY = count === 1 ? 0 : usableH / (count - 1)

        for (let i = 0; i < count; i++) {
          const x = paddingX + layer * layerGap
          const y = count === 1 ? paddingY + usableH / 2 : paddingY + i * gapY
          nodes.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
            layer,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.015 + Math.random() * 0.02,
            radius: layer === 0 || layer === layerCounts.length - 1 ? 6 : 5,
            mass: 0.8 + Math.random() * 0.5,
          })
        }
      })

      for (let layer = 0; layer < layerCounts.length - 1; layer++) {
        const fromStart = layerStartIndex[layer]
        const toStart = layerStartIndex[layer + 1]
        const fromCount = layerCounts[layer]
        const toCount = layerCounts[layer + 1]

        for (let i = 0; i < fromCount; i++) {
          for (let j = 0; j < toCount; j++) {
            if ((i + j) % 2 === 0 || Math.random() > 0.35) {
              edges.push({
                from: fromStart + i,
                to: toStart + j,
                weight: 0.25 + Math.random() * 0.75,
              })
            }
          }
        }
      }

      for (let i = 0; i < 18; i++) {
        spawnSignal()
      }
    }

    const spawnSignal = () => {
      if (edges.length === 0) return
      signals.push({
        edgeIndex: Math.floor(Math.random() * edges.length),
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.008,
        strength: 0.5 + Math.random() * 0.5,
      })
    }

    const getMousePos = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const findNearestNode = (x: number, y: number, maxDist = 28) => {
      let nearest: Node | null = null
      let minDist = maxDist
      for (const node of nodes) {
        const dist = Math.hypot(x - node.x, y - node.y)
        if (dist < minDist) {
          minDist = dist
          nearest = node
        }
      }
      return nearest
    }

    const handleMouseMove = (e: MouseEvent) => {
      const pos = getMousePos(e)
      mouseX = pos.x
      mouseY = pos.y

      if (isDragging && draggedNode) {
        draggedNode.x = mouseX
        draggedNode.y = mouseY
        draggedNode.vx = 0
        draggedNode.vy = 0
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      const pos = getMousePos(e)
      const node = findNearestNode(pos.x, pos.y)
      if (node) {
        isDragging = true
        draggedNode = node
        canvas.style.cursor = "grabbing"
      }
    }

    const handleMouseUp = () => {
      isDragging = false
      draggedNode = null
      canvas.style.cursor = "default"
    }

    const handleMouseLeave = () => {
      mouseX = -9999
      mouseY = -9999
      isDragging = false
      draggedNode = null
      canvas.style.cursor = "default"
    }

    const updatePhysics = () => {
      for (const node of nodes) {
        if (isDragging && node === draggedNode) continue

        // Spring back to home position
        let fx = (node.baseX - node.x) * SPRING
        let fy = (node.baseY - node.y) * SPRING

        // Magnet attraction toward cursor
        const dx = mouseX - node.x
        const dy = mouseY - node.y
        const dist = Math.hypot(dx, dy)

        if (dist < MAGNET_RADIUS && dist > 0.1) {
          const force = ((MAGNET_RADIUS - dist) / MAGNET_RADIUS) * MAGNET_STRENGTH
          fx += (dx / dist) * force * node.mass
          fy += (dy / dist) * force * node.mass
        }

        node.vx = (node.vx + fx) * DAMPING
        node.vy = (node.vy + fy) * DAMPING
        node.x += node.vx
        node.y += node.vy

        // Limit how far a node can be pulled from its base
        const pullX = node.x - node.baseX
        const pullY = node.y - node.baseY
        const pullDist = Math.hypot(pullX, pullY)
        if (pullDist > MAX_PULL) {
          const scale = MAX_PULL / pullDist
          node.x = node.baseX + pullX * scale
          node.y = node.baseY + pullY * scale
          node.vx *= 0.5
          node.vy *= 0.5
        }
      }

      // Update cursor when hovering a node
      if (!isDragging && mouseX > -1000) {
        const near = findNearestNode(mouseX, mouseY)
        canvas.style.cursor = near ? "grab" : "default"
      }
    }

    const draw = () => {
      time += 1
      updatePhysics()
      ctx.clearRect(0, 0, width, height)

      const glow = ctx.createRadialGradient(width * 0.55, height * 0.45, 20, width * 0.55, height * 0.45, width * 0.55)
      glow.addColorStop(0, "rgba(59, 130, 246, 0.08)")
      glow.addColorStop(1, "rgba(59, 130, 246, 0)")
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)

      // Magnet aura around cursor
      if (mouseX > -1000) {
        const magnetGlow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, MAGNET_RADIUS)
        magnetGlow.addColorStop(0, "rgba(59, 130, 246, 0.12)")
        magnetGlow.addColorStop(0.55, "rgba(59, 130, 246, 0.04)")
        magnetGlow.addColorStop(1, "rgba(59, 130, 246, 0)")
        ctx.fillStyle = magnetGlow
        ctx.beginPath()
        ctx.arc(mouseX, mouseY, MAGNET_RADIUS, 0, Math.PI * 2)
        ctx.fill()
      }

      // Elastic tethers from base to current position
      nodes.forEach((node) => {
        const pull = Math.hypot(node.x - node.baseX, node.y - node.baseY)
        if (pull > 2) {
          ctx.beginPath()
          ctx.moveTo(node.baseX, node.baseY)
          ctx.lineTo(node.x, node.y)
          ctx.strokeStyle = `rgba(147, 197, 253, ${Math.min(0.45, pull / MAX_PULL)})`
          ctx.lineWidth = 1
          ctx.setLineDash([3, 4])
          ctx.stroke()
          ctx.setLineDash([])
        }
      })

      edges.forEach((edge, index) => {
        const from = nodes[edge.from]
        const to = nodes[edge.to]
        const midX = (from.x + to.x) / 2
        const midY = (from.y + to.y) / 2
        const distToMouse = Math.hypot(mouseX - midX, mouseY - midY)
        const mouseBoost = distToMouse < 90 ? (90 - distToMouse) / 90 : 0
        const alpha = 0.08 + edge.weight * 0.12 + mouseBoost * 0.25

        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`
        ctx.lineWidth = 0.8 + edge.weight * 0.8 + mouseBoost
        ctx.stroke()

        if (index % 7 === 0) {
          const dashPulse = (Math.sin(time * 0.04 + index) + 1) / 2
          ctx.beginPath()
          ctx.moveTo(from.x, from.y)
          ctx.lineTo(to.x, to.y)
          ctx.strokeStyle = `rgba(96, 165, 250, ${0.05 + dashPulse * 0.1})`
          ctx.setLineDash([4, 10])
          ctx.lineWidth = 1
          ctx.stroke()
          ctx.setLineDash([])
        }
      })

      signals.forEach((signal) => {
        const edge = edges[signal.edgeIndex]
        if (!edge) return
        const from = nodes[edge.from]
        const to = nodes[edge.to]

        signal.progress += signal.speed
        if (signal.progress >= 1) {
          signal.progress = 0
          signal.edgeIndex = Math.floor(Math.random() * edges.length)
          signal.speed = 0.004 + Math.random() * 0.008
          signal.strength = 0.5 + Math.random() * 0.5
          nodes[edge.to].pulse = Math.PI
        }

        const progress = signal.progress
        const x = from.x + (to.x - from.x) * progress
        const y = from.y + (to.y - from.y) * progress

        const trail = ctx.createRadialGradient(x, y, 0, x, y, 10)
        trail.addColorStop(0, `rgba(147, 197, 253, ${0.9 * signal.strength})`)
        trail.addColorStop(0.4, `rgba(59, 130, 246, ${0.45 * signal.strength})`)
        trail.addColorStop(1, "rgba(59, 130, 246, 0)")
        ctx.fillStyle = trail
        ctx.beginPath()
        ctx.arc(x, y, 10, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x, y, 2.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${0.85 * signal.strength})`
        ctx.fill()
      })

      nodes.forEach((node) => {
        node.pulse += node.pulseSpeed
        const breath = (Math.sin(node.pulse) + 1) / 2
        const distToMouse = Math.hypot(mouseX - node.x, mouseY - node.y)
        const hover = distToMouse < 70 ? (70 - distToMouse) / 70 : 0
        const isActive = node === draggedNode
        const r = node.radius + breath * 1.5 + hover * 2.5 + (isActive ? 2 : 0)

        const halo = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 4)
        halo.addColorStop(0, `rgba(59, 130, 246, ${0.18 + hover * 0.25 + (isActive ? 0.2 : 0)})`)
        halo.addColorStop(1, "rgba(59, 130, 246, 0)")
        ctx.fillStyle = halo
        ctx.beginPath()
        ctx.arc(node.x, node.y, r * 4, 0, Math.PI * 2)
        ctx.fill()

        const core = ctx.createRadialGradient(node.x - 1, node.y - 1, 0, node.x, node.y, r)
        core.addColorStop(0, "#eff6ff")
        core.addColorStop(0.45, "#60a5fa")
        core.addColorStop(1, "#1d4ed8")
        ctx.beginPath()
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2)
        ctx.fillStyle = core
        ctx.fill()

        ctx.beginPath()
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.55 + hover * 0.35})`
        ctx.lineWidth = 1
        ctx.stroke()
      })

      const labels = labelsRef.current
      ctx.fillStyle = "rgba(100, 116, 139, 0.55)"
      ctx.font = "11px ui-sans-serif, system-ui, sans-serif"
      ctx.textAlign = "center"
      if (nodes.length > 0) {
        const inputNodes = nodes.filter((n) => n.layer === 0)
        const outputNodes = nodes.filter((n) => n.layer === layerCounts.length - 1)
        const midLayer = Math.floor(layerCounts.length / 2)
        const midNodes = nodes.filter((n) => n.layer === midLayer)

        if (inputNodes.length) {
          const x = inputNodes.reduce((s, n) => s + n.baseX, 0) / inputNodes.length
          const y = Math.min(...inputNodes.map((n) => n.baseY)) - 18
          ctx.fillText(labels.input, x, y)
        }
        if (midNodes.length) {
          const x = midNodes.reduce((s, n) => s + n.baseX, 0) / midNodes.length
          const y = Math.min(...midNodes.map((n) => n.baseY)) - 18
          ctx.fillText(labels.hidden, x, y)
        }
        if (outputNodes.length) {
          const x = outputNodes.reduce((s, n) => s + n.baseX, 0) / outputNodes.length
          const y = Math.min(...outputNodes.map((n) => n.baseY)) - 18
          ctx.fillText(labels.output, x, y)
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    canvas.addEventListener("mouseleave", handleMouseLeave)
    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", setCanvasDimensions)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <motion.div
      className="w-full h-[400px] md:h-[500px] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} />
    </motion.div>
  )
}
