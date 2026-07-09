fillMode panel — the SRS activation gate. Type the prompt from the shown meaning; Hint + Check.

```jsx
<MxFillInputPanel value={v} onChange={setV} state="idle" onHint={h} onCheck={c} />
<MxFillInputPanel value={v} state="wrong" expected="결제하다" onRetry={retry} />
```

Hint never auto-completes. Only Check-correct (with prior 4 modes done) activates a card to Box 1.
