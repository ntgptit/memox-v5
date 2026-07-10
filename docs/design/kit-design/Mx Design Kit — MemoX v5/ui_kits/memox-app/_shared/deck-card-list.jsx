/* ============================================================================
   Shared deck card-list building blocks for MemoX mockup screens.

   Reusable, NON-GENERATED partial (do not confuse with _ds_bundle.js). Lives in
   _shared/. Any screen in ../screens/ reuses the deck list by adding, BEFORE its
   own inline babel script:

     <script type="text/babel" src="../_shared/deck-card-list.jsx"></script>

   then destructuring from the global it exposes:

     const { DeckList, DeckRow, ControlArea, L, EN, VI, Ic, fmt } = window.MxDeckList;

   Depends on: window.React (UMD) + window.MxDesignKitMemoXV5_9f1387 (kit bundle).
   Style: var(--mx-*) tokens only; spacing on the 4/8/12/16/24/32/48 scale.
   ============================================================================ */
(function () {
  const K = window.MxDesignKitMemoXV5_9f1387;
  const { MxCard, MxIconButton } = K;

  function Ic({ n, s = 20 }) { return <i data-lucide={n} style={{ width: s, height: s }}></i>; }
  function fmt(n) { return n.toLocaleString('en-US'); }

  /* named layout constants (no scattered magic numbers) */
  const L = { ringSize: 48, playSize: 48, playIcon: 22, cardMinH: 112, gapRingContent: 16, gapContentPlay: 12, gapTitleMeta: 8, searchH: 48, filterH: 40, primaryBtnH: 52 };

  /* i18n content dictionaries (screens pass whichever they need) */
  const EN = { search: 'Search decks', dir: 'KO → EN', sort: 'A → Z', newDeck: 'New subdeck', addCard: 'Add card',
    words: n => `${fmt(n)} words`, subdecks: (n, w) => `${n} subdecks · ${fmt(w)} words`, results: (n, q) => `${n} results for “${q}”` };
  const VI = { search: 'Tìm bộ thẻ', dir: 'KO → VI', sort: 'A → Z', newDeck: 'Bộ thẻ mới', addCard: 'Thêm thẻ',
    words: n => `${fmt(n)} từ`, subdecks: (n, w) => `${n} bộ thẻ · ${fmt(w)} từ`, results: (n, q) => `${n} kết quả cho “${q}”` };

  /* progress ring — lower visual weight than the play button; shows %, a11y label, muted track */
  function Ring({ p, size = L.ringSize }) {
    const sw = 4, r = (size - sw) / 2, c = 2 * Math.PI * r;
    const done = p > 0;
    const color = done ? 'var(--mx-color-srs-active)' : 'var(--mx-color-srs-preSrs)';
    return (
      <div role="img" aria-label={`${p} percent mastered`} style={{ position: 'relative', width: size, height: size, flex: '0 0 auto' }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--mx-color-border-subtle)" strokeWidth={sw} />
          {done && <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - p / 100)} />}
        </svg>
        <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', font: `600 12px var(--mx-font-mono)`, color: done ? 'var(--mx-color-text-secondary)' : 'var(--mx-color-text-tertiary)' }}>{p}%</span>
      </div>
    );
  }

  /* status chip — exact 24px / pad 8 / icon 14 / gap 4 (MxBadge is fixed at 20px). Token-only semantic variants. */
  const STATUS = {
    due:   { bg: 'var(--mx-color-feedback-warningSurface)', fg: 'var(--mx-color-feedback-warning)', icon: 'alarm-clock' },
    new:   { bg: 'var(--mx-color-srs-preSrsSurface)',       fg: 'var(--mx-color-text-secondary)',   icon: 'sparkles' },
    done:  { bg: 'var(--mx-color-feedback-correctSurface)', fg: 'var(--mx-color-feedback-correct)', icon: 'check' },
    empty: { bg: 'var(--mx-color-state-disabledSurface)',   fg: 'var(--mx-color-text-tertiary)',    icon: null },
  };
  function StatusChip({ kind, children }) {
    const s = STATUS[kind];
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 24, padding: '0 8px', borderRadius: 'var(--mx-radius-pill)', background: s.bg, color: s.fg, font: '500 var(--mx-text-body-small-size) var(--mx-font-display)', whiteSpace: 'nowrap', flex: '0 0 auto' }}>
        {s.icon && <i data-lucide={s.icon} style={{ width: 14, height: 14 }}></i>}{children}
      </span>
    );
  }
  function DueBadge({ d }) {
    if (d.newc > 0 && d.progress === 0) return <StatusChip kind="new">{fmt(d.newc)} new</StatusChip>;
    if (d.due > 0) return <StatusChip kind="due">{fmt(d.due)} due</StatusChip>;
    if (d.words === 0) return <StatusChip kind="empty">Empty</StatusChip>;
    return <StatusChip kind="done">Up to date</StatusChip>;
  }

  /* deck row — [ring · content(title+meta) · play]; name-first hierarchy, single-line metadata */
  function DeckRow({ d, pressed, t = EN }) {
    const noStudy = d.disabled || d.words === 0;
    return (
      <MxCard variant="interactive" state={noStudy ? 'disabled' : 'none'} padding="16"
        onClick={noStudy ? undefined : () => {}}
        style={{ display: 'flex', alignItems: 'center', minHeight: L.cardMinH, background: pressed ? 'var(--mx-color-state-pressedSurface)' : undefined }}>
        <Ring p={d.progress} />
        <div style={{ flex: '1 1 auto', minWidth: 0, marginLeft: L.gapRingContent, marginRight: L.gapContentPlay }}>
          <div style={{ font: '600 var(--mx-text-body-large-size)/1.25 var(--mx-font-display)', color: 'var(--mx-color-text-primary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{d.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: L.gapTitleMeta, minWidth: 0, flexWrap: 'wrap', rowGap: 4 }}>
            <span style={{ font: '500 var(--mx-text-body-small-size) var(--mx-font-display)', color: 'var(--mx-color-text-secondary)', flex: '0 0 auto' }}>{t.words(d.words)}</span>
            <DueBadge d={d} />
          </div>
        </div>
        <MxIconButton icon={<Ic n="play" s={L.playIcon} />} label={`Study ${d.name}`} variant="surface" disabled={noStudy} style={{ width: L.playSize, height: L.playSize, flex: '0 0 auto' }} onClick={e => { if (e && e.stopPropagation) e.stopPropagation(); }} />
      </MxCard>
    );
  }

  /* filter chip — one control system for both filters (40px capsule) */
  function Chip({ selected, icon, trailing, children, label }) {
    return (
      <div role="button" tabIndex={0} aria-label={label} style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, height: L.filterH, padding: '0 14px', borderRadius: 999, cursor: 'pointer', whiteSpace: 'nowrap',
        background: selected ? 'var(--mx-color-state-selectedSurface)' : 'transparent',
        border: `1px solid ${selected ? 'var(--mx-color-state-selected)' : 'var(--mx-color-border-default)'}`,
        color: selected ? 'var(--mx-color-action-onSecondary)' : 'var(--mx-color-text-secondary)',
        font: '600 var(--mx-text-body-small-size) var(--mx-font-display)',
      }}>{icon}{children}{trailing}</div>
    );
  }

  /* search field — 48px, elevated surface (level 2) */
  function SearchField({ value, focused, t = EN }) {
    const has = value && value.length > 0;
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: L.searchH, padding: '0 8px 0 12px', borderRadius: 'var(--mx-radius-md)', background: 'var(--mx-color-surface-elevated)', border: `1px solid ${focused ? 'var(--mx-color-state-selected)' : 'var(--mx-color-border-subtle)'}` }}>
        <i data-lucide="search" style={{ width: 18, height: 18, color: 'var(--mx-color-text-tertiary)', flex: '0 0 auto' }}></i>
        <span style={{ flex: '1 1 auto', font: '500 var(--mx-text-body-medium-size) var(--mx-font-display)', color: has ? 'var(--mx-color-text-primary)' : 'var(--mx-color-text-tertiary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{has ? value : t.search}</span>
        {focused && <span style={{ width: 2, height: 20, background: 'var(--mx-color-action-primary)', flex: '0 0 auto' }} />}
        {has && !focused && <MxIconButton icon={<Ic n="x" s={16} />} label="Clear search" variant="ghost" size="small" />}
      </div>
    );
  }

  /* header control area — search(48) → 12 → filter row(40); direction read-only (no picker) */
  function ControlArea({ query, focused, t = EN }) {
    return (
      <div style={{ padding: '12px 16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SearchField value={query} focused={focused} t={t} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Chip selected icon={<Ic n="arrow-right" s={18} />} label={`Study direction ${t.dir}`}>{t.dir}</Chip>
          <Chip icon={<Ic n="arrow-up-down" s={18} />} label="Sort A to Z">{t.sort}</Chip>
        </div>
      </div>
    );
  }

  /* deck list — the reusable card list (16px gutter, 12px item gap) */
  function DeckList({ items, t = EN }) {
    return <div style={{ padding: '16px 16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>{items.map((d, i) => <DeckRow key={i} d={d} t={t} />)}</div>;
  }

  window.MxDeckList = { L, EN, VI, Ic, fmt, Ring, STATUS, StatusChip, DueBadge, DeckRow, Chip, SearchField, ControlArea, DeckList };
})();
