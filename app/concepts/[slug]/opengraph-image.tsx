import { ImageResponse } from "next/og";
import { getConceptBySlug, getConceptSlugs } from "@/lib/content";
import { SITE_NAME } from "@/lib/constants";

export const dynamic = "force-static";
export const alt = "Article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getConceptSlugs().map((slug) => ({ slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);

  if (!concept) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#0f1115",
            color: "#e2e4e9",
            fontSize: "48px",
          }}
        >
          Not Found
        </div>
      ),
      { ...size }
    );
  }

  const difficultyColor: Record<string, string> = {
    Beginner: "#8fbf7f",
    Intermediate: "#dbc07f",
    Advanced: "#c97373",
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0f1115",
          padding: "60px 80px",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background:
              "linear-gradient(90deg, transparent, #6db3c2, transparent)",
          }}
        />

        {/* Top section: logo + category */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "28px",
                fontWeight: 700,
                color: "#6db3c2",
              }}
            >
              {">"}_
            </span>
            <span
              style={{
                fontSize: "20px",
                color: "#9298a5",
              }}
            >
              {SITE_NAME}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontSize: "16px",
                color: "#6db3c2",
                backgroundColor: "rgba(109, 179, 194, 0.15)",
                padding: "6px 16px",
                borderRadius: "9999px",
              }}
            >
              {concept.category}
            </span>
            <span
              style={{
                fontSize: "16px",
                color: difficultyColor[concept.difficulty] ?? "#9298a5",
                backgroundColor: "rgba(255,255,255,0.06)",
                padding: "6px 16px",
                borderRadius: "9999px",
              }}
            >
              {concept.difficulty}
            </span>
          </div>
        </div>

        {/* Middle: title + description */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "52px",
              fontWeight: 700,
              color: "#e2e4e9",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
            }}
          >
            {concept.title}
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#9298a5",
              lineHeight: 1.5,
              maxWidth: "900px",
            }}
          >
            {concept.description}
          </div>
        </div>

        {/* Bottom: date + tags */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "18px", color: "#5c6370" }}>
            {concept.date}
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            {concept.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "14px",
                  color: "#9298a5",
                  backgroundColor: "#181b21",
                  border: "1px solid #2a303c",
                  padding: "4px 12px",
                  borderRadius: "9999px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
