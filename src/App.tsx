import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import './components/Hero.css'

const STAGE_W = 1440
const STAGE_H = 1024

export default function App() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const fit = () =>
      setScale(Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  return (
    <div className="viewport">
      <div
        className="stage"
        style={{
          width: STAGE_W,
          height: STAGE_H,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      >
        <Hero />
      </div>
    </div>
  )
}
