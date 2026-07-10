/* ============================================================================
   kit-helpers — shared atoms for MemoX mockup screens (window.MxKit).

   The small primitives every screen was re-declaring (icon wrapper, skeleton
   block, number format) live here ONCE, mirroring V4's kit-helpers.jsx. Load it
   AFTER _ds_bundle.js and BEFORE a screen's own inline babel script:

     <script type="text/babel" src="../_shared/kit-helpers.js"></script>

   then, at the top of the inline script:

     const { Ic, Skel } = window.MxKit;

   Depends on: window.React (UMD). JSX → must load as type="text/babel".
   Style: var(--mx-*) tokens only; no raw hex.
   ============================================================================ */
(function () {
  /* lucide icon wrapper — <i data-lucide> sized in px */
  function Ic({ n, s = 20 }) { return <i data-lucide={n} style={{ width: s, height: s }}></i>; }

  /* skeleton block — loading placeholder on the neutral loading surface */
  function Skel({ w, h, r }) {
    return <div style={{ width: w, height: h, borderRadius: r || 'var(--mx-radius-md)', background: 'var(--mx-color-state-loadingSurface)', flex: '0 0 auto' }} />;
  }

  /* thousands-grouped integer (en-US) */
  function fmt(n) { return n.toLocaleString('en-US'); }

  window.MxKit = { Ic, Skel, fmt };
})();
