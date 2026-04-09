import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Html, SoftShadows } from '@react-three/drei'
import { AnimatePresence, motion } from 'framer-motion'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import About from '../components/About'
import Services from '../components/Services'
import Work from '../components/Work'
import Contact from '../components/Contact'

function useKeyboard() {
    const keysRef = useRef({
        forward: false,
        back: false,
        left: false,
        right: false,
        enter: false,
    })

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.repeat) return
            if (e.code === 'KeyW' || e.code === 'ArrowUp') keysRef.current.forward = true
            if (e.code === 'KeyS' || e.code === 'ArrowDown') keysRef.current.back = true
            if (e.code === 'KeyA' || e.code === 'ArrowLeft') keysRef.current.left = true
            if (e.code === 'KeyD' || e.code === 'ArrowRight') keysRef.current.right = true
            if (e.code === 'KeyE') keysRef.current.enter = true
        }
        const onKeyUp = (e) => {
            if (e.code === 'KeyW' || e.code === 'ArrowUp') keysRef.current.forward = false
            if (e.code === 'KeyS' || e.code === 'ArrowDown') keysRef.current.back = false
            if (e.code === 'KeyA' || e.code === 'ArrowLeft') keysRef.current.left = false
            if (e.code === 'KeyD' || e.code === 'ArrowRight') keysRef.current.right = false
            if (e.code === 'KeyE') keysRef.current.enter = false
        }
        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('keyup', onKeyUp)
        return () => {
            window.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('keyup', onKeyUp)
        }
    }, [])

    return keysRef
}

function clamp(n, a, b) {
    return Math.min(b, Math.max(a, n))
}

function City({ buildings, activeBuildingId, nearbyBuildingId, onBuildingClick, onEnterHint }) {
    return (
        <group>
            {/* ground */}
            <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -0.001, 0]}>
                <planeGeometry args={[140, 140]} />
                <meshStandardMaterial color="#cfe6d8" />
            </mesh>

            {/* roads */}
            <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
                <planeGeometry args={[110, 10]} />
                <meshStandardMaterial color="#b3b8c6" />
            </mesh>
            <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
                <planeGeometry args={[10, 110]} />
                <meshStandardMaterial color="#b3b8c6" />
            </mesh>

            {/* parking pads */}
            <mesh receiveShadow rotation-x={-Math.PI / 2} position={[32, 0.0005, 32]}>
                <planeGeometry args={[18, 14]} />
                <meshStandardMaterial color="#a6adbd" />
            </mesh>
            <mesh receiveShadow rotation-x={-Math.PI / 2} position={[-32, 0.0005, 32]}>
                <planeGeometry args={[18, 14]} />
                <meshStandardMaterial color="#a6adbd" />
            </mesh>
            <mesh receiveShadow rotation-x={-Math.PI / 2} position={[32, 0.0005, -32]}>
                <planeGeometry args={[18, 14]} />
                <meshStandardMaterial color="#a6adbd" />
            </mesh>
            <mesh receiveShadow rotation-x={-Math.PI / 2} position={[-32, 0.0005, -32]}>
                <planeGeometry args={[18, 14]} />
                <meshStandardMaterial color="#a6adbd" />
            </mesh>

            {buildings.map((b) => {
                const isActive = activeBuildingId === b.id
                const isNearby = nearbyBuildingId === b.id
                return (
                    <group key={b.id} position={b.position}>
                        <mesh
                            castShadow
                            receiveShadow
                            onPointerDown={(e) => {
                                e.stopPropagation()
                                onBuildingClick?.(b.id)
                            }}
                        >
                            <boxGeometry args={b.size} />
                            <meshStandardMaterial color={isActive ? '#6aa9ff' : isNearby ? '#8ad1ff' : b.color} />
                        </mesh>
                        <mesh castShadow receiveShadow position={[0, b.size[1] / 2 + 0.25, 0]}>
                            <boxGeometry args={[b.size[0] * 0.6, 0.5, b.size[2] * 0.6]} />
                            <meshStandardMaterial color={isActive ? '#96c7ff' : '#e8f2ff'} />
                        </mesh>

                        {isNearby ? (
                            <Html center position={[0, b.size[1] / 2 + 2.4, 0]} transform distanceFactor={10}>
                                <div className="select-none px-3 py-2 rounded-xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-sm text-xs text-slate-900">
                                    <div className="font-semibold">{b.label}</div>
                                    <div className="opacity-80">Press <span className="font-semibold">E</span> to enter</div>
                                </div>
                            </Html>
                        ) : null}
                    </group>
                )
            })}

            {onEnterHint ? onEnterHint : null}
        </group>
    )
}

function CarController({ buildings, onNearbyChange, onEnterBuilding, locked, onCarXZChange, parkTarget }) {
    const keysRef = useKeyboard()
    const carRef = useRef()
    const velRef = useRef(new THREE.Vector3(0, 0, 0))
    const yawRef = useRef(0)

    useEffect(() => {
        if (carRef.current) {
            carRef.current.position.set(0, 0.35, 44)
            yawRef.current = Math.PI
        }
    }, [])

    const scratch = useMemo(() => ({
        forward: new THREE.Vector3(),
        right: new THREE.Vector3(),
    }), [])

    // eslint-disable-next-line react/no-unknown-property
    return (
        <mesh ref={carRef} castShadow>
            <boxGeometry args={[1.6, 0.6, 3.2]} />
            <meshStandardMaterial color="#ff4d6d" />
            <mesh castShadow position={[0, 0.55, -0.2]}>
                <boxGeometry args={[1.2, 0.5, 1.4]} />
                <meshStandardMaterial color="#ffd6e0" />
            </mesh>
            <CarRuntime
                carRef={carRef}
                keysRef={keysRef}
                velRef={velRef}
                yawRef={yawRef}
                scratch={scratch}
                buildings={buildings}
                onNearbyChange={onNearbyChange}
                onEnterBuilding={onEnterBuilding}
                locked={locked}
                onCarXZChange={onCarXZChange}
                parkTarget={parkTarget}
            />
        </mesh>
    )
}

function CarRuntime({ carRef, keysRef, velRef, yawRef, scratch, buildings, onNearbyChange, onEnterBuilding, locked, onCarXZChange, parkTarget }) {
    const enterLatchRef = useRef(false)

    // run physics + proximity each frame
    useFrame((state, dt) => {
        const car = carRef.current
        if (!car) return

        const keys = keysRef.current
        const vel = velRef.current

        const maxDt = 1 / 30
        dt = Math.min(dt, maxDt)

        // movement params
        const accel = 50
        const maxSpeed = 30
        const turnSpeed = 3.5
        const drag = 5
        const lateralGrip = 14

        scratch.forward.set(Math.sin(yawRef.current), 0, Math.cos(yawRef.current)).normalize()
        scratch.right.set(scratch.forward.z, 0, -scratch.forward.x)

        if (!locked) {
            const throttle = (keys.forward ? 1 : 0) + (keys.back ? -1 : 0)
            const speed = vel.dot(scratch.forward)

            // turning: stronger when moving
            const steer = (keys.left ? 1 : 0) + (keys.right ? -1 : 0)
            const steerFactor = clamp(Math.abs(speed) / 6, 0, 1)
            yawRef.current += steer * turnSpeed * steerFactor * dt * (speed >= 0 ? 1 : -1)

            // forward acceleration
            vel.addScaledVector(scratch.forward, throttle * accel * dt)

            // drag
            vel.addScaledVector(vel, -drag * dt)

            // clamp max speed
            const forwardSpeed = vel.dot(scratch.forward)
            const lateralSpeed = vel.dot(scratch.right)
            const clampedForward = clamp(forwardSpeed, -maxSpeed * 0.6, maxSpeed)

            // reduce sideways sliding
            const desiredLateral = THREE.MathUtils.lerp(lateralSpeed, 0, clamp(lateralGrip * dt, 0, 1))
            vel.copy(scratch.forward.clone().multiplyScalar(clampedForward).add(scratch.right.clone().multiplyScalar(desiredLateral)))
        } else {
            // auto-park + ease to stop while in a section
            vel.addScaledVector(vel, -12 * dt)
            if (parkTarget) {
                const tpos = parkTarget.position
                car.position.x = THREE.MathUtils.lerp(car.position.x, tpos[0], clamp(6 * dt, 0, 1))
                car.position.z = THREE.MathUtils.lerp(car.position.z, tpos[2], clamp(6 * dt, 0, 1))
                yawRef.current = THREE.MathUtils.lerp(yawRef.current, parkTarget.yaw, clamp(6 * dt, 0, 1))
            }
        }

        car.position.addScaledVector(vel, dt)
        car.position.y = 0.35
        car.rotation.y = yawRef.current
        onCarXZChange?.([car.position.x, car.position.z])

        // keep in bounds
        car.position.x = clamp(car.position.x, -55, 55)
        car.position.z = clamp(car.position.z, -55, 55)

        // nearby building detection
        let nearest = null
        let nearestDist = Infinity
        for (const b of buildings) {
            const dx = car.position.x - b.position[0]
            const dz = car.position.z - b.position[2]
            const d = Math.sqrt(dx * dx + dz * dz)
            if (d < nearestDist) {
                nearestDist = d
                nearest = b
            }
        }
        const nearby = nearest && nearestDist < 8.5 ? nearest.id : null
        onNearbyChange(nearby)

        if (keys.enter && nearby && !enterLatchRef.current) {
            enterLatchRef.current = true
            onEnterBuilding(nearby)
        }
        if (!keys.enter) enterLatchRef.current = false

        // camera follow
        const cam = state.camera
        const targetDist = locked ? 8 : 14
        const targetHeight = locked ? 6 : 7.5
        const behind = scratch.forward.clone().multiplyScalar(-targetDist)
        const desiredPos = new THREE.Vector3(car.position.x, 0, car.position.z).add(behind)
        desiredPos.y = targetHeight
        cam.position.lerp(desiredPos, 1 - Math.pow(0.0005, dt))

        const lookAt = new THREE.Vector3(car.position.x, car.position.y + 1.2, car.position.z)
        cam.lookAt(lookAt)
    })

    return null
}

function GlassPanel({ title, onClose, children }) {
    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[80] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="absolute inset-0 bg-black/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                />

                <motion.div
                    className="relative w-full max-w-5xl max-h-[85vh] overflow-auto rounded-3xl border border-white/25 bg-white/55 backdrop-blur-2xl shadow-xl dark:bg-darkTheme/60"
                    initial={{ y: 18, scale: 0.98, opacity: 0 }}
                    animate={{ y: 0, scale: 1, opacity: 1 }}
                    exit={{ y: 18, scale: 0.98, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                >
                    <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-5 py-4 border-b border-white/20 bg-white/30 backdrop-blur-2xl dark:bg-darkTheme/30">
                        <div className="font-semibold text-slate-900 dark:text-white">{title}</div>
                        <button
                            className="px-3 py-1.5 rounded-full bg-white/60 hover:bg-white/80 border border-white/30 transition dark:bg-white/10 dark:hover:bg-white/15 dark:text-white"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                    <div className="px-1">
                        {children}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

function MiniMap({ buildings, carXZ }) {
    const size = 150
    const world = 120
    const toMini = (x) => ((x / world) * (size / 2)) + size / 2
    return (
        <div className="fixed bottom-6 left-6 z-[70] w-[170px]">
            <div className="rounded-2xl border border-white/20 bg-white/55 backdrop-blur-2xl shadow-sm p-3 dark:bg-darkTheme/50">
                <div className="text-xs font-semibold text-slate-900 dark:text-white">Mini map</div>
                <div className="mt-2 relative" style={{ width: size, height: size }}>
                    <div className="absolute inset-0 rounded-xl bg-slate-900/10 dark:bg-white/10" />
                    {buildings.map((b) => (
                        <div
                            key={b.id}
                            className="absolute w-2 h-2 rounded-sm bg-slate-900/60 dark:bg-white/70"
                            style={{
                                left: toMini(b.position[0]) - 4,
                                top: toMini(b.position[2]) - 4,
                            }}
                            title={b.label}
                        />
                    ))}
                    <div
                        className="absolute w-3 h-3 rounded-full bg-rose-500 shadow"
                        style={{
                            left: toMini(carXZ[0]) - 6,
                            top: toMini(carXZ[1]) - 6,
                        }}
                        title="You"
                    />
                </div>
            </div>
        </div>
    )
}

export default function ThreeCityPortfolio({ onExit }) {
    const buildings = useMemo(() => ([
        { id: 'about', label: 'About', position: [-32, 6, 32], size: [10, 12, 10], color: '#8ecae6' },
        { id: 'projects', label: 'Projects', position: [32, 7, 32], size: [12, 14, 12], color: '#bde0fe' },
        { id: 'skills', label: 'Skills', position: [-32, 5, -32], size: [11, 10, 11], color: '#cdb4db' },
        { id: 'experience', label: 'Experience', position: [32, 6, -32], size: [10, 12, 10], color: '#a2d2ff' },
        { id: 'contact', label: 'Contact', position: [0, 5, 0], size: [10, 10, 10], color: '#ffd6a5' },
    ]), [])

    const [nearby, setNearby] = useState(null)
    const [active, setActive] = useState(null)
    const [locked, setLocked] = useState(false)
    const [carXZ, setCarXZ] = useState([0, 44])
    const [parkTarget, setParkTarget] = useState(null)

    const content = useMemo(() => ({
        about: { title: 'About', node: <About /> },
        projects: { title: 'Projects', node: <Work /> },
        skills: { title: 'Skills', node: <Services /> },
        experience: {
            title: 'Experience',
            node: (
                <div className="w-full px-[12%] py-10">
                    <h4 className="text-center mb-2 text-lg font-Ovo">Timeline</h4>
                    <h2 className="text-center text-5xl font-Ovo">Experience</h2>
                    <div className="max-w-3xl mx-auto mt-10 grid gap-4">
                        {[
                            { role: 'Full Stack Developer', place: 'Freelance / Client work', time: '2019 — Present', desc: 'Web apps, dashboards, e-commerce, and modern UI systems.' },
                            { role: 'Frontend Developer', place: 'Projects & collaborations', time: '2016 — 2019', desc: 'React UI, performance, and responsive design.' },
                        ].map((x) => (
                            <div key={x.role} className="rounded-2xl border border-white/20 bg-white/50 backdrop-blur-xl p-6 dark:bg-darkHover/40">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="font-semibold text-slate-900 dark:text-white">{x.role}</div>
                                    <div className="text-sm opacity-70 text-slate-700 dark:text-white/70">{x.time}</div>
                                </div>
                                <div className="mt-1 text-sm text-slate-700 dark:text-white/80">{x.place}</div>
                                <div className="mt-3 text-slate-700 dark:text-white/80">{x.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ),
        },
        contact: { title: 'Contact', node: <Contact /> },
    }), [])

    const activeContent = active ? content[active] : null

    const [musicOn, setMusicOn] = useState(false)
    const [musicAvailable, setMusicAvailable] = useState(true)
    const audioRef = useRef(null)

    useEffect(() => {
        if (!audioRef.current) return
        if (!musicAvailable) return
        if (musicOn) {
            audioRef.current.volume = 0.25
            audioRef.current.play().catch(() => {})
        } else {
            audioRef.current.pause()
        }
    }, [musicOn, musicAvailable])

    const enterSection = (id) => {
        setActive(id)
        setLocked(true)
        const map = {
            about: { position: [-26, 0.35, 38], yaw: -Math.PI / 2 },
            projects: { position: [26, 0.35, 38], yaw: Math.PI / 2 },
            skills: { position: [-26, 0.35, -38], yaw: -Math.PI / 2 },
            experience: { position: [26, 0.35, -38], yaw: Math.PI / 2 },
            contact: { position: [0, 0.35, 8], yaw: Math.PI },
        }
        setParkTarget(map[id] ?? null)
    }

    return (
        <div className="fixed inset-0 bg-gradient-to-b from-sky-100 to-emerald-100 dark:from-[#090914] dark:to-[#11001F]">
            <audio
                ref={audioRef}
                src="/assets/ambient.mp3"
                loop
                preload="none"
                onError={() => setMusicAvailable(false)}
            />

            <div className="absolute top-5 left-5 z-[70] flex items-center gap-2">
                <button
                    onClick={onExit}
                    className="px-4 py-2 rounded-full border border-white/20 bg-white/60 backdrop-blur-xl shadow-sm hover:bg-white/80 transition dark:bg-darkTheme/60 dark:hover:bg-darkTheme/80 dark:text-white"
                >
                    Exit 3D
                </button>
                <button
                    onClick={() => setMusicOn((v) => !v)}
                    disabled={!musicAvailable}
                    className="px-4 py-2 rounded-full border border-white/20 bg-white/60 backdrop-blur-xl shadow-sm hover:bg-white/80 transition dark:bg-darkTheme/60 dark:hover:bg-darkTheme/80 dark:text-white"
                    title="Optional ambient music"
                >
                    Music: {!musicAvailable ? 'Add /public/assets/ambient.mp3' : musicOn ? 'On' : 'Off'}
                </button>
            </div>

            <div className="absolute top-5 right-5 z-[70] hidden sm:block">
                <div className="px-4 py-2 rounded-2xl border border-white/20 bg-white/55 backdrop-blur-2xl shadow-sm text-sm text-slate-900 dark:bg-darkTheme/55 dark:text-white">
                    <div className="font-semibold">Controls</div>
                    <div className="opacity-80">W/S or ↑/↓ move • A/D turn • E enter</div>
                </div>
            </div>

            <div className="absolute top-24 left-5 z-[70] hidden md:block">
                <div className="rounded-2xl border border-white/20 bg-white/55 backdrop-blur-2xl shadow-sm p-3 dark:bg-darkTheme/55">
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">Sections</div>
                    <div className="mt-2 grid grid-cols-1 gap-2 w-[160px]">
                        {buildings.map((b) => (
                            <button
                                key={b.id}
                                onClick={() => enterSection(b.id)}
                                className="text-left px-3 py-2 rounded-xl border border-white/20 bg-white/50 hover:bg-white/80 transition text-sm text-slate-900 dark:bg-white/5 dark:hover:bg-white/10 dark:text-white"
                                title={`Open ${b.label}`}
                            >
                                {b.label}
                            </button>
                        ))}
                    </div>
                    <div className="mt-2 text-[11px] text-slate-700 dark:text-white/70">
                        Astuce: tu peux aussi cliquer un bâtiment.
                    </div>
                </div>
            </div>

            <MiniMap buildings={buildings} carXZ={carXZ} />

            {/* Mobile Controls */}
            <div className="fixed bottom-10 right-10 z-[70] flex flex-col gap-2 md:hidden">
                <div className="flex justify-center">
                    <button 
                        onPointerDown={() => keysRef.current.forward = true}
                        onPointerUp={() => keysRef.current.forward = false}
                        className="w-14 h-14 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center border border-white/20 active:bg-white/60"
                    >
                        ↑
                    </button>
                </div>
                <div className="flex gap-2">
                    <button 
                        onPointerDown={() => keysRef.current.left = true}
                        onPointerUp={() => keysRef.current.left = false}
                        className="w-14 h-14 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center border border-white/20 active:bg-white/60"
                    >
                        ←
                    </button>
                    <button 
                        onPointerDown={() => keysRef.current.back = true}
                        onPointerUp={() => keysRef.current.back = false}
                        className="w-14 h-14 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center border border-white/20 active:bg-white/60"
                    >
                        ↓
                    </button>
                    <button 
                        onPointerDown={() => keysRef.current.right = true}
                        onPointerUp={() => keysRef.current.right = false}
                        className="w-14 h-14 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center border border-white/20 active:bg-white/60"
                    >
                        →
                    </button>
                </div>
                <button 
                    onClick={() => {
                        if (nearby) enterSection(nearby)
                    }}
                    className="mt-2 w-full h-12 rounded-xl bg-blue-500/60 text-white backdrop-blur-md font-bold"
                >
                    ENTER (E)
                </button>
            </div>

            <Canvas
                shadows
                camera={{ position: [0, 8, 18], fov: 55, near: 0.1, far: 400 }}
                gl={{ antialias: true }}
                onCreated={({ gl }) => {
                    gl.setClearColor('#eaf6ff')
                    gl.shadowMap.enabled = true
                    gl.shadowMap.type = THREE.PCFSoftShadowMap
                }}
            >
                <SoftShadows size={18} samples={12} focus={0.7} />
                <ambientLight intensity={0.55} color="#ffffff" />
                <directionalLight
                    castShadow
                    intensity={1.25}
                    color="#fff7e8"
                    position={[18, 26, 14]}
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-camera-near={1}
                    shadow-camera-far={80}
                    shadow-camera-left={-35}
                    shadow-camera-right={35}
                    shadow-camera-top={35}
                    shadow-camera-bottom={-35}
                />

                <Suspense fallback={null}>
                    <Environment preset="city" />
                </Suspense>

                <City
                    buildings={buildings}
                    activeBuildingId={active}
                    nearbyBuildingId={nearby}
                    onBuildingClick={(id) => enterSection(id)}
                />

                <CarController
                    buildings={buildings}
                    locked={locked}
                    onNearbyChange={(id) => setNearby(id)}
                    onEnterBuilding={(id) => enterSection(id)}
                    onCarXZChange={setCarXZ}
                    parkTarget={parkTarget}
                />
            </Canvas>

            {activeContent ? (
                <GlassPanel
                    title={activeContent.title}
                    onClose={() => {
                        setActive(null)
                        setLocked(false)
                        setParkTarget(null)
                    }}
                >
                    {activeContent.node}
                </GlassPanel>
            ) : null}

            <AnimatePresence>
                {!active ? (
                    <motion.div
                        className="fixed bottom-6 right-6 z-[70] w-[260px] hidden md:block"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                    >
                        <div className="rounded-2xl border border-white/20 bg-white/55 backdrop-blur-2xl shadow-sm p-4 dark:bg-darkTheme/55">
                            <div className="font-semibold text-slate-900 dark:text-white">Where to go</div>
                            <div className="mt-1 text-sm text-slate-700 dark:text-white/80">
                                Drive near a building to see its label, then press <span className="font-semibold">E</span>.
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                                {buildings.map((b) => (
                                    <div
                                        key={b.id}
                                        className="rounded-xl border border-white/20 bg-white/40 px-3 py-2 dark:bg-white/5"
                                    >
                                        {b.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    )
}

