Icon-only tap target — top-bar actions, audio, close, more, delete. `label` is required (becomes aria-label).

```jsx
<MxIconButton icon={<BackIcon/>} label="Back" onClick={goBack} />
<MxIconButton icon={<TrashIcon/>} label="Delete" variant="destructive" />
```

Variants: `ghost` (default), `surface`, `destructive`. Never use an icon-only button for a critical/destructive action without a following confirm step.
