import "./styles/CertificationsPage.css";
import { useEffect } from "react";

const images = [
  "/images/main certificate.jpeg",
  "/images/GSSOC 2026.png",
  "/images/IITD RL.png",
  "/images/IITK OL.png",
  "/images/IITR OL.png",
  "/images/INNOV8 Volunteer Certificate.png",
  "/images/JIC OL.png",
  "/images/MKS C.png",
  "/images/NITD C.png"
];

const labels = [
  "Certificates are Here",
  "GSSoC 2026",
  "IIT Delhi – Recognition Letter",
  "IIT Kanpur – Offer Letter",
  "IIT Roorkee – Offer Letter",
  "INNOV8 Volunteer Certificate",
  "JIC – Offer Letter",
  "MKS Certificate",
  "NIT Delhi Certificate"
];

const CertificationsPage = () => {
  useEffect(() => {
    document.title = "Certifications & Achievements";
    document.body.classList.add("certifications-body");
    return () => {
      document.body.classList.remove("certifications-body");
    };
  }, []);

  return (
    <div className="certifications-page">
      <div className="certifications-header">
        <h1>Certifications <span>&amp;</span> Achievements</h1>
        <p>{images.length} certificates &amp; achievements</p>
      </div>
      <div className="certifications-gallery">
        {images.map((img, idx) => (
          <div className="cert-card" key={idx}>
            <img src={img} alt={labels[idx] || `Certificate ${idx + 1}`} />
            <p className="cert-label">{labels[idx]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsPage;
