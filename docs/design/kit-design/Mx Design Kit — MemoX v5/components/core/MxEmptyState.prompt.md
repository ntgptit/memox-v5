Calm empty state — no decks, no due cards, empty search, unavailable feature. Never styled like an error (no-due is not a failure).

```jsx
<MxEmptyState tone="positive" icon={<CheckIcon/>}
  title="Nothing due"
  message="You’ve reviewed everything today. Check back later." />
```

Tones: `neutral`, `positive` (caught-up), `unavailable` (future/blocked feature).
