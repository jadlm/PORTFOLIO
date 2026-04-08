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
            id="about" className="w-full px-[12%] py-10 scroll-mt-20"
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

            <div className="flex w-full flex-col lg:flex-row items-center gap-20 my-20">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-max mx-auto relative"
                >
                    <img src='./assets/user-image.png' alt="Jad Lamtaifi" className="w-64 sm:w-80 rounded-3xl max-w-none shadow-xl" />
                </motion.div>

                <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex-1"
                >
                    <p className="mb-10 max-w-2xl font-Ovo text-gray-700 dark:text-white/80">
                        Je suis un développeur Full Stack passionné par la création d&apos;applications web modernes, évolutives et réactives. 
                        Je me spécialise dans le développement frontend et backend, en utilisant des technologies comme React, Next.js, Node.js et Tailwind CSS pour créer des solutions numériques efficaces et conviviales.
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
                        {data.map((item, index) => (
                            <motion.li 
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                key={item.name} 
                                className="border border-gray-300 dark:border-white/30 rounded-xl p-6 cursor-pointer hover:bg-lightHover duration-500 hover:shadow-black dark:hover:shadow-white/20 dark:hover:bg-darkHover/50"
                            >
                                <img src={item.icon1} alt="" className="w-7 mt-3 dark:hidden" />
                                <img src={item.icon2} alt="" className="w-7 mt-3 hidden dark:block" />
                                <h3 className="my-4 font-semibold text-gray-700 dark:text-white text-sm">{item.name}</h3>
                                <p className="text-gray-600 text-[10px] dark:text-white/80">{item.description}</p>
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
                </motion.div>
            </div>
        </motion.div>
    )
}