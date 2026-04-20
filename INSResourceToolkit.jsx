import { useState, useMemo } from "react";

const resources = [
  {
    category: "Informatics Professional Organizations",
    items: [
      {
        name: "American Medical Informatics Association (AMIA)",
        url: "https://www.amia.org",
        tools:
          "AMIA offers an extensive online knowledge base, annual symposia, a working group structure covering nursing informatics, clinical decision support, and consumer health informatics, and the AMIA 10x10 training program for clinicians entering the informatics field. It also publishes the Journal of the American Medical Informatics Association (JAMIA).",
        relevance:
          "AMIA is the leading academic and professional society bridging health informatics science and practice. For nursing informatics students, it provides access to cutting-edge research, interdisciplinary networking, and the credentialing pathway toward the AMIA Health Informatics Certification (AHIC).",
      },
      {
        name: "Healthcare Information and Management Systems Society (HIMSS)",
        url: "https://www.himss.org",
        tools:
          "HIMSS publishes global health IT research, workforce development toolkits, the HIMSS Analytics Maturity Model, and hosts the world's largest health information and technology conference. Its online library includes white papers, case studies, and digital health policy resources.",
        relevance:
          "HIMSS shapes health IT standards and policy at a global scale. For informatics nurses, it is an essential lens into how technology strategy, enterprise systems, and digital transformation intersect with clinical practice and patient outcomes.",
      },
    ],
  },
  {
    category: "Nursing Organizations",
    items: [
      {
        name: "American Nurses Association (ANA)",
        url: "https://www.nursingworld.org",
        tools:
          "The ANA provides the Nursing Informatics: Scope and Standards of Practice publication, position statements, policy advocacy resources, and the NursingWorld continuing education catalog. It also maintains the ANA Enterprise, which includes the American Nurses Credentialing Center (ANCC) overseeing the RN-BC Informatics Nursing certification.",
        relevance:
          "The ANA defines the professional and ethical framework within which all nurses—including informaticists—operate. Its Scope and Standards document is the foundational reference for informatics nursing practice competencies, role clarity, and credentialing.",
      },
      {
        name: "American Academy of Nursing (AAN)",
        url: "https://www.aannet.org",
        tools:
          "The AAN publishes evidence-based policy briefs, Choosing Wisely nursing recommendations, and position statements on emerging practice areas including artificial intelligence in health care. Its expert panels produce actionable guidance for nursing leadership and health system transformation.",
        relevance:
          "The AAN's position statement on AI in nursing is a landmark document for informatics students navigating the ethical, clinical, and governance dimensions of algorithm-assisted care. Its policy voice directly influences how health technology is regulated and integrated into nursing practice nationally.",
        featured: true,
        featuredLabel: "AAN AI Position Statement",
        featuredNote:
          "The AAN has issued a formal position on artificial intelligence in nursing practice—covering ethical obligations, bias mitigation, human oversight, and the nurse's role in algorithm governance. Essential reading for any informatics student working at the intersection of clinical AI and patient safety.",
      },
    ],
  },
  {
    category: "Government Agencies",
    items: [
      {
        name: "Office of the National Coordinator for Health Information Technology (ONC)",
        url: "https://www.healthit.gov",
        tools:
          "ONC houses the Health IT Playbook, interoperability standards documentation, FHIR resource libraries, provider digital health resources, and the federal health IT strategic plan. It also maintains HealthIT.gov, a public-facing hub for EHR adoption guidance and policy updates.",
        relevance:
          "ONC sets federal health IT policy and interoperability standards that directly govern how electronic health records, APIs, and data exchange function across the U.S. healthcare system. For informatics nurses, understanding ONC frameworks is essential for systems implementation, data governance, and advocacy.",
      },
      {
        name: "Centers for Medicare & Medicaid Services (CMS)",
        url: "https://www.cms.gov",
        tools:
          "CMS publishes the Promoting Interoperability program resources, quality measure specifications, value-based care toolkits, and clinical data reporting requirements. Its website includes program manuals, reimbursement policy updates, and datasets for population health analysis.",
        relevance:
          "CMS reimbursement and quality reporting programs are a primary driver of health IT adoption in hospitals and clinics. Informatics nurses must understand CMS requirements to align EHR workflows, clinical documentation, and quality improvement initiatives with regulatory expectations.",
      },
    ],
  },
  {
    category: "Other Organizations",
    items: [
      {
        name: "Institute for Healthcare Improvement (IHI)",
        url: "https://www.ihi.org",
        tools:
          "IHI offers open school courses, quality improvement frameworks (including the Model for Improvement and PDSA cycles), a free online resource library, and leadership development programs. Its white papers cover patient safety, workforce well-being, and health equity topics.",
        relevance:
          "Informatics is fundamentally a quality improvement discipline. IHI frameworks provide the methodology for translating data insights into sustainable clinical process change—a core competency for informatics nurses working in EHR optimization, clinical decision support, and patient safety initiatives.",
      },
      {
        name: "Public Health Informatics Institute (PHII)",
        url: "https://www.phii.org",
        tools:
          "PHII provides workforce development resources, public health informatics competency frameworks, case study reports, and toolkits for data modernization and health information exchange. Its library includes the Requirements Collaboration Suite and guidance documents for public health information system design and evaluation.",
        relevance:
          "PHII bridges public health practice and informatics, making it especially relevant for nurses working in population health, community health systems, or government-adjacent settings. Its frameworks help informatics practitioners design and assess information systems that support equitable, data-driven public health response.",
      },
    ],
  },
];

const featuredResource = resources
  .flatMap((c) => c.items)
  .find((r) => r.featured);

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "inline", verticalAlign: "middle" }}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ display: "inline", verticalAlign: "middle", marginRight: 5 }}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ResourceCard({ item }) {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        padding: "22px 24px",
        transition: "border-color 0.18s, box-shadow 0.18s",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#93c5fd";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(59,130,246,0.07)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#e5e7eb";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <h3
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "#111827",
            margin: 0,
            lineHeight: 1.4,
            fontFamily: "'Georgia', serif",
          }}
        >
          {item.name}
        </h3>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontSize: 12,
            fontWeight: 500,
            color: "#1d4ed8",
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: 6,
            padding: "5px 11px",
            textDecoration: "none",
            whiteSpace: "nowrap",
            flexShrink: 0,
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#dbeafe")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#eff6ff")}
        >
          Visit Site <ExternalLinkIcon />
        </a>
      </div>

      <div>
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "#6b7280",
            margin: "0 0 4px",
          }}
        >
          Resources & Tools
        </p>
        <p style={{ fontSize: 13.5, color: "#374151", margin: 0, lineHeight: 1.65 }}>
          {item.tools}
        </p>
      </div>

      <div>
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "#6b7280",
            margin: "0 0 4px",
          }}
        >
          Relevance to Practice
        </p>
        <p style={{ fontSize: 13.5, color: "#374151", margin: 0, lineHeight: 1.65 }}>
          {item.relevance}
        </p>
      </div>
    </div>
  );
}

export default function INSResourceToolkit() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return resources;
    const q = query.toLowerCase();
    return resources
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.tools.toLowerCase().includes(q) ||
            item.relevance.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [query]);

  const totalResults = filtered.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <div
      style={{
        fontFamily: "'Georgia', serif",
        background: "#f9fafb",
        minHeight: "100vh",
        color: "#111827",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          background: "#1e3a5f",
          padding: "10px 0",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#93c5fd",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
          }}
        >
          Nursing Informatics Student Reference
        </span>
      </div>

      {/* Header */}
      <header
        style={{
          background: "white",
          borderBottom: "1px solid #e5e7eb",
          padding: "40px 24px 32px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#1d4ed8",
              margin: "0 0 10px",
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              fontWeight: 600,
            }}
          >
            INS Resource Toolkit
          </p>
          <h1
            style={{
              fontSize: 34,
              fontWeight: 700,
              margin: "0 0 10px",
              color: "#0f172a",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            Nursing Informatics Resources and Tools
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "#4b5563",
              margin: "0 auto",
              maxWidth: 600,
              lineHeight: 1.7,
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
            }}
          >
            A curated reference hub for nursing informatics students and
            practitioners. Each entry includes key resources, tools, and a
            summary of relevance to clinical informatics practice.
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 64px" }}>

        {/* How to Use */}
        <section
          style={{
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: 10,
            padding: "20px 24px",
            marginBottom: 28,
          }}
        >
          <h2
            style={{
              fontSize: 14,
              fontWeight: 700,
              margin: "0 0 6px",
              color: "#1e40af",
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
            }}
          >
            How to Use This Page
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "#1e3a5f",
              margin: 0,
              lineHeight: 1.7,
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
            }}
          >
            This is a living reference designed for both academic study and
            real-world informatics practice. Browse by category or use the
            search bar to locate a specific organization. Each card summarizes
            what the organization offers and why it matters to informatics
            nursing. The toolkit will grow as the field evolves.
          </p>
        </section>

        {/* Featured Resource */}
        {featuredResource && (
          <section
            style={{
              background: "white",
              border: "2px solid #1d4ed8",
              borderRadius: 10,
              padding: "22px 24px",
              marginBottom: 36,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#1d4ed8",
                color: "white",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "4px 10px",
                borderRadius: 5,
                marginBottom: 12,
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
              }}
            >
              <StarIcon /> Featured Resource
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
              <div>
                <h2
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    margin: "0 0 4px",
                    color: "#0f172a",
                  }}
                >
                  {featuredResource.featuredLabel}
                </h2>
                <p
                  style={{
                    fontSize: 13,
                    color: "#6b7280",
                    margin: "0 0 10px",
                    fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  }}
                >
                  {featuredResource.name}
                </p>
              </div>
              <a
                href={featuredResource.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "white",
                  background: "#1d4ed8",
                  border: "none",
                  borderRadius: 6,
                  padding: "7px 14px",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#1e40af")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#1d4ed8")}
              >
                Visit AAN <ExternalLinkIcon />
              </a>
            </div>
            <p
              style={{
                fontSize: 14,
                color: "#374151",
                margin: 0,
                lineHeight: 1.7,
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
              }}
            >
              {featuredResource.featuredNote}
            </p>
          </section>
        )}

        {/* Search */}
        <div style={{ marginBottom: 36, position: "relative" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search organizations, tools, or practice areas…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "11px 16px 11px 40px",
              fontSize: 14,
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              border: "1px solid #d1d5db",
              borderRadius: 8,
              background: "white",
              color: "#111827",
              outline: "none",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#93c5fd")}
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
          />
          {query && (
            <span
              style={{
                position: "absolute",
                right: 14,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 12,
                color: "#9ca3af",
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
              }}
            >
              {totalResults} result{totalResults !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Resource sections */}
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 0",
              color: "#9ca3af",
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
            }}
          >
            <p style={{ fontSize: 15, margin: "0 0 6px" }}>No results found for "{query}"</p>
            <p style={{ fontSize: 13 }}>Try a different search term or browse all categories below.</p>
          </div>
        ) : (
          filtered.map((cat) => (
            <section key={cat.category} style={{ marginBottom: 44 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 18,
                  paddingBottom: 12,
                  borderBottom: "2px solid #e5e7eb",
                }}
              >
                <h2
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    margin: 0,
                    color: "#0f172a",
                  }}
                >
                  {cat.category}
                </h2>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#1d4ed8",
                    background: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    borderRadius: 20,
                    padding: "2px 9px",
                    fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  }}
                >
                  {cat.items.length} {cat.items.length === 1 ? "entry" : "entries"}
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
                  gap: 16,
                }}
              >
                {cat.items.map((item) => (
                  <ResourceCard key={item.name} item={item} />
                ))}
              </div>
            </section>
          ))
        )}

        {/* Footer */}
        <footer
          style={{
            borderTop: "1px solid #e5e7eb",
            paddingTop: 24,
            marginTop: 12,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: "#9ca3af",
              margin: 0,
              lineHeight: 1.6,
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
            }}
          >
            INS Resource Toolkit · For academic and professional reference use ·
            Verify all links and content directly with the listed organizations.
          </p>
        </footer>
      </main>
    </div>
  );
}
