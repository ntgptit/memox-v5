Fixed bottom tab bar. `icon` values are Lucide glyph names; active item turns purple.

```jsx
<MxBottomNav value={tab} onChange={setTab} items={[
  { key: 'decks', label: 'Decks', icon: 'layers' },
  { key: 'study', label: 'Study', icon: 'graduation-cap' },
  { key: 'stats', label: 'Stats', icon: 'bar-chart-3' },
  { key: 'more', label: 'More', icon: 'menu' },
]} />
```
