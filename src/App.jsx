import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import ClassicPortfolio from './components/ClassicPortfolio'

const ThreeCityPortfolio = lazy(() => import('./three/ThreeCityPortfolio'))

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(() => window.matchMedia?.('(max-width: 900px)').matches ?? false)

    useEffect(() => {
        const mq = window.matchMedia?.('(max-width: 900px)')
        if (!mq) return
        const onChange = (e) => setIsMobile(e.matches)
        mq.addEventListener?.('change', onChange)
        return () => mq.removeEventListener?.('change', onChange)
    }, [])

    return isMobile
}

export default function App() {
    const isMobile = useIsMobile()
    const initialMode = useMemo(() => (isMobile ? 'classic' : 'three'), [isMobile])
    const [mode, setMode] = useState(initialMode)

    useEffect(() => setMode(initialMode), [initialMode])

    if (mode === 'three') {
        return (
            <Suspense fallback={<div className="min-h-screen grid place-items-center">Loading 3D…</div>}>
                <ThreeCityPortfolio onExit={() => setMode('classic')} />
            </Suspense>
        )
    }

    return <ClassicPortfolio onEnter3D={!isMobile ? () => setMode('three') : undefined} />
}