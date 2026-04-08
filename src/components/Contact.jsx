import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
    const [result, setResult] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get("name");
        const message = formData.get("message");
        const email = formData.get("email");

        setResult("Redirection vers WhatsApp....");

        const phoneNumber = "212621924487";
        const whatsappMsg = `Bonjour Jad Lamtaifi! Mon nom est ${name}. %0A%0A ${message} %0A%0A Mon Email: ${email}`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMsg}`;

        setTimeout(() => {
            window.open(whatsappUrl, "_blank");
            setResult("Message prêt sur WhatsApp !");
        }, 1000);

        event.target.reset();
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            id="contact" className="w-full px-[12%] py-10 scroll-mt-20 bg-[url('./assets/footer-bg-color.png')] bg-no-repeat bg-[length:90%_auto] bg-center dark:bg-none"
        >
            <motion.h4 
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center mb-2 text-lg font-Ovo"
            >
                Restons en contact
            </motion.h4>

            <motion.h2 
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-center text-5xl font-Ovo"
            >
                Contactez-moi
            </motion.h2>

            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo"
            >
                J&apos;aimerais avoir de vos nouvelles ! Si vous avez des questions ou des projets, envoyez-moi un message sur WhatsApp, Email ou via mes réseaux sociaux.
            </motion.p>

            <div className="flex flex-col md:flex-row gap-10 max-w-4xl mx-auto">
                <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="flex flex-col gap-6 w-full md:w-1/3"
                >
                    <div className="flex items-center gap-3 text-gray-700 dark:text-white/80">
                        <img src="./assets/mail_icon.png" alt="" className="w-6 dark:invert" />
                        <p>lamtaifijad@outlook.fr</p>
                    </div>
                    <a href="https://linkedin.com/in/jad-lamtaifi" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-700 dark:text-white/80 hover:text-blue-600 transition">
                        <img src="./assets/linkedin-icon.png" alt="" className="w-6" />
                        <p>LinkedIn</p>
                    </a>
                    <a href="https://github.com/lamtaifi" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-700 dark:text-white/80 hover:text-black dark:hover:text-white transition">
                        <img src="./assets/github.svg" alt="" className="w-6 dark:invert" />
                        <p>GitHub</p>
                    </a>
                </motion.div>

                <motion.form 
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    onSubmit={onSubmit} className="flex-1"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <input type="text" placeholder="Votre nom" className="flex-1 px-3 py-2 focus:ring-1 outline-none border border-gray-300 dark:border-white/30 rounded-md bg-white dark:bg-darkHover/30" required name="name" />
                        <input type="email" placeholder="Votre email" className="flex-1 px-3 py-2 focus:ring-1 outline-none border border-gray-300 dark:border-white/30 rounded-md bg-white dark:bg-darkHover/30" required name="email" />
                    </div>
                    <textarea rows="6" placeholder="Votre message" className="w-full px-4 py-2 focus:ring-1 outline-none border border-gray-300 dark:border-white/30 rounded-md bg-white mb-6 dark:bg-darkHover/30" required name="message"></textarea>
                    
                    <button type='submit' className="py-2 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full mx-auto md:mx-0 hover:bg-black duration-500 dark:bg-transparent dark:border dark:border-white/30 dark:hover:bg-darkHover">
                        Envoyer un message
                        <img src="./assets/right-arrow-white.png" alt="" className="w-4" />
                    </button>
                    <p className='mt-4 text-center md:text-left'>{result}</p>
                </motion.form>
            </div>
        </motion.div>
    )
}