import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import HeroMobile from './components/HeroMobile'
import './components/Hero.css'
import './components/HeroMobile.css'

const STAGE_W = 1440
const STAGE_H = 1024
const MOBILE_QUERY = '(max-width: 767px)'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches)

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const onChange = () => setIsMobile(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return isMobile
}

function DesktopStage() {
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

export default function App() {
  return useIsMobile() ? <HeroMobile /> : <DesktopStage />
}
