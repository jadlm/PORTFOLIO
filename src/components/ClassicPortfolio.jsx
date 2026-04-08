import About from './About'
import Contact from './Contact'
import Footer from './Footer'
import Header from './Header'
import LenisScroll from './LenisScroll'
import Navbar from './Navbar'
import Services from './Services'
import Work from './Work'

export default function ClassicPortfolio({ onEnter3D }) {
    return (
        <>
            <LenisScroll />
            <Navbar />
            <Header />

            {onEnter3D ? (
                <div className="fixed bottom-6 right-6 z-[70]">
                    <button
                        onClick={onEnter3D}
                        className="px-5 py-2 rounded-full border border-white/20 bg-white/60 backdrop-blur-xl shadow-sm hover:bg-white/80 transition dark:bg-darkTheme/60 dark:hover:bg-darkTheme/80 dark:text-white"
                    >
                        Enter 3D City
                    </button>
                </div>
            ) : null}

            <About />
            <Services />
            <Work />
            <Contact />
            <Footer />
        </>
    )
}

