Surface container — wrap any boxed content. `state` adds a feedback outline (selected/correct/wrong) without changing the base surface, so selection ≠ correctness.

```jsx
<MxCard variant="elevated">…</MxCard>
<MxCard variant="interactive" state="selected" onClick={pick}>…</MxCard>
<MxCard state="correct">Correct answer</MxCard>
```

Variants: `default`, `elevated` (shadow), `interactive` (press feedback). States: `none`, `selected`, `correct`, `wrong`, `disabled`.
