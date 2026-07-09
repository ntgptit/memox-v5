End-of-session summary. Read-only — reflects finalized data, never activates cards.

```jsx
<MxSessionResultSummary type="newLearning" headline="12 words learned"
  subhead="8 cards activated into Box 1"
  stats={[{label:'Activated to Box 1', value:8, tone:'active'}, {label:'Not completed', value:4}]} />
```

Types: `newLearning` (Box-1 activations, per-mode failures), `srsRepeat` (remembered/forgotten, box changes). Never mix the two.
