import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

export const dynamic = "force-static";
export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
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
            background: "linear-gradient(90deg, transparent, #6db3c2, transparent)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "64px",
              fontWeight: 700,
              color: "#6db3c2",
            }}
          >
            {">"}_
          </span>
        </div>

        {/* Site name */}
        <div
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: "#e2e4e9",
            textAlign: "center",
            letterSpacing: "-0.025em",
            lineHeight: 1.2,
          }}
        >
          {SITE_NAME}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "24px",
            color: "#9298a5",
            textAlign: "center",
            marginTop: "20px",
            maxWidth: "800px",
            lineHeight: 1.5,
          }}
        >
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    { ...size }
  );
}
