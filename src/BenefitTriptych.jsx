import { useEffect, useRef, useState } from 'react'
import BanknoteArt from './BanknoteArt'

const heights = [20, 33, 48, 56, 51, 47, 39, 31, 53, 55, 60, 56, 100, 92, 76, 67, 62, 65, 59, 70, 74, 87, 83, 77]

function useResponsiveCanvas(draw) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return undefined
    const render = () => draw(canvas)
    const observer = new ResizeObserver(render)
    observer.observe(canvas)
    render()
    return () => observer.disconnect()
  }, [draw])

  return ref
}

function sizeCanvas(canvas) {
  const rect = canvas.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = Math.max(1, Math.round(rect.width * dpr))
  canvas.height = Math.max(1, Math.round(rect.height * dpr))
  const context = canvas.getContext('2d')
  context.setTransform(dpr, 0, 0, dpr, 0, 0)
  context.clearRect(0, 0, rect.width, rect.height)
  return { context, width: rect.width, height: rect.height }
}

function roundedPolygon(context, points, roundness) {
  const before = []
  const after = []
  points.forEach((point, index) => {
    const previous = points[(index - 1 + points.length) % points.length]
    const next = points[(index + 1) % points.length]
    before.push([point[0] + (previous[0] - point[0]) * roundness, point[1] + (previous[1] - point[1]) * roundness])
    after.push([point[0] + (next[0] - point[0]) * roundness, point[1] + (next[1] - point[1]) * roundness])
  })
  context.moveTo(after[0][0], after[0][1])
  points.forEach((point, index) => {
    const nextIndex = (index + 1) % points.length
    context.lineTo(before[nextIndex][0], before[nextIndex][1])
    context.quadraticCurveTo(points[nextIndex][0], points[nextIndex][1], after[nextIndex][0], after[nextIndex][1])
  })
  context.closePath()
}

function drawSparkles(canvas) {
  const { context, width, height } = sizeCanvas(canvas)
  const sparkles = [{ x: 0.01, y: 0.01, size: 0.5 }, { x: 0.28, y: 0.26, size: 0.72 }]
  const points = [[0.5, 0.06], [0.59, 0.41], [0.94, 0.5], [0.59, 0.59], [0.5, 0.94], [0.41, 0.59], [0.06, 0.5], [0.41, 0.41]]

  sparkles.forEach((sparkle) => {
    const size = Math.min(width, height) * sparkle.size
    const mapped = points.map(([x, y]) => [width * sparkle.x + x * size, height * sparkle.y + y * size])
    context.beginPath()
    roundedPolygon(context, mapped, 0.34)
    context.fillStyle = 'rgba(255,220,202,.55)'
    context.strokeStyle = '#fff'
    context.lineWidth = Math.max(1.1, size * 0.15)
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.shadowColor = 'rgba(255,255,255,.78)'
    context.shadowBlur = size * 0.06
    context.fill()
    context.stroke()
    context.shadowBlur = 0
  })
}

function drawFlow(canvas) {
  const { context, width, height } = sizeCanvas(canvas)
  const bands = [
    { source: [.08, .26], target: [.29, .32], color: 'rgba(255,189,144,.60)' },
    { source: [.23, .42], target: [.30, .335], color: 'rgba(255,149,80,.70)' },
    { source: [.50, .75], target: [.32, .355], color: 'rgba(255,136,64,.82)' },
    { source: [.69, .98], target: [.33, .365], color: 'rgba(255,181,128,.54)' },
    { source: [.39, .51], target: [.31, .345], color: 'rgba(255,105,0,.96)' },
  ]
  const threads = [
    { source: .05, target: .30, alpha: .68 }, { source: .20, target: .315, alpha: .60 },
    { source: .62, target: .342, alpha: .84 }, { source: .82, target: .352, alpha: .74 },
    { source: .97, target: .36, alpha: .64 },
  ]

  bands.forEach((band) => {
    context.beginPath()
    context.moveTo(0, height * band.source[0])
    context.bezierCurveTo(width * .38, height * band.source[0], width * .74, height * band.target[0], width, height * band.target[0])
    context.lineTo(width, height * band.target[1])
    context.bezierCurveTo(width * .74, height * band.target[1], width * .38, height * band.source[1], 0, height * band.source[1])
    context.closePath()
    context.fillStyle = band.color
    context.fill()
  })

  threads.forEach((thread) => {
    context.beginPath()
    context.moveTo(0, height * thread.source)
    context.bezierCurveTo(width * .38, height * thread.source, width * .74, height * thread.target, width, height * thread.target)
    context.strokeStyle = `rgba(255,255,255,${thread.alpha})`
    context.lineWidth = Math.max(.72, width * .00135)
    context.stroke()
  })
}

function SparkleCanvas() {
  const ref = useResponsiveCanvas(drawSparkles)
  return <canvas className="reference-magic" ref={ref} aria-hidden="true" />
}

function DecisionCanvas() {
  const ref = useResponsiveCanvas(drawFlow)
  return <canvas className="reference-decision-flow" ref={ref} aria-label="Decision paths converging into an optimized result" />
}

function VisibilityCard() {
  return (
    <article className="reference-card">
      <div className="reference-panel" aria-label="Visibility timeline chart">
        <div className="reference-timeline"><span>06 AM</span><i /><span>12 PM</span><i /><span>06 PM</span></div>
        <div className="reference-bars" aria-hidden="true">{heights.map((height, index) => <i className={`reference-bar ${index === 12 ? 'is-active' : ''}`} style={{ '--h': `${height}%` }} key={index} />)}</div>
        <div className="reference-value-chip">4.7M MAD</div>
        <div className="reference-axis"><span>START</span><span>ACTIVE</span><span>PEAK</span><span>COMPLETE</span></div>
      </div>
      <div className="reference-card-copy"><h2>Instant Visibility</h2><p>Real-time data across your<br />operations.</p><span className="reference-corner-icon"><i className="reference-spark" /></span></div>
    </article>
  )
}

function WorkflowCard() {
  const [automated, setAutomated] = useState(false)
  return (
    <article className={`reference-card ${automated ? 'is-automated' : ''}`}>
      <div className="reference-panel">
        <div className="reference-assistant-head"><span className="reference-badge"><i className="reference-spark" /></span><span>Agent 71</span></div>
        <p className="reference-question">How can I help you automate?</p>
        <div className="reference-prompt">When a quote is approved, create the invoice,<br />reserve the stock, and notify finance.</div>
        <button className="reference-automate" type="button" onClick={() => setAutomated(true)}><span>{automated ? 'Automated' : 'Automate'}</span><SparkleCanvas /></button>
        <i className="reference-cursor" aria-hidden="true" />
      </div>
      <div className="reference-card-copy"><h2>Connected Workflows</h2><p>Automate processes with<br />Agent 71.</p><span className="reference-corner-icon"><i className="reference-flow-icon" /></span></div>
    </article>
  )
}

function DecisionsCard() {
  return (
    <article className="reference-card">
      <div className="reference-panel">
        <div className="reference-card-metric"><div>Time saved</div><p><strong>128 Hrs</strong><span>↑ 18% efficiency</span></p></div>
        <DecisionCanvas />
        <span className="reference-tag reference-tag--action">Action: Approve</span>
        <span className="reference-tag reference-tag--confidence">Decision Confidence: 98%</span>
        <span className="reference-tag reference-tag--path">Path Optimized: +14.2%</span>
      </div>
      <div className="reference-card-copy"><h2>Faster Decisions</h2><p>Turn insights into action<br />instantly.</p><span className="reference-corner-icon"><i className="reference-speed" /></span></div>
    </article>
  )
}

export default function BenefitTriptych() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !Element.prototype.animate) {
      root.classList.add('is-ready')
      return undefined
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || root.dataset.animated) return
      root.dataset.animated = 'true'
      const cards = [...root.querySelectorAll('.reference-card')]
      const order = [1, 0, 2]
      const animations = []
      order.forEach((cardIndex, orderIndex) => {
        const card = cards[cardIndex]
        const delay = orderIndex === 0 ? 60 : 245 + (orderIndex - 1) * 85
        const drift = cardIndex === 0 ? 7 : cardIndex === 2 ? -7 : 0
        animations.push(card.animate([
          { opacity: 0, transform: `translate3d(${drift}px,16px,0) scale(.985)` },
          { opacity: 1, transform: 'none' },
        ], { duration: cardIndex === 1 ? 960 : 900, delay, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' }))
        const panel = card.querySelector('.reference-panel')
        animations.push(panel.animate([
          { opacity: 0, transform: 'scale(.994)', clipPath: 'inset(0 0 34% 0)' },
          { opacity: 1, transform: 'none', clipPath: 'inset(0 0 0 0)' },
        ], { duration: 720, delay: delay + 200, easing: 'cubic-bezier(.24,.86,.28,1)', fill: 'both' }))
        const copy = card.querySelector('.reference-card-copy')
        animations.push(copy.animate([
          { opacity: 0, transform: 'translate3d(0,11px,0)' },
          { opacity: 1, transform: 'none' },
        ], { duration: 620, delay: delay + 330, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' }))
      })
      Promise.allSettled(animations.map((animation) => animation.finished)).then(() => root.classList.add('is-ready'))
      observer.disconnect()
    }, { threshold: .25 })
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="reference-benefits" id="benefits" ref={rootRef} aria-label="Product benefits">
      <BanknoteArt variant="rural" className="currency-art--benefits" />
      <div className="reference-scene"><div className="reference-cards"><VisibilityCard /><WorkflowCard /><DecisionsCard /></div></div>
    </section>
  )
}
