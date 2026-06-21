import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import { FiSun, FiMoon, FiCode, FiSmartphone, FiDatabase, FiMenu, FiX } from "react-icons/fi";

const PROJECTS = [
  {
    title: "FreshoFoods App",
    type: "Mobile Application",
    description:
      "A seamless cross-platform mobile experience allowing users to pre-order meals, skip canteen lines, and handle smart NFC tap-to-pay transactions.",
    tech: ["React Native CLI", "Redux", "Socket.io", "Node.js", "NFC"],
    live: "https://play.google.com/store/apps/details?id=com.freshopurefoods",
    appStore: "https://apps.apple.com/in/app/freshopure-foods/id6772279000",
    images: ["/app_1.jpeg", "/app_2.jpeg", "/app_3.jpeg", "/app_4.jpeg"],
    code: null,
  },
  {
    title: "Freshopure Foods Web",
    type: "Event Ticketing & Food Delivery Platform",
    description:
      "An integrated web platform designed to streamline event ticket bookings and food ordering, offering users a unified experience while providing organizers with robust management tools.",
    tech: ["React", "Redux", "Node.js", "MongoDB", "Tailwind CSS"],
    live: "https://one.freshopure.com",
    images: ["/web_1.png","/web_2.png","/web_3.png","/web_4.png"],
    code: null,
  },
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
    images: ["/ai_1.png", "/ai_2.png", "/ai_3.png", "/ai_4.png"],
    code: null,
  },
];

const SKILLS = [
  "React.js",
  "React Native CLI",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Socket.io",
  "Azure Cognitive Services",
  "GPT-4o",
  "AWS Amplify",
  "Zoho Catalyst",
  "Tailwind CSS",
  "Redux",
];

// ==========================================
// CUSTOM CURSOR
// ==========================================
const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16); // offset by half width (32px / 2)
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === "a" ||
        e.target.tagName.toLowerCase() === "button" ||
        e.target.closest("a") ||
        e.target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isHovering ? 2.5 : 1,
      }}
      className={`hidden md:flex fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference items-center justify-center ${
        isHovering ? "bg-white border-0" : "border-2 border-white bg-white/20"
      }`}
    >
      <div className={`w-1 h-1 rounded-full bg-white transition-opacity duration-300 ${isHovering ? "opacity-0" : "opacity-100"}`} />
    </motion.div>
  );
};

// ==========================================
// 3D HERO SCENE
// ==========================================
const Scene3D = ({ dark }) => {
  return (
    <div className="absolute top-1/4 md:top-0 right-0 w-full md:w-1/2 h-[75%] md:h-full opacity-30 md:opacity-100 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={dark ? 0.5 : 1.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Environment preset={dark ? "night" : "city"} />
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
          <Sphere args={[1.5, 64, 64]}>
            <MeshDistortMaterial
              color={dark ? "#4f46e5" : "#6366f1"}
              attach="material"
              distort={0.5}
              speed={2}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
};

// ==========================================
// COMPONENTS
// ==========================================

const TypewriterText = ({ text }) => {
  const [displayed, setDisplayed] = useState("");
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="flex items-center">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[0.15em] h-[0.85em] bg-zinc-900 dark:bg-zinc-100 ml-1 align-middle"
      />
    </span>
  );
};

const Navbar = ({ dark, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#FAFAFA]/90 dark:bg-[#0A0A0A]/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800/80 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <a
          href="#home"
          className="text-xl font-black tracking-tighter uppercase text-zinc-900 dark:text-zinc-100 w-[200px]"
        >
          <TypewriterText text="MOHIT GAUTAM" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          <a href="#about" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            About
          </a>
          <a href="#projects" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Work
          </a>
          <a href="#contact" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Contact
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-zinc-900 dark:text-zinc-100"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#FAFAFA] dark:bg-[#0A0A0A] border-b border-zinc-200 dark:border-zinc-800 flex flex-col items-center py-10 space-y-8 md:hidden shadow-2xl"
          >
            <a onClick={() => setMenuOpen(false)} href="#about" className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-900 dark:text-zinc-100">
              About
            </a>
            <a onClick={() => setMenuOpen(false)} href="#projects" className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-900 dark:text-zinc-100">
              Work
            </a>
            <a onClick={() => setMenuOpen(false)} href="#contact" className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-900 dark:text-zinc-100">
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ dark }) => (
  <section
    id="home"
    className="min-h-screen flex flex-col justify-center px-6 pt-20 relative overflow-hidden"
  >
    <Scene3D dark={dark} />
    <div className="max-w-7xl mx-auto w-full relative z-10 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto"
      >
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-500 dark:text-zinc-400 mb-8 border-l-2 border-zinc-900 dark:border-zinc-100 pl-4">
          Software Engineer — Based in Jaipur
        </p>
        <h1 className="text-6xl md:text-8xl lg:text-[11rem] font-black uppercase tracking-tighter leading-[0.85] text-zinc-900 dark:text-zinc-100 mb-10 relative z-10">
          I build <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400">
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
    className="py-40 px-6 border-t border-zinc-200 dark:border-zinc-800/80 overflow-hidden"
  >
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16"
    >
      <div className="md:col-span-4 min-w-0">
        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900 dark:text-zinc-100 break-words">
          The Details
        </h2>
      </div>
      <div className="md:col-span-8 space-y-16 min-w-0 w-full overflow-hidden">
        <div className="text-2xl md:text-4xl font-light leading-snug text-zinc-700 dark:text-zinc-300">
          <p className="mb-8">
            I am a Full Stack Developer building production-grade MERN web applications and cross-platform mobile apps for the HoReCa SaaS industry.
          </p>
          <p>
            I specialize in real-time systems with <strong className="font-bold text-zinc-900 dark:text-zinc-100">Socket.io</strong>, integrating <strong className="font-bold text-zinc-900 dark:text-zinc-100">Azure AI & GPT-4o</strong>, and engineering hardware-to-software bridges like <strong className="font-bold text-zinc-900 dark:text-zinc-100">NFC contactless payments</strong>.
          </p>
        </div>

        <div className="overflow-hidden w-full max-w-full">
          <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-900 dark:text-zinc-100 border-b border-zinc-200 dark:border-zinc-800/80 pb-6 mb-8">
            Core Technologies
          </h3>
          <div className="relative flex overflow-hidden w-full bg-zinc-100 dark:bg-zinc-900/50 py-4 border-y border-zinc-200 dark:border-zinc-800/80">
            {/* Mask to create fade effect on edges */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#FAFAFA] via-transparent to-[#FAFAFA] dark:from-[#0A0A0A] dark:to-[#0A0A0A]" />
            <div className="flex animate-marquee whitespace-nowrap min-w-max pl-4">
              {/* Double array to create seamless loop */}
              {[...SKILLS, ...SKILLS, ...SKILLS].map((skill, idx) => (
                <span
                  key={`${skill}-${idx}`}
                  className="mx-3 px-5 py-3 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-widest hover:border-zinc-500 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-zinc-200 dark:border-zinc-800/80">
          <div>
            <div className="text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter">
              3+
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-3">
              Production Apps Live
            </div>
          </div>
          <div>
            <div className="text-5xl font-black text-zinc-900 dark:text-zinc-100 tracking-tighter">
              1.5+
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-3">
              Years Exp.
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

const Services = () => (
  <section className="py-24 px-6 bg-zinc-900 dark:bg-zinc-50 border-t border-zinc-800 dark:border-zinc-200 overflow-hidden">
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="max-w-7xl mx-auto"
    >
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-zinc-50 dark:text-zinc-900">
          Services
        </h2>
        <p className="text-zinc-400 dark:text-zinc-600 mt-4 max-w-lg">
          I partner with startups and enterprises to build high-performance products from scratch.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <FiCode size={32} className="mb-6 text-zinc-400 dark:text-zinc-500" />,
            title: "MVP Development",
            desc: "Rapid delivery of MERN stack applications. I take ideas from concept to a production-ready Web App optimized for user growth.",
          },
          {
            icon: <FiSmartphone size={32} className="mb-6 text-zinc-400 dark:text-zinc-500" />,
            title: "Cross-Platform Mobile",
            desc: "React Native applications for iOS and Android. Seamless experiences with native hardware integration like NFC and Camera.",
          },
          {
            icon: <FiDatabase size={32} className="mb-6 text-zinc-400 dark:text-zinc-500" />,
            title: "SaaS Architecture & AI",
            desc: "Building complex real-time ecosystems using Socket.io, OAuth, RBAC, and integrating powerful AI models like GPT-4o.",
          },
        ].map((s, i) => (
          <motion.div 
            whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
            key={i} 
            className="bg-zinc-800 dark:bg-white p-8 border border-zinc-700 dark:border-zinc-200 shadow-xl"
            style={{ perspective: 1000 }}
          >
            {s.icon}
            <h3 className="text-xl font-bold uppercase tracking-wide text-zinc-100 dark:text-zinc-900 mb-4">{s.title}</h3>
            <p className="text-zinc-400 dark:text-zinc-600 leading-relaxed text-sm">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

const ImageSlider = ({ images, objectFit = "object-contain" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full h-full relative overflow-hidden bg-zinc-100 dark:bg-zinc-900 pointer-events-auto">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Slide ${idx}`}
          className={`absolute top-0 left-0 w-full h-full ${objectFit} transition-opacity duration-1000 ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
      
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 gap-2 flex justify-center z-20">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? "bg-zinc-900 dark:bg-white w-6" : "bg-zinc-900/40 dark:bg-white/40 w-2 hover:bg-zinc-900/60 dark:hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Projects = () => {
  // 1. Add state to track if we are showing all projects
  const [showAll, setShowAll] = useState(false);

  // 2. Slice the array to show either 3 projects, or all of them
  const visibleProjects = showAll ? PROJECTS : PROJECTS.slice(0, 3);

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
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:col-span-5 flex flex-col justify-between h-full pr-8"
              >
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

                <div className="mt-8 flex flex-wrap gap-6">
                  {project.live && project.live !== "#" && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 hover:text-zinc-500 dark:hover:text-zinc-500 transition-colors border-b border-zinc-900 dark:border-zinc-100 pb-1"
                    >
                      {project.type === "Mobile Application" ? "Google Play ↗" : "Live Site ↗"}
                    </a>
                  )}
                  {project.appStore && project.appStore !== "#" && (
                    <a
                      href={project.appStore}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 hover:text-zinc-500 dark:hover:text-zinc-500 transition-colors border-b border-zinc-900 dark:border-zinc-100 pb-1"
                    >
                      App Store ↗
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Right Side: Live Iframe Preview */}
              <motion.div 
                whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ perspective: 1000 }}
                className={`md:col-span-7 relative flex justify-center items-center ${project.type === "Mobile Application" ? "py-8" : ""}`}
              >
                {project.type === "Mobile Application" ? (
                  /* Mobile Phone Frame (iOS Style) */
                  <div className="relative w-[280px] h-[580px] bg-black rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl overflow-hidden flex flex-col group-hover:border-zinc-600 transition-colors duration-500">
                    {/* iOS Notch */}
                    <div className="absolute top-0 inset-x-0 h-6 bg-black rounded-b-3xl w-1/2 mx-auto z-20"></div>
                    <div className="flex-1 relative bg-zinc-900 overflow-hidden pointer-events-auto md:pointer-events-none md:group-hover:pointer-events-auto">
                      {project.images && project.images.length > 0 ? (
                        <ImageSlider images={project.images} objectFit="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-500 text-sm">
                          App Preview
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Desktop Browser Frame */
                  <div className="w-full relative bg-zinc-200 dark:bg-zinc-900 aspect-4/3 md:aspect-16/10 rounded-lg overflow-hidden flex flex-col border border-zinc-300 dark:border-zinc-800 shadow-2xl group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors duration-500">
                    <div className="h-8 bg-zinc-300 dark:bg-zinc-950 flex items-center px-4 gap-2 border-b border-zinc-300 dark:border-zinc-800">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/80"></div>
                      </div>
                      <div className="mx-auto bg-zinc-200 dark:bg-zinc-900 px-3 py-0.5 rounded text-[10px] text-zinc-500 dark:text-zinc-400 font-mono truncate max-w-50">
                        {project.live !== "#" ? project.live.replace("https://", "") : "Project Preview"}
                      </div>
                      <div className="w-10"></div>
                    </div>

                    <div className="flex-1 relative bg-white dark:bg-black overflow-hidden pointer-events-auto md:pointer-events-none md:group-hover:pointer-events-auto">
                      {project.images && project.images.length > 0 ? (
                        <ImageSlider images={project.images} />
                      ) : project.live !== "#" ? (
                        <iframe
                          src={project.live}
                          title={`${project.title} Preview`}
                          className="w-full h-full border-none"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-100 dark:bg-zinc-900"></div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* 4. Update Button to Toggle State */}
        {PROJECTS.length > 3 && (
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
      <CustomCursor />
      <Navbar dark={dark} toggleTheme={() => setDark(!dark)} />
      <main>
        <Hero dark={dark} />
        <About />
        <Services />
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
