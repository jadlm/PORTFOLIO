import { motion } from 'framer-motion'
export default function Work() {
    const projects = [
        {
            title: "DxnMar",
            description: "Plateforme E-commerce full stack avec gestion de panier et paiements.",
            technologies: "React, Tailwind, Node.js",
            role: "Développeur Lead",
            link: "https://dxnmar.vercel.app",
            type: "Web App",
            bgImage: "./assets/work-1.png"
        },
        {
            title: "ICAN 2025",
            description: "Plateforme de gestion d'événements et d'inscription en ligne.",
            technologies: "Next.js, Firebase",
            role: "Développeur Front-End",
            link: "https://can2025-zeta.vercel.app",
            type: "Event App",
            bgImage: "./assets/work-2.png"
        },
        {
            title: "Allo Clean",
            description: "Service de réservation en ligne pour prestations de nettoyage.",
            technologies: "React, Express, MongoDB",
            role: "Full Stack Developer",
            link: "https://allo-clean.vercel.app",
            type: "Service Platform",
            bgImage: "./assets/work-3.png"
        },
        {
            title: "BeldiChic",
            description: "Boutique en ligne spécialisée dans la mode traditionnelle marocaine.",
            technologies: "React, Tailwind CSS",
            role: "Développeur UI/UX",
            link: "https://beldichic.vercel.app",
            type: "E-commerce",
            bgImage: "./assets/work-4.png"
        }
    ];

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            id="work" className="w-full px-[12%] py-10 scroll-mt-20"
        >
            <motion.h4 
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center mb-2 text-lg font-Ovo"
            >
                Mon Portfolio
            </motion.h4>

            <motion.h2 
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-center text-5xl font-Ovo"
            >
                Mes Projets Récents
            </motion.h2>

            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo"
            >
                Je suis un développeur Full Stack spécialisé dans la création de solutions numériques modernes, évolutives et conviviales.
            </motion.p>

            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-auto gap-5 my-10 dark:text-black"
            >
                {projects.map((project, index) => (
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        key={index}
                        className="aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative group cursor-pointer"
                        style={{ backgroundImage: `url(${project.bgImage})` }}
                    >
                        <div className="bg-white w-11/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7 shadow-lg">
                            <div className="pr-2">
                                <h2 className="font-semibold text-sm sm:text-base">{project.title}</h2>
                                <p className="text-[10px] sm:text-xs text-gray-700 font-medium">{project.technologies}</p>
                                <p className="text-[10px] text-blue-600 font-bold uppercase mt-1">{project.role}</p>
                            </div>
                            <a 
                                href={project.link} 
                                target="_blank" 
                                rel="noreferrer"
                                className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition shrink-0"
                            >
                                <img src="./assets/send-icon.png" alt="send icon" className="w-5" />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <motion.a 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                href="https://vercel.com/lamtaifi19989-gmailcoms-projects" 
                target="_blank" 
                rel="noreferrer"
                className="w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto my-20 hover:bg-lightHover duration-500 dark:text-white dark:border-white dark:hover:bg-darkHover"
            >
                Voir plus
                <img src="./assets/right-arrow-bold.png" alt="Right arrow" className="w-4 dark:hidden" />
                <img src="./assets/right-arrow-bold-dark.png" alt="Right arrow" className="w-4 hidden dark:block" />
            </motion.a>
        </motion.div>
    );
}