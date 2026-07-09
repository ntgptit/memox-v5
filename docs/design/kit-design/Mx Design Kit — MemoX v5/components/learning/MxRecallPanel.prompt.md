recallMode panel — 20s countdown reveal, then self-grade Forgot / Remembered. Presentational; owner drives the timer.

```jsx
<MxRecallPanel phase="hidden" seconds={14} onReveal={reveal} />
<MxRecallPanel phase="revealed" meaning="Busy life" onForgot={f} onRemembered={r} />
```

Timeout (no reveal in 20s) = Forgot. Remembered is valid only after revealing.
