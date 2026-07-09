Screen header — leading (back/close) + title + trailing actions.

```jsx
<MxTopBar
  leading={<MxIconButton icon={<BackIcon/>} label="Back" />}
  title="Deck Management"
  actions={<MxIconButton icon={<SortIcon/>} label="Sort" />}
/>
<MxTopBar variant="study" title="Fill" />   {/* centred, borderless */}
```

Variants: `default`, `study` (compact, centred title), `settings` (surface bg). Sticky by default.
