import { SITE } from "@/lib/links";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = `${SITE.name} — Links`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0A0C0E",
          padding: 80,
        }}
      >
        <p
          style={{
            fontSize: 28,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#9EA5A8",
            margin: 0,
          }}
        >
          Links
        </p>
        <p
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#EDE7DC",
            marginTop: 24,
            lineHeight: 1.05,
          }}
        >
          SK Riyaz Rahaman
          <span style={{ color: "#E8913C" }}>.</span>
        </p>
      </div>
    ),
    { ...size },
  );
}
