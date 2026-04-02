export default function Work() {
    const projects = [
        {
            title: "DxnMar",
            description: "Full Stack E-commerce platform built with React and Tailwind.",
            link: "https://dxnmar.vercel.app",
            type: "Web App",
            bgImage: "./assets/work-1.png"
        },
        {
            title: "Smart Life Maroc",
            description: "Modern IoT and Smart Home solutions interface.",
            link: "https://click-shop-ma.vercel.app",
            type: "E-commerce",
            bgImage: "./assets/work-2.png"
        },
        {
            title: "ICAN 2025",
            description: "Event Management and Registration platform.",
            link: "https://can2025-zeta.vercel.app",
            type: "Event App",
            bgImage: "./assets/work-3.png"
        },
        {
            title: "Verrell Portfolio",
            description: "Premium photography and design portfolio.",
            link: "https://verrell.vercel.app",
            type: "Portfolio",
            bgImage: "./assets/work-4.png"
        },
        {
            title: "Allo Clean",
            description: "Professional cleaning service booking platform.",
            link: "https://allo-clean.vercel.app",
            type: "Service Platform",
            bgImage: "./assets/work-1.png"
        },
        {
            title: "BeldiChic",
            description: "Traditional Moroccan fashion e-commerce site.",
            link: "https://beldichic.vercel.app",
            type: "E-commerce",
            bgImage: "./assets/work-2.png"
        },
        {
            title: "Jad Cosmetics",
            description: "Beauty and cosmetics products store.",
            link: "https://jadcosmetics.vercel.app",
            type: "Shop",
            bgImage: "./assets/work-3.png"
        },
        {
            title: "Jad Phone",
            description: "Store for smartphones and accessories.",
            link: "https://jadphone.vercel.app",
            type: "Shop",
            bgImage: "./assets/work-4.png"
        }
    ];

    return (
        <div id="work" className="w-full px-[12%] py-10 scroll-mt-20">
            <h4 className="text-center mb-2 text-lg font-Ovo">My Portfolio</h4>
            <h2 className="text-center text-5xl font-Ovo">My Latest Projects</h2>
            <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
                I am a Full Stack Developer creating modern, scalable and user-friendly digital solutions, mostly deployed on Vercel.
            </p>

            <div className="grid grid-cols-auto gap-5 my-10 dark:text-black">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative group cursor-pointer"
                        style={{ backgroundImage: `url(${project.bgImage})` }}
                    >
                        <div className="bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7">
                            <div>
                                <h2 className="font-semibold">{project.title}</h2>
                                <p className="text-sm text-gray-700">{project.type}</p>
                            </div>
                            <a 
                                href={project.link} 
                                target="_blank" 
                                rel="noreferrer"
                                className="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition"
                            >
                                <img src="./assets/send-icon.png" alt="send icon" className="w-5" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <a 
                href="https://vercel.com/lamtaifi19989-gmailcoms-projects" 
                target="_blank" 
                rel="noreferrer"
                className="w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto my-20 hover:bg-lightHover duration-500 dark:text-white dark:border-white dark:hover:bg-darkHover"
            >
                Show more (Jad Lamtaifi on Vercel)
                <img src="./assets/right-arrow-bold.png" alt="Right arrow" className="w-4 dark:hidden" />
                <img src="./assets/right-arrow-bold-dark.png" alt="Right arrow" className="w-4 hidden dark:block" />
            </a>
        </div>
    );
}