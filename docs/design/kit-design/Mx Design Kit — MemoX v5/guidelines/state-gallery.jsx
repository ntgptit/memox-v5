// Shared State Gallery for the Mx kit. Exposes window.MxStateGallery({theme}).
// Renders every documented interaction + learning + SRS state so dark/light
// parity is auditable at a glance. Loaded by state-gallery-{dark,light}.card.html.
const K = window.MxDesignKitMemoXV5_9f1387;
const {
  MxActionButton, MxIconButton, MxCard, MxBadge, MxListRow,
  MxAnswerOption, MxMatchTile, MxCallout, MxEmptyState, MxErrorState,
} = K;

function Ic({ n, s = 18 }) { return <i data-lucide={n} style={{ width: s, height: s }}></i>; }

function Sec({ title, children, cols = null }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <p style={{ font: "600 11px/1 var(--mx-font-display)", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--mx-color-text-tertiary)", margin: "0 0 10px" }}>{title}</p>
      <div style={{ display: cols ? "grid" : "flex", gridTemplateColumns: cols ? `repeat(${cols},1fr)` : undefined, flexWrap: "wrap", gap: 10, alignItems: "center" }}>{children}</div>
    </div>
  );
}

window.MxStateGallery = function MxStateGallery({ theme }) {
  const body = (
    <div style={{ background: "var(--mx-color-background-app)", borderRadius: 20, padding: 24, border: "1px solid var(--mx-color-border-subtle)" }}>
      <Sec title="Action button — variants & states">
        <MxActionButton>Primary</MxActionButton>
        <MxActionButton variant="secondary">Secondary</MxActionButton>
        <MxActionButton variant="ghost">Ghost</MxActionButton>
        <MxActionButton variant="destructive">Destructive</MxActionButton>
        <MxActionButton disabled>Disabled</MxActionButton>
        <MxActionButton loading>Loading</MxActionButton>
      </Sec>

      <Sec title="Card — surface & feedback states" cols={5}>
        <MxCard style={{ fontSize: 13 }}>default</MxCard>
        <MxCard variant="elevated" style={{ fontSize: 13 }}>elevated</MxCard>
        <MxCard state="selected" style={{ fontSize: 13 }}>selected</MxCard>
        <MxCard state="correct" style={{ fontSize: 13, color: "var(--mx-color-feedback-correct)" }}>correct</MxCard>
        <MxCard state="wrong" style={{ fontSize: 13, color: "var(--mx-color-feedback-wrong)" }}>wrong</MxCard>
      </Sec>

      <Sec title="Answer option — learning states">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%" }}>
          <MxAnswerOption state="default">unanswered</MxAnswerOption>
          <MxAnswerOption state="selected">selected</MxAnswerOption>
          <MxAnswerOption state="correct">correct</MxAnswerOption>
          <MxAnswerOption state="wrong">wrong</MxAnswerOption>
          <MxAnswerOption state="disabled">disabled</MxAnswerOption>
        </div>
      </Sec>

      <Sec title="Match tile — states" cols={5}>
        <MxMatchTile side="meaning" state="default">default</MxMatchTile>
        <MxMatchTile side="meaning" state="selected">selected</MxMatchTile>
        <MxMatchTile side="meaning" state="correct">correct</MxMatchTile>
        <MxMatchTile side="meaning" state="wrong">wrong</MxMatchTile>
        <MxMatchTile side="meaning" state="completed">completed</MxMatchTile>
      </Sec>

      <Sec title="SRS lifecycle — badges">
        <MxBadge tone="preSrs">Box 0 · pre-SRS</MxBadge>
        <MxBadge tone="active">active</MxBadge>
        <MxBadge tone="due">due</MxBadge>
        <MxBadge tone="noDue">no-due</MxBadge>
        <MxBadge tone="mastered">mastered</MxBadge>
        <MxBadge tone="lapse">lapse</MxBadge>
      </Sec>

      <Sec title="List row — default / disabled / error">
        <div style={{ width: "100%", background: "var(--mx-color-surface-card)", border: "var(--mx-border-default)", borderRadius: 16, overflow: "hidden" }}>
          <MxListRow title="Normal deck" subtitle="120 words" trailing={<MxBadge tone="due">83</MxBadge>} showChevron onClick={() => {}} />
          <div style={{ height: 1, background: "var(--mx-color-divider-default)", margin: "0 16px" }} />
          <MxListRow title="Unavailable deck" subtitle="No content yet" disabled />
          <div style={{ height: 1, background: "var(--mx-color-divider-default)", margin: "0 16px" }} />
          <MxListRow title="Failed deck" subtitle="Couldn’t load" variant="error" trailing={<MxIconButton icon={<Ic n="rotate-cw" s={16} />} label="Retry" />} />
        </div>
      </Sec>

      <Sec title="Feedback callouts — info / warning / destructive / no-due / unavailable">
        <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
          <MxCallout tone="noDue" title="Nothing due">no-due is calm, not an error.</MxCallout>
          <MxCallout tone="warning">Changing the app icon may remove shortcuts.</MxCallout>
          <MxCallout tone="unavailable">Cloud sync — coming soon.</MxCallout>
        </div>
      </Sec>

      <Sec title="Empty vs error — never confused" cols={2}>
        <MxCard padding="4" style={{ padding: 4 }}><MxEmptyState tone="positive" icon={<Ic n="check" s={22} />} title="All caught up" message="You’ve reviewed everything today." style={{ padding: 18 }} /></MxCard>
        <MxCard padding="4" style={{ padding: 4 }}><MxErrorState title="Couldn’t save session" message="Your learning data is safe." style={{ padding: 18 }} /></MxCard>
      </Sec>
    </div>
  );
  return theme === "light" ? <div data-theme="light">{body}</div> : body;
};
