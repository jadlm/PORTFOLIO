import { motion } from 'framer-motion'
export default function Header() {
    return (
        <div id="top" className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4">
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
            >
                <img src="./assets/profile-img.png" alt="Jad Lamtaifi" className="rounded-full w-32" />
            </motion.div>
            
            <motion.h3 
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-end gap-2 text-xl md:text-2xl mb-3 font-Ovo"
            >
                Salut ! Je suis Jad Lamtaifi
                <img src="./assets/hand-icon.png" alt="" className="w-6 mb-1" />
            </motion.h3>

            <motion.h1 
                initial={{ y: -30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-3xl sm:text-6xl lg:text-[66px] font-Ovo leading-tight px-4 break-words"
            >
                Développeur Full Stack / Front-End
            </motion.h1>

            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="max-w-2xl mx-auto font-Ovo"
            >
                Je construis des applications web modernes, évolutives et centrées sur l&apos;utilisateur, en utilisant les dernières technologies du marché.
            </motion.p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                <motion.a 
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    href="#contact"
                    className="px-10 py-2.5 border rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white flex items-center gap-2 dark:border-transparent"
                >
                    Me contacter <img src="./assets/right-arrow-white.png" alt="" className="w-4" />
                </motion.a>

                <motion.a 
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    href="./assets/dev-icon.png" download
                    className="px-10 py-2.5 rounded-full border border-gray-300 dark:border-white/25 hover:bg-slate-100/70 dark:hover:bg-darkHover flex items-center gap-2 bg-white dark:bg-transparent dark:text-white"
                >
                    Mon CV <img src="./assets/download-icon.png" alt="" className="w-4 dark:invert" />
                </motion.a>
            </div>
        </div>
    )
}