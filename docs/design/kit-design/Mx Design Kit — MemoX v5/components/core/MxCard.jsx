import React from "react";

/**
 * MxCard — the surface container primitive. Everything boxed in MemoX (deck
 * rows wrappers, panels, study surfaces, metric tiles) is an MxCard variant.
 * `state` drives learning/selection feedback outlines (selected/correct/wrong)
 * without changing the base surface — keeping selection ≠ correctness.
 */
export function MxCard({
  children,
  variant = "default", // default | elevated | interactive
  state = "none", // none | selected | correct | wrong | disabled
  padding = "16",
  onClick,
  style,
  ...rest
}) {
  const bg =
    variant === "elevated"
      ? "var(--mx-color-surface-elevated)"
      : "var(--mx-color-surface-card)";

  const stateBorder = {
    none: "var(--mx-border-default)",
    selected: "var(--mx-border-selected)",
    correct: "var(--mx-border-correct)",
    wrong: "var(--mx-border-wrong)",
    disabled: "var(--mx-border-subtle)",
  }[state];

  const stateBg = {
    none: bg,
    selected: "var(--mx-color-state-selectedSurface)",
    correct: "var(--mx-color-feedback-correctSurface)",
    wrong: "var(--mx-color-feedback-wrongSurface)",
    disabled: "var(--mx-color-state-disabledSurface)",
  }[state];

  const interactive = variant === "interactive" || !!onClick;

  return (
    <div
      onClick={state === "disabled" ? undefined : onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive && state !== "disabled" ? 0 : undefined}
      style={{
        background: stateBg,
        border: stateBorder,
        borderRadius: "var(--mx-radius-lg)",
        padding: `var(--mx-space-${padding})`,
        boxShadow:
          variant === "elevated"
            ? "var(--mx-elevation-medium)"
            : "var(--mx-elevation-none)",
        color: "var(--mx-color-text-primary)",
        opacity: state === "disabled" ? 0.55 : 1,
        cursor: interactive && state !== "disabled" ? "pointer" : "default",
        transition:
          "border-color var(--mx-motion-fast) var(--mx-ease-standard), background var(--mx-motion-fast) var(--mx-ease-standard), transform var(--mx-motion-fast) var(--mx-ease-standard)",
        ...style,
      }}
      onPointerDown={(e) => {
        if (interactive && state !== "disabled")
          e.currentTarget.style.transform = "scale(0.99)";
      }}
      onPointerUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      onPointerLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      {...rest}
    >
      {children}
    </div>
  );
}
