import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const allProjects = [
  {
    num: "01",
    title: "Campus Kart",
    subtitle: "Capstone Project",
    category: "Campus Marketplace Platform",
    tools: "React, JavaScript, FastAPI, CSS",
    description: "Student-to-student exchange platform with marketplace listings, notes sharing, and FastAPI matching service. (Team CodeSpire — Frontend Lead)",
    link: "https://dev-crest-git-master-crest9.vercel.app/",
    image: "/images/CampusKart.jpg",
  },
  {
    num: "02",
    title: "SIH: RF Simulator",
    subtitle: "",
    category: "Signal & Frequency Simulation",
    tools: "C++, JavaScript, Web Graphics",
    description: "Interactive simulation tool modeling radio frequency (RF) signal behavior and propagation dynamics. Contributed in project i.e. created mock tower signals to check if our SWUCB1 catches signals or not.",
    link: "https://github.com/Aaron-Ultra/Project-Red-Hood/blob/main/rf_simulator.py",
    image: "/images/Smart Scan Warfare.jpeg",
  },
  {
    num: "03",
    title: "Cognee Ai Assistance",
    subtitle: "",
    category: "AI Assistant with Memory",
    tools: "JavaScript, React, Node.js, AI Context Engine",
    description: "AI assistant concept focused on persistent memory, retaining and recalling context across conversations.",
    link: "https://github.com/ayushnath06/MemoryOS_Project.git",
    image: "/images/Cognee ai.jpeg",
  },
  {
    num: "04",
    title: "Hackathons & Competitions",
    subtitle: "",
    category: "Code Slayer 2K25 & SIH",
    tools: "NIT Delhi Code Slayer 2K25, DevCrest, SIH",
    description: "Active hackathon competitor — 1st Year finalist at NIT Delhi Code Slayer 2K25, DevCrest Buildthon, Smart India Hackathon.",
    link: "https://canva.link/s1ef8nezh1j45td",
    image: "/images/Code Slayer.jpeg",
  },
];

const featuredProjects = [
  {
    num: "01",
    title: "Campus Kart",
    subtitle: "Capstone Project",
    category: "Campus Marketplace Platform",
    tools: "React, JavaScript, FastAPI, CSS",
    description: "Student-to-student exchange platform with marketplace listings, notes sharing, and FastAPI matching service. (Team CodeSpire — Frontend Lead)",
    link: "https://dev-crest-git-master-crest9.vercel.app/",
    image: "/images/CampusKart.jpg",
  },
  {
    num: "02",
    title: "Certifications",
    subtitle: "",
    category: "Certificates & Achievements",
    tools: "Certificates and Achievements",
    description: "Various certificates and achievements. Click to view all.",
    link: "",
    image: "/images/main certificate.jpeg",
    gallery: [
      "/images/GSSOC 2026.png",
      "/images/IITD RL.png",
      "/images/IITK OL.png",
      "/images/IITR OL.png",
      "/images/INNOV8 Volunteer Certificate.png",
      "/images/JIC OL.png",
      "/images/MKS C.png",
      "/images/NITD C.png",
    ],
  },
];

const Work = () => {
  useGSAP(() => {
    function getScrollAmount() {
      const workFlex = document.querySelector(".work-flex")! as HTMLElement;
      return workFlex.scrollWidth - window.innerWidth;
    }

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${getScrollAmount() + 300}`,
        scrub: 1.0,
        pin: true,
        id: "work",
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    timeline.to(".work-flex", {
      x: () => -getScrollAmount(),
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  const openMoreProjects = () => {
    const projectCards = allProjects
      .map(
        (p) => `
    <a class="project-card" href="${p.link}" target="_blank" rel="noopener">
      <div class="card-top">
        <span class="project-num">${p.num}</span>
        <span class="project-link-icon">&#8599;</span>
      </div>
      <img class="project-img" src="${p.image}" alt="${p.title}" onerror="this.style.display='none'"/>
      <div>
        <div class="project-title">${p.title}</div>
        ${p.subtitle ? `<span class="project-subtitle">${p.subtitle}</span>` : ""}
        <div class="project-category">${p.category}</div>
      </div>
      <p class="project-desc">${p.description}</p>
      <div class="project-tools">${p.tools}</div>
    </a>`
      )
      .join("");

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>All Projects — Ayush Nath</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;500;600;700&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0a0a0a; color: #fff; font-family: 'Inter', sans-serif; min-height: 100vh; }
    .header { padding: 50px 80px 40px; border-bottom: 1px solid #1a1a1a; display: flex; flex-direction: column; gap: 16px; }
    .header h1 { font-size: clamp(32px, 5vw, 64px); font-weight: 600; letter-spacing: -1px; }
    .header h1 span { color: #c8ff00; }
    .header p { color: #555; font-size: 15px; font-weight: 300; }
    .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 480px), 1fr)); gap: 1px; background: #1a1a1a; }
    .project-card { background: #0a0a0a; padding: 48px; display: flex; flex-direction: column; gap: 20px; transition: background 0.3s; text-decoration: none; color: inherit; }
    .project-card:hover { background: #0f0f0f; }
    .card-top { display: flex; justify-content: space-between; align-items: flex-start; }
    .project-num { font-size: 44px; font-weight: 700; color: #1e1e1e; line-height: 1; }
    .project-link-icon { width: 42px; height: 42px; border: 1px solid #2a2a2a; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; transition: 0.3s; }
    .project-card:hover .project-link-icon { border-color: #c8ff00; background: #c8ff00; color: #000; }
    .project-img { width: 100%; height: 220px; object-fit: cover; border-radius: 8px; border: 1px solid #1a1a1a; }
    .project-title { font-size: 24px; font-weight: 600; line-height: 1.2; }
    .project-subtitle { display: inline-block; font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: #c8ff00; margin-top: 5px; }
    .project-category { font-size: 12px; color: #444; margin-top: 3px; }
    .project-desc { font-size: 13px; color: #777; line-height: 1.75; font-weight: 300; }
    .project-tools { font-size: 11px; color: #383838; padding-top: 14px; border-top: 1px solid #161616; letter-spacing: 0.5px; }
    .back-btn { display: inline-flex; align-items: center; gap: 8px; padding: 9px 20px; border: 1px solid #2a2a2a; border-radius: 100px; font-size: 12px; color: #666; cursor: pointer; background: transparent; transition: 0.3s; font-family: 'Inter', sans-serif; width: fit-content; }
    .back-btn:hover { border-color: #c8ff00; color: #c8ff00; }
  </style>
</head>
<body>
  <div class="header">
    <button class="back-btn" onclick="window.close()">&#8592; Close</button>
    <h1>All <span>Projects</span></h1>
    <p>A complete look at my work, builds, and contributions.</p>
  </div>
  <div class="projects-grid">${projectCards}</div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header-row">
          <h2>
            My <span>Work</span>
          </h2>
          <button className="more-projects-btn" onClick={openMoreProjects}>
            More Projects&nbsp;↗
          </button>
        </div>
        <div className="work-flex">
          {featuredProjects.map((project, index) => {
            const hasGallery =
              (project as any).gallery && (project as any).gallery.length > 0;
            return (
              <div
                className="work-box"
                key={index}
                onClick={() =>
                  hasGallery && window.open(`${import.meta.env.BASE_URL}certifications`, "_blank")
                }
                style={hasGallery ? { cursor: "pointer" } : {}}
              >
                <div className="work-info">
                  <div className="work-title">
                    <h3>{project.num}</h3>
                    <div>
                      <h4>{project.title}</h4>
                      {project.subtitle && (
                        <span className="work-subtitle">{project.subtitle}</span>
                      )}
                      <p>{project.category}</p>
                    </div>
                  </div>
                  <h4>Tools and features</h4>
                  <p>{project.tools}</p>
                </div>
                <WorkImage
                  image={project.image || "/images/placeholder.webp"}
                  link={project.link}
                  alt={project.title}
                  gallery={(project as any).gallery}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Work;
