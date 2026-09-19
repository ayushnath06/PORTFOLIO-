import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {

  useGSAP(() => {
    function getScrollAmount() {
      const workFlex = document.querySelector(".work-flex")! as HTMLElement;
      // scrollWidth includes the full flex content; subtract viewport to get how far we need to scroll
      return workFlex.scrollWidth - window.innerWidth;
    }

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        // getScrollAmount() moves us to last card edge, + extra hold so it stays visible
        end: () => `+=${getScrollAmount() + 300}`,
        scrub: 1.0,
        pin: true,
        id: "work",
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    // x only scrolls to the natural end — the +400 in `end` creates the hold
    timeline.to(".work-flex", {
      x: () => -getScrollAmount(),
      ease: "none",
    });

    // Clean up
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {[
            {
              num: "01",
              title: "Campus Kart",
              category: "Campus Marketplace Platform",
              tools: "React, JavaScript, FastAPI, CSS",
              description: "Student-to-student exchange platform with marketplace listings, notes sharing, and FastAPI matching service. (Team CodeSpire — Frontend Lead)",
              link: "https://dev-crest-git-master-crest9.vercel.app/",
              image: "/images/CampusKart.jpg"
            },
            {
              num: "02",
              title: "SIH: RF Simulator",
              category: "Signal & Frequency Simulation",
              tools: "C++, JavaScript, Web Graphics",
              description: "Interactive simulation tool modeling radio frequency (RF) signal behavior and propagation dynamics. Contributed in project i.e. created mock tower signals to check if our SWUCB1 catches signals or not.",
              link: "https://github.com/Aaron-Ultra/Project-Red-Hood/blob/main/rf_simulator.py",
              image: "/images/Smart Scan Warfare.jpeg"
            },
            {
              num: "03",
              title: "Cognee Ai Assistance",
              category: "AI Assistant with Memory",
              tools: "JavaScript, React, Node.js, AI Context Engine",
              description: "AI assistant concept focused on persistent memory, retaining and recalling context across conversations.",
              link: "https://github.com/ayushnath06/MemoryOS_Project.git",
              image: "/images/Cognee ai.jpeg"
            },
            {
              num: "04",
              title: "Hackathons & Competitions",
              category: "Code Slayer 2K25 & SIH",
              tools: "NIT Delhi Code Slayer 2K25, DevCrest, SIH",
              description: "Active hackathon competitor — 1st Year finalist at NIT Delhi Code Slayer 2K25, DevCrest Buildthon, Smart India Hackathon.",
              link: "https://canva.link/s1ef8nezh1j45td",
              image: "/images/Code Slayer.jpeg"
            },
            {
              num: "05",
              title: "Certifications",
              category: "Certificates and Achievements",
              tools: "Certificates and Achievements",
              description: "Various certificates and achievements. Click to view all.",
              link: "",
              image: "/images/main certificate.jpeg",
              gallery: [
                "/images/GSSOC 2026.png",
                "/images/IITD RL.png",
                "/images/IITK OL.png",
                "/images/IITR OL.png",
                "/images/INNOV8 VC.png",
                "/images/JIC OL.png",
                "/images/MKS C.png",
                "/images/NITD C.png"
              ]
            }
          ].map((project, index) => {
            const hasGallery = (project as any).gallery && (project as any).gallery.length > 0;
            return (
              <div
                className="work-box"
                key={index}
                onClick={() => hasGallery && window.open('/certifications', '_blank')}
                style={hasGallery ? { cursor: "pointer" } : {}}
              >
                <div className="work-info">
                  <div className="work-title">
                    <h3>{project.num}</h3>

                    <div>
                      <h4>{project.title}</h4>
                      <p>{project.category}</p>
                    </div>
                  </div>
                  <h4>Tools and features</h4>
                  <p>{project.tools}</p>
                </div>
                <WorkImage image={project.image || "/images/placeholder.webp"} link={project.link} alt={project.title} gallery={(project as any).gallery} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Work;
