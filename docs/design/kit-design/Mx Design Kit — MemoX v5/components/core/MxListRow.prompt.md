List-row primitive — deck rows, flashcard rows, generic lists. Leading + title/subtitle + trailing slots.

```jsx
<MxListRow
  leading={<MxDeckProgress percent={62} />}
  title="Korean TOPIK I"
  subtitle="120 words · KO → EN"
  trailing={<MxBadge tone="due">83</MxBadge>}
  showChevron
  onClick={open}
/>
```

Variants: `default`, `error`. `disabled` mutes and blocks tap. Long titles truncate with ellipsis.
