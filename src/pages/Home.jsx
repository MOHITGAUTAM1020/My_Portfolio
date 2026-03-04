import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const PROJECTS = [
  {
    title: "Freshopure POS",
    type: "Point of Sale System",
    description:
      "A robust, cloud-based Point of Sale interface engineered for fast transaction processing and real-time inventory management.",
    tech: ["React", "Redux", "Node.js", "MongoDB", "Tailwind CSS"],
    live: "https://pos.freshopure.com/login",
    code: null,
  },
  {
    title: "FreshoFoods App",
    type: "Mobile Application",
    description:
      "A seamless mobile experience allowing users to pre-order meals, skip canteen lines, and handle seamless smart payments.",
    tech: ["React Native Cli", "Redux", "Socket.io", "Node.js"],
    live: "#",
    code: null,
  },
  {
    title: "Freshopure Commercial",
    type: "Corporate Website",
    description:
      "The primary digital storefront and brand identity platform for Freshopure, driving customer acquisition and brand trust.",
    tech: ["React", "jQuery", "Tailwind CSS", "Vercel"],
    live: "https://www.freshopure.com/",
    code: null,
  },
  {
    title: "Freshopure AI Procurement",
    type: "HoReCa B2B Platform",
    description:
      "An advanced, AI-driven procurement platform designed specifically for the HoReCa sector to streamline supply chains.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    live: "https://ai.freshopure.com/",
    code: null,
  },
];

const SKILLS = [
  "React",
  "React Native",
  "jQuery",
  "Tailwind CSS",
  "Socket.io",
  "Node.js",
  "Express",
  "MongoDB",
  "MySQL",
];

// ==========================================
// COMPONENTS
// ==========================================

const Navbar = ({ dark, toggleTheme }) => (
  <nav className="fixed top-0 w-full z-50 bg-[#FAFAFA]/90 dark:bg-[#0A0A0A]/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/80 transition-colors duration-500">
    <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
      <a
        href="#home"
        className="text-xl font-black tracking-tighter uppercase text-zinc-900 dark:text-zinc-100"
      >
        MOHIT GAUTAM
      </a>
      <div className="hidden md:flex items-center space-x-10 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
        <a
          href="#about"
          className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          About
        </a>
        <a
          href="#projects"
          className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          Work
        </a>
        <a
          href="#contact"
          className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          Contact
        </a>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-900 dark:text-zinc-100 hover:opacity-60 transition-opacity"
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section
    id="home"
    className="min-h-screen flex flex-col justify-center px-6 pt-20"
  >
    <div className="max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-500 dark:text-zinc-400 mb-8 border-l-2 border-zinc-900 dark:border-zinc-100 pl-4">
          Software Engineer — Based in Jaipur
        </p>
        <h1 className="text-6xl md:text-8xl lg:text-[11rem] font-black uppercase tracking-tighter leading-[0.85] text-zinc-900 dark:text-zinc-100 mb-10">
          I build <br className="hidden md:block" />
          <span className="text-zinc-400 dark:text-zinc-600">
            scalable
          </span>{" "}
          <br className="hidden md:block" />
          systems.
        </h1>
        <div className="flex flex-wrap items-center gap-6 mt-16">
          <a
            href="#projects"
            className="px-10 py-5 bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 font-bold uppercase tracking-widest text-xs hover:bg-zinc-700 dark:hover:bg-white transition-colors"
          >
            See My Work
          </a>
          <a
            href='/Mohit_Gautam.pdf'
            download
            className="px-10 py-5 border-2 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100 font-bold uppercase tracking-widest text-xs hover:bg-zinc-900 hover:text-zinc-50 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-colors"
          >
            Download CV
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const About = () => (
  <section
    id="about"
    className="py-40 px-6 border-t border-zinc-200 dark:border-zinc-800/80"
  >
    <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16">
      <div className="md:col-span-4">
        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900 dark:text-zinc-100">
          The Details
        </h2>
      </div>
      <div className="md:col-span-8 space-y-16">
        <div className="text-2xl md:text-4xl font-light leading-snug text-zinc-700 dark:text-zinc-300">
          <p className="mb-8">
            I am a Full Stack Developer specializing in React, Node.js, and
            modern infrastructure. I don't just write code; I engineer solutions
            that solve actual business problems.
          </p>
          <p>
            With a focus on clean architecture, performance, and
            maintainability, I turn complex requirements into elegant, robust
            web applications.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800/80 pb-6 mb-8">
            Core Technologies
          </h3>
          <div className="flex flex-wrap gap-3">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="px-5 py-3 border border-zinc-300 dark:border-zinc-800 text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-widest hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-zinc-200 dark:border-zinc-800/80">
          <div>
            <div className="text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter">
              5+
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-3">
              Projects Shipped
            </div>
          </div>
          <div>
            <div className="text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter">
              1+
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-3">
              Years Exp.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Projects = () => {
  // 1. Add state to track if we are showing all projects
  const [showAll, setShowAll] = useState(false);

  // 2. Slice the array to show either 2 projects, or all of them
  const visibleProjects = showAll ? PROJECTS : PROJECTS.slice(0, 2);

  return (
    <section
      id="projects"
      className="py-40 px-6 bg-[#F5F5F5] dark:bg-[#111111] border-t border-zinc-200 dark:border-zinc-800/80 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-8">
          <h2 className="text-6xl md:text-8xl font-black font-display uppercase tracking-tighter text-zinc-900 dark:text-zinc-100 leading-[0.85]">
            Selected <br /> Work
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-sm text-lg leading-relaxed">
            The Freshopure ecosystem: from corporate branding to complex B2B
            procurement and mobile POS infrastructure.
          </p>
        </div>

        <div className="space-y-0">
          {/* 3. Map over visibleProjects instead of the full PROJECTS array */}
          {visibleProjects.map((project, idx) => (
            <motion.div
              key={project.title} // Using title as key is safer when array length changes
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group grid md:grid-cols-12 gap-12 items-center border-t border-zinc-300 dark:border-zinc-800 py-16"
            >
              {/* Left Side: Text Content */}
              <div className="md:col-span-5 flex flex-col justify-between h-full pr-8">
                <div>
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-500 mb-6 block">
                    0{idx + 1} // {project.type}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-black font-display uppercase tracking-tighter text-zinc-900 dark:text-zinc-100 mb-6">
                    {project.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-10 text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 bg-zinc-200/50 dark:bg-zinc-800/50 px-3 py-2"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex gap-6">
                  {project.live !== "#" && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 hover:text-zinc-500 dark:hover:text-zinc-500 transition-colors border-b border-zinc-900 dark:border-zinc-100 pb-1"
                    >
                      Open Live Site ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Right Side: Live Iframe Preview */}
              <div className="md:col-span-7 relative bg-zinc-200 dark:bg-zinc-900 aspect-4/3 md:aspect-16/10 rounded-lg overflow-hidden flex flex-col border border-zinc-300 dark:border-zinc-800 shadow-2xl group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors duration-500">
                <div className="h-8 bg-zinc-300 dark:bg-zinc-950 flex items-center px-4 gap-2 border-b border-zinc-300 dark:border-zinc-800">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
                  </div>
                  <div className="mx-auto bg-zinc-200 dark:bg-zinc-900 px-3 py-0.5 rounded text-[10px] text-zinc-500 dark:text-zinc-400 font-mono truncate max-w-50">
                    {project.live !== "#"
                      ? project.live.replace("https://", "")
                      : "Freshopure Foods App"}
                  </div>
                  <div className="w-10"></div>
                </div>

                <div className="flex-1 relative bg-white dark:bg-black overflow-hidden pointer-events-none group-hover:pointer-events-auto">
                  {project.live !== "#" ? (
                    <iframe
                      src={project.live}
                      title={`${project.title} Preview`}
                      className="w-full h-full border-none"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 bg-zinc-100 dark:bg-zinc-900 font-mono text-sm uppercase tracking-widest">
                      {/* <span>📱 Native App</span>
                      <span className="text-xs mt-2 text-zinc-500">
                        Preview via TestFlight / APK
                      </span> */}
                      <img src="../TAP_N_PAY.png" alt="" className="" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 4. Update Button to Toggle State */}
        {PROJECTS.length > 2 && (
          <div className="mt-24 flex justify-center border-t border-zinc-300 dark:border-zinc-800 pt-16">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-4 text-sm font-bold uppercase tracking-[0.2em] text-zinc-900 dark:text-zinc-100 hover:text-zinc-500 transition-colors cursor-pointer"
            >
              {showAll ? "Show Less" : "View More Projects"}
              <span
                className={`transition-transform duration-300 ${showAll ? "-rotate-90" : "group-hover:translate-x-2"}`}
              >
                {showAll ? "↑" : "→"}
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const Contact = () => {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    // Grab the form data
    const formData = new FormData(e.target);

    try {
      // REPLACE THIS URL WITH YOUR ACTUAL FORMSPREE URL
      const response = await fetch("https://formspree.io/f/mdalqdzk", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("sent");
        e.target.reset(); // Clear the form fields after success

        // Reset the button text after 3 seconds
        setTimeout(() => setStatus(null), 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="py-40 px-6 border-t border-zinc-200 dark:border-zinc-800/80"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24">
        <div>
          <h2 className="text-7xl md:text-9xl font-black font-display uppercase tracking-tighter text-zinc-900 dark:text-zinc-100 mb-8 leading-[0.85]">
            Let's <br /> Talk.
          </h2>
          <p className="text-2xl font-light text-zinc-600 dark:text-zinc-400 mb-16 max-w-md leading-relaxed">
            Currently open to new opportunities, freelance projects, and
            open-source collaborations.
          </p>

          <div className="space-y-8 text-xs font-bold tracking-[0.2em] uppercase text-zinc-900 dark:text-zinc-100">
            <a
              href="mailto:mohitgautam1020@gmail.com"
              className="block hover:text-zinc-500 transition-colors border-b border-zinc-200 dark:border-zinc-800/80 pb-4"
            >
              Email // mohitgautam1020@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/mohitgautamm/"
              target="_blank"
              className="block hover:text-zinc-500 transition-colors border-b border-zinc-200 dark:border-zinc-800/80 pb-4"
            >
              LinkedIn // /in/mohitgautam
            </a>
            <a
              href="https://github.com/MOHITGAUTAM1020"
              target="_blank"
              className="block hover:text-zinc-500 transition-colors border-b border-zinc-200 dark:border-zinc-800/80 pb-4"
            >
              GitHub // @MOHITGAUTAM1020
            </a>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-12">
            <div>
              <input
                required
                type="text"
                name="name" /* NAME ATTRIBUTE IS REQUIRED FOR FORMSPREE */
                placeholder="YOUR NAME"
                className="w-full bg-transparent border-b-2 border-zinc-300 dark:border-zinc-800 py-4 text-2xl font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-zinc-900 dark:focus:border-zinc-100 focus:outline-none transition-colors rounded-none"
              />
            </div>
            <div>
              <input
                required
                type="email"
                name="email" /* NAME ATTRIBUTE IS REQUIRED FOR FORMSPREE */
                placeholder="EMAIL ADDRESS"
                className="w-full bg-transparent border-b-2 border-zinc-300 dark:border-zinc-800 py-4 text-2xl font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-zinc-900 dark:focus:border-zinc-100 focus:outline-none transition-colors rounded-none"
              />
            </div>
            <div>
              <textarea
                required
                rows="4"
                name="message" /* NAME ATTRIBUTE IS REQUIRED FOR FORMSPREE */
                placeholder="PROJECT DETAILS"
                className="w-full bg-transparent border-b-2 border-zinc-300 dark:border-zinc-800 py-4 text-2xl font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-zinc-900 dark:focus:border-zinc-100 focus:outline-none transition-colors rounded-none resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className={`w-full py-8 font-black uppercase tracking-[0.2em] text-sm transition-colors disabled:opacity-50 
                ${
                  status === "error"
                    ? "bg-red-500 text-white"
                    : "bg-zinc-900 dark:bg-zinc-100 text-[#FAFAFA] dark:text-[#0A0A0A] hover:bg-zinc-700 dark:hover:bg-white"
                }`}
            >
              {status === "sending"
                ? "TRANSMITTING..."
                : status === "sent"
                  ? "RECEIVED."
                  : status === "error"
                    ? "SYSTEM ERROR - TRY AGAIN"
                    : "SUBMIT INQUIRY"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// MAIN APP WRAPPER
// ==========================================
export default function Portfolio() {
  const [dark, setDark] = useState(false);

  // Initialize theme based on user's system preference or past visits
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDark(true);
    } else {
      setDark(false);
    }
  }, []);

  // Apply the theme to the HTML tag whenever it changes
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] transition-colors duration-500 font-sans text-zinc-900 dark:text-zinc-100 selection:bg-zinc-900 selection:text-[#FAFAFA] dark:selection:bg-zinc-100 dark:selection:text-[#0A0A0A]">
      <Navbar dark={dark} toggleTheme={() => setDark(!dark)} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <footer className="py-12 px-6 flex flex-col md:flex-row justify-between items-center text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 border-t border-zinc-200 dark:border-zinc-800/80">
        <p>© {new Date().getFullYear()} MOHIT GAUTAM.</p>
        <p className="mt-4 md:mt-0">ALL SYSTEMS NOMINAL.</p>
      </footer>
    </div>
  );
}
