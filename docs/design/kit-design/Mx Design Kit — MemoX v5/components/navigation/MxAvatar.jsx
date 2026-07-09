import React from "react";

/**
 * MxAvatar — circular avatar for author/person rows and carousels. Shows an
 * image when `src` is given, else initials from `name` on a lavender tint.
 */
export function MxAvatar({ src = null, name = "", size = 44, style }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      style={{
        width: size,
        height: size,
        flex: "0 0 auto",
        borderRadius: "50%",
        overflow: "hidden",
        background: "var(--mx-color-state-selectedSurface)",
        color: "var(--mx-color-action-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--mx-font-display)",
        fontWeight: 700,
        fontSize: Math.round(size * 0.36),
        ...style,
      }}
    >
      {src ? <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials}
    </div>
  );
}
