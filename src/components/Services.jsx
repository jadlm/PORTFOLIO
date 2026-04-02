import { useState } from "react";

export default function Services() {

  // STATE (service li ma7loul)
  const [openService, setOpenService] = useState(null);

  const services = [
    {
      name: '💻 Web Development',
      icon: './assets/web-icon.png',
      description: 'I build modern and responsive websites using the latest web technologies.',
      fullDescription:
        'I build fast, secure, and responsive websites using modern technologies. From frontend interfaces to backend systems and databases, I create complete web solutions tailored to your needs.',
      link: '#',
    },
    {
      name: '⚙️ Full Stack Applications',
      icon: './assets/mobile-icon.png',
      description: 'Development of dynamic web applications with authentication',
      fullDescription:
        'Development of dynamic web applications with authentication, dashboards, APIs, and database integration using modern frameworks and best practices.',
      link: '#',
    },
    {
      name: '🎨 UI / UX Design',
      icon: './assets/ui-icon.png',
      description: 'Designing clean and user-friendly interfaces.',
      fullDescription:
        'I design intuitive UI/UX experiences focused on usability, accessibility and modern visual trends to improve user engagement.',
      link: '#',
    },
    {
      name: '🛒 E-Commerce Solutions',
      icon: './assets/graphics-icon.png',
      description: 'Creation of online stores with product management.',
      fullDescription:'Creation of online stores with product management, shopping cart, order systems, and payment or WhatsApp integration for business growth.',
      link: '#',
    }
  ];

  return (
    <div id="services" className="w-full px-[12%] py-10 scroll-mt-20">

      <h4 className="text-center mb-2 text-lg font-Ovo">
        What I Offer
      </h4>

      <h2 className="text-center text-5xl font-Ovo">
        My Services
      </h2>

      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
        I am a Full Stack Developer creating modern, scalable and user-friendly digital solutions.
      </p>

      {/* SERVICES GRID */}
      <div className="grid grid-cols-auto gap-6 my-10">

        {services.map((service, index) => (

          <div
            key={service.name}
            className="border border-gray-300 dark:border-white/30 rounded-lg px-8 py-12 hover:shadow-black cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 dark:hover:bg-darkHover dark:hover:shadow-white"
          >

            <img src={service.icon} alt="" className="w-10" />

            <h3 className="text-lg my-4 text-gray-700 dark:text-white">
              {service.name}
            </h3>

            {/* DESCRIPTION */}
            <p
              className={`text-sm text-gray-600 leading-5 dark:text-white/80 transition-all duration-500 ${
                openService === index ? "text-base" : ""
              }`}
            >
              {openService === index
                ? service.fullDescription
                : service.description}
            </p>

            {/* BUTTON */}
            <button
              onClick={() =>
                setOpenService(openService === index ? null : index)
              }
              className="flex items-center gap-2 text-sm mt-5"
            >
              {openService === index ? "Show less" : "Read more"}
              <img
                src="./assets/right-arrow.png"
                alt=""
                className="w-4"
              />
            </button>

          </div>

        ))}

      </div>
    </div>
  );
}