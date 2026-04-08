import { motion } from 'framer-motion'

export default function About() {
    const tools = [
        { name: 'Git', icon: './assets/git.png', },
        { name: 'GitHub', icon: './assets/github.svg', },
        { name: 'VS Code', icon: './assets/vscode.png', },
        { name: 'Figma', icon: './assets/figma.png', },
        { name: 'Illustrator', icon: './assets/illustrator.svg', },
        { name: 'Chrome DevTools', icon: './assets/chrome.svg', },
        { name: 'Agile/Scrum', icon: './assets/agile.svg', },
    ];

    const data = [
        {
            name: 'Langages',
            icon1: './assets/code-icon.png',
            icon2: './assets/code-icon-dark.png',
            description: 'HTML, CSS, JavaScript, React, Next.js',
        },
        {
            name: 'Éducation',
            icon1: './assets/edu-icon.png',
            icon2: './assets/edu-icon-dark.png',
            description: 'Technicien Spécialisé en Développement Informatique',
        },
        {
            name: 'Projets',
            icon1: './assets/project-icon.png',
            icon2: './assets/project-icon-dark.png',
            description: 'Plus de 8 projets réalisés avec succès',
        },
    ];
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            id="about" className="w-full px-6 sm:px-[12%] py-10 scroll-mt-20"
        >
            <motion.h4 
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center mb-2 text-lg font-Ovo"
            >
                Introduction
            </motion.h4>
            <motion.h2 
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-center text-5xl font-Ovo"
            >
                À propos de moi
            </motion.h2>

            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 my-10 lg:my-20">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-max mx-auto relative overflow-hidden"
                >
                    <img src='./assets/user-image.png' alt="Jad Lamtaifi" className="w-56 sm:w-80 rounded-3xl shadow-xl" />
                </motion.div>

                <div className="flex-1 w-full max-w-2xl mx-auto lg:mx-0">
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-10 font-Ovo text-gray-700 dark:text-white/80 text-center lg:text-left break-words px-4 lg:px-0"
                    >
                        Je suis un développeur Full Stack passionné par la création d&apos;applications web modernes, évolutives et réactives. 
                        Je me spécialise dans le développement frontend et backend, en utilisant des technologies comme React, Next.js, Node.js et Tailwind CSS pour créer des solutions numériques efficaces et conviviales.
                    </motion.p>

                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
                        {data.map((item, index) => (
                            <motion.li 
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                key={item.name} 
                                className="border border-gray-300 dark:border-white/30 rounded-xl p-4 sm:p-6 cursor-pointer hover:bg-lightHover duration-500 hover:shadow-black dark:hover:shadow-white/20 dark:hover:bg-darkHover/50 flex flex-col items-center lg:items-start"
                            >
                                <img src={item.icon1} alt="" className="w-6 sm:w-7 mt-2 dark:hidden" />
                                <img src={item.icon2} alt="" className="w-6 sm:w-7 mt-2 hidden dark:block" />
                                <h3 className="my-2 font-semibold text-gray-700 dark:text-white text-xs sm:text-sm">{item.name}</h3>
                                <p className="text-gray-600 text-[10px] leading-relaxed dark:text-white/80 text-center lg:text-left">{item.description}</p>
                            </motion.li>
                        ))}
                    </ul>
                    
                    <motion.h4 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="my-6 text-gray-700 font-Ovo dark:text-white/80"
                    >
                        Outils que j&apos;utilise
                    </motion.h4>

                    <ul className="flex items-center gap-3 sm:gap-5">
                        {tools.map((tool, index) => (
                            <motion.li 
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                                whileHover={{ y: -5 }}
                                key={tool.name} 
                                className="flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-300 dark:border-white/30 rounded-lg cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover/50 transition duration-300"
                            >
                                <img src={tool.icon} alt={tool.name} className="w-5 sm:w-7" />
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    )
}